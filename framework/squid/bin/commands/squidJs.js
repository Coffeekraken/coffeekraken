const __webpack = require('webpack');
const __glob = require('glob');
const __getConfig = require('../../src/node/getConfig');
const __fs = require('fs');
const __path = require('path');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');
const __log = require('@coffeekraken/sugar/node/log/log');
const __emptyDirSync = require('@coffeekraken/sugar/node/fs/emptyDirSync');
const __filesize = require('file-size');
const __TerserPlugin = require('terser-webpack-plugin');
const __CompressionPlugin = require('compression-webpack-plugin');

module.exports = () => {

  // load the config
  const config = __getConfig();

  // find for the js files to bundle
  let bundleFiles = __glob.sync(`${__dirname}/../../src/js/**/*.bundle.js`);

  // build the entry property
  const entryObj = {};
  bundleFiles.forEach(bundleFilePath => {
    let finalBundleFilePath = bundleFilePath.replace('src/js/','');
    finalBundleFilePath = finalBundleFilePath.replace(__path.resolve(__dirname, '../../') + '/', '');
    entryObj[finalBundleFilePath] = (bundleFilePath.charAt(0) === '/') ? bundleFilePath : './' + bundleFilePath;
  });

  __log(`Emptying the current javascript dist folder "${config.dist.js.outputFolder}"...`, 'info');
  __emptyDirSync(__dirname + '/../../' + config.dist.js.outputFolder);
  __log('Compiling/compressing the javascript bundle files...', 'info');

  let webpackConfig = {
    mode: 'production',
    entry: entryObj,
    context: __path.resolve(__dirname, '../../'),
    output: {
      filename: '[name]',
      path: __dirname + '/../../' + config.dist.js.outputFolder,
      publicPath: '/app/js/',
      chunkFilename: 'chunks/[name].[chunkhash].js'
    },
    // plugins: [
    //   new __CompressionPlugin()
    // ],
    optimization: {
      minimize: true,
      minimizer: [new __TerserPlugin({
        terserOptions: {

        }
      })]
    },
    resolve: {
      alias: {
        '@squid': __path.resolve(__dirname, '../../src/js'),
        '@app': process.cwd() + '/' + config.dist.js.sourcesFolder,
        '@coffeekraken/sugar/js': __dirname + '/../../../../util/sugar/dist/js',
        '@coffeekraken/sugar/node': __dirname + '/../../../../util/sugar/src/node'
      }
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
        },
        {
            test: /\.js$/,
            use: 'webpack-import-glob-loader'
        }
      ]
    }
  };


  if (__fs.existsSync(process.cwd() + '/webpack.config.js')) {
    webpackConfig = __deepMerge(webpackConfig, require(process.cwd() + '/webpack.config.js'));
  }

  // process the files
  __webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      __log(err || stats, 'error');
      return;
    }
    __log('The javascript bundle files have been builded successfuly:', 'success');

    const generatedFiles = __glob.sync(__dirname + '/../../dist/js/**/*.{js,js.gz}');
    generatedFiles.forEach(filePath => {
      const stats = __fs.statSync(filePath);
      const size = __filesize(stats.size);
      __log(`--- ${filePath.replace(__path.resolve(__dirname, '../..') + '/', '')}: ${size.human()}`, 'warn');
    });

  });

};
