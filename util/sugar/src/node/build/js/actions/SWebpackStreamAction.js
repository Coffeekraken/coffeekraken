const __webpack = require('webpack');
const __getFilename = require('../../../fs/filename');
const __packageRoot = require('../../../path/packageRoot');
const __deepMerge = require('../../../object/deepMerge');
const __fs = require('fs');
const __path = require('path');
const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __SBuildJsCli = require('../SBuildJsCli');

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
    return new Promise((resolve, reject) => {
      __webpack(
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
                    'sass-loader'
                  ]
                },
                {
                  test: /\.m?js$/,
                  exclude: /(node_modules|bower_components)/,
                  use: {
                    loader: 'babel-loader',
                    options: {
                      cwd: `${__packageRoot(__dirname)}/node_modules`,
                      presets: [
                        [
                          '@babel/preset-env',
                          {
                            forceAllTransforms: true
                          }
                        ]
                      ],
                      plugins: ['@babel/plugin-proposal-class-properties']
                    }
                  }
                }
              ]
            },
            resolveLoader: {
              modules: [
                `${__packageRoot(process.cwd())}/node_modules`,
                `${__packageRoot(__dirname)}/node_modules`
              ]
            },
            resolve: {
              symlinks: true,
              modules: [
                `${__packageRoot(process.cwd())}/node_modules`,
                `${__packageRoot(__dirname)}/node_modules`,
                `${__packageRoot(process.cwd())}/src/js`
              ]
            },
            target: 'web',
            devtool: streamObj.map ? 'source-map' : false,
            context: __packageRoot(process.cwd())
          },
          settings
        ),
        (error, stats) => {
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
        }
      );
    });
  }
};
