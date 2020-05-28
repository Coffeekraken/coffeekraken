const __webpack = require('webpack');
const __getFilename = require('../../fs/filename');
const __packageRoot = require('../../path/packageRoot');
const __deepMerge = require('../../object/deepMerge');

/**
 * @name                webpackAction
 * @namespace           sugar.node.build.js
 * @type                Function
 *
 * This function is responsible of passing webpack on the output files
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 *
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function webpackAction(streamObj, settings = {}) {
  return new Promise((resolve, reject) => {
    __webpack(
      __deepMerge(
        {
          mode: streamObj.prod ? 'production' : 'development',
          entry: streamObj.input,
          output: {
            path: streamObj.output,
            filename: streamObj.prod
              ? __getFilename(streamObj.input).replace('.js', '.prod.js')
              : __getFilename(streamObj.input)
          },
          module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
            ]
          },
          resolve: {
            modules: [
              `${__packageRoot(process.cwd())}/node_modules`,
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
        if (error || stats.hasErrors()) {
          return reject(error);
        }
        resolve(streamObj);
      }
    );
  });
};
