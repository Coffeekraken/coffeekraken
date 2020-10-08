const __webpack = require('webpack');
const __getFilename = require('../../../fs/filename');
const __packageRoot = require('../../../path/packageRoot');
const __deepMerge = require('../../../object/deepMerge');
const __fs = require('fs');
const __onProcessExit = require('../../../process/onProcessExit');
const __path = require('path');
const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __SBuildJSInterface = require('../interface/SBuildJsInterface');
const __sugarConfig = require('../../../config/sugar');
const __babel = require('@babel/core');
// const __getScssSharedResourcesString = require('../../scss/getScssSharedResourcesStrings');
// const __jsObjectToScssMap = require('../../../scss/jsObjectToScssMap');
const __folderPath = require('../../../fs/folderPath');

/**
 * @name                SWebpackStreamAction
 * @namespace           sugar.node.build.js.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of passing webpack on the output files
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SWebpackStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SBuildJSInterface;

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          id: 'SWebpackStreamAction'
        },
        settings
      )
    );
  }

  /**
   * @name          run
   * @type          Function
   * @async
   *
   * Override the base class run method
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(streamObj, settings) {
    settings = __deepMerge(
      {
        babel: __sugarConfig('babel'),
        webpack: __sugarConfig('webpack'),
        scss: {
          Config: {},
          imports: null
        }
      },
      settings
    );

    return super.run(streamObj, async (resolve, reject) => {
      // pass over this action if we don't want to pack the files
      if (
        streamObj.pack === false ||
        (Array.isArray(streamObj.pack) &&
          streamObj.pack.indexOf(streamObj.input) === -1)
      ) {
        this.log({
          group: settings.name,
          value: `Executing <yellow>babel</yellow> on the file "<cyan>${streamObj.input.replace(
            `${__packageRoot()}/`,
            ''
          )}</cyan>"...`
        });

        const result = await __babel
          .transformAsync(streamObj.data, {
            cwd: __packageRoot(__dirname),
            filename: streamObj.filename,
            sourceMaps: true,
            ...settings.babel
          })
          .catch((error) => {
            return reject(error);
          });

        streamObj.data = result.code;
        if (streamObj.map && result.map) {
          streamObj.sourcemapData = result.map;
        }

        return resolve(streamObj);
      }

      // const scssImportsString = __getScssSharedResourcesString(
      //   settings.scss.imports
      // );

      // const scssConfig = __jsObjectToScssMap(
      //   __sugarConfig('scss'),
      //   settings.scss.config
      // );

      // ressources
      let resources = streamObj.resources ? streamObj.resources : [];
      if (!Array.isArray(resources)) resources = [resources];
      resources.push(`${__packageRoot()}/src/scss/_shared.scss`);

      this.log({
        group: settings.name,
        value: `Packing your javascript bundle using <yellow>webpack</yellow> on the entry file "<cyan>${streamObj.input.replace(
          `${__packageRoot()}/`,
          ''
        )}</cyan>"...`
      });

      let webpackSettings = Object.assign({}, settings.webpack);

      const tmpInputPath = `${streamObj.input}.tmp`;
      __fs.writeFileSync(tmpInputPath, streamObj.data);

      __onProcessExit(() => {
        __fs.unlinkSync(tmpInputPath);
      });

      const compiler = __webpack(
        __deepMerge(
          {
            mode: streamObj.prod ? 'production' : 'development',
            entry: tmpInputPath,
            stats: {
              errors: true,
              errorDetails: true
            },
            output: {
              path: streamObj.outputDir,
              filename: streamObj.prod
                ? __getFilename(streamObj.input).replace('.js', '.prod.js')
                : __getFilename(streamObj.input)
            },
            externals: {
              fs: 'commonjs fs',
              path: 'commonjs path'
            },
            module: {
              rules: [
                {
                  test: /\.s[ac]ss$/i,
                  use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    {
                      loader: 'sass-loader',
                      options: {
                        implementation: require('sass')
                        // prependData: `
                        //   ${scssConfig}
                        //   ${scssImportsString.prepend}
                        // `
                      }
                    }
                  ]
                },
                { test: /\.handlebars$/, loader: 'handlebars-loader' },
                {
                  test: /\.m?js$/,
                  exclude: /(node_modules|bower_components)/,
                  use: {
                    loader: 'babel-loader',
                    options: {
                      cwd: __packageRoot(__dirname),
                      presets: [
                        [
                          '@babel/preset-env',
                          {
                            targets: {
                              esmodules: true
                            }
                          }
                        ]
                      ],
                      ...settings.babel
                    }
                  }
                },
                {
                  test: /\.tsx?$/,
                  use: 'ts-loader',
                  exclude: /node_modules/
                }
              ]
            },
            resolveLoader: {
              modules: [
                __folderPath(streamObj.input),
                `${__packageRoot()}/node_modules`,
                'node_modules'
              ]
            },
            resolve: {
              symlinks: true,
              // extensions: ['.tsx', '.ts', '.js', '.scss', '.sass'],
              modules: [
                __folderPath(streamObj.input),
                `${__packageRoot()}/node_modules`,
                'node_modules'
              ]
            },
            target: 'web',
            devtool: streamObj.map ? 'source-map' : false,
            context: __packageRoot()
          },
          webpackSettings
        )
      );

      try {
        compiler.run((err, stats) => {
          // delete the tmp file
          __fs.unlinkSync(tmpInputPath);

          if (err) {
            let errorString = err.stack || err;
            if (err.details) {
              errorString += err.details;
            }
            return reject(errorString);
          }

          const info = stats.toJson();

          if (stats.hasErrors()) {
            return reject(info.errors.join('\n\n'));
          }

          if (stats.hasWarnings()) {
            return reject(info.warnings.join('\n\n'));
          }

          // reading the outputed file
          const output = __fs.readFileSync(
            __path.resolve(streamObj.outputDir, __getFilename(streamObj.input)),
            'utf8'
          );

          // check if is a sourcemap
          let sourcemapOutput;
          if (streamObj.map) {
            sourcemapOutput = __fs.readFileSync(
              __path.resolve(
                streamObj.outputDir,
                __getFilename(streamObj.input) + '.map'
              ),
              'utf8'
            );
          }

          // // if (!streamObj.dataBefore) streamObj.dataBefore = {};
          streamObj.data = output;
          if (sourcemapOutput) streamObj.sourcemapData = sourcemapOutput;

          resolve(streamObj);
        });
      } catch (e) {
        // delete the tmp file
        __fs.unlinkSync(tmpInputPath);

        console.log('COCOCOCOC');
        // console.log(e.toString());
      }
    });
  }
};
