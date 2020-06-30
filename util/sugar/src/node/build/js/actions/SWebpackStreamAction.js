const __webpack = require('webpack');
const __getFilename = require('../../../fs/filename');
const __packageRoot = require('../../../path/packageRoot');
const __deepMerge = require('../../../object/deepMerge');
const __fs = require('fs');
const __path = require('path');
const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __SBuildJsCli = require('../SBuildJsCli');
const __sugarConfig = require('../../../config/sugar');
const __babel = require('@babel/core');
const __getImportsArray = require('../../scss/getImportsArray');

/**
 * @name                SWebpackStreamAction
 * @namespace           node.build.js.actions
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
   * @name            definitionObj
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = {
    ...__SBuildJsCli.definitionObj
  };

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
    super(settings);
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
  run(streamObj, settings = this._settings) {
    // make sure we have a correct streamObj
    this.checkStreamObject(streamObj);

    // return the promise for this action
    return new Promise(async (resolve, reject) => {
      // pass over this action if we don't want to pack the files
      if (
        streamObj.pack === false ||
        (Array.isArray(streamObj.pack) &&
          streamObj.pack.indexOf(streamObj.input) === -1)
      ) {
        this.log(
          `Skipping the <yellow>webpack</yellow> packaging action for the file <cyan>${streamObj.input.replace(
            __packageRoot(),
            ''
          )}</cyan> and processing file using <cyan>babel</cyan>`
        );

        const result = await __babel
          .transformAsync(streamObj.data, {
            cwd: __packageRoot(__dirname),
            filename: streamObj.filename,
            sourceMaps: true,
            ...__sugarConfig('babel')
          })
          .catch((error) => {
            return reject(err);
          });

        streamObj.data = result.code;
        if (streamObj.map && result.map) {
          streamObj.sourcemapData = result.map;
        }

        return resolve(streamObj);
      }

      const scssImportsString = '';
      // const scssImportsString = __getImportsArray('string');

      this.log(
        `Processing the <yellow>webpack</yellow> action for the file <cyan>${streamObj.input.replace(
          __packageRoot(),
          ''
        )}</cyan>`
      );

      this.log('COCOCO');

      const compiler = __webpack(
        __deepMerge(
          {
            mode: streamObj.prod ? 'production' : 'development',
            entry: streamObj.input,
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
                        prependData: `
                          ${scssImportsString}
                        `
                      }
                    }
                  ]
                },
                {
                  test: /\.m?js$/,
                  exclude: /(node_modules|bower_components)/,
                  use: {
                    loader: 'babel-loader',
                    options: {
                      cwd: __packageRoot(__dirname),
                      ...__sugarConfig('babel')
                    }
                  }
                }
              ]
            },
            resolveLoader: {
              modules: [
                `node_modules`,
                __path.relative(
                  __packageRoot(process.cwd()),
                  `${__packageRoot(__dirname)}/node_modules`
                )
              ]
            },
            resolve: {
              symlinks: true,
              modules: [
                'node_modules',
                'src/js',
                __path.relative(
                  __packageRoot(process.cwd()),
                  `${__packageRoot(__dirname)}/node_modules`
                )
              ]
            },
            target: 'web',
            devtool: streamObj.map ? 'source-map' : false,
            context: __packageRoot(process.cwd())
          },
          settings
        )
      );

      compiler.run((error, stats) => {
        if (stats.hasErrors()) {
          const sts = stats.toJson();
          console.error(sts.errors);
          return reject(sts.errors);
        }
        if (stats.hasWarnings()) {
          const sts = stats.toJson();
          console.error(sts.warnings);
          return reject(sts.warnings);
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
    });
  }
};
