const __webpack = require('webpack');
const __glob = require('glob');
const __getConfig = require('../../src/node/config');
const __fs = require('fs');
const __path = require('path');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __log = require('@coffeekraken/sugar/node/log/log');
const __emptyDirSync = require('@coffeekraken/sugar/node/fs/emptyDirSync');
const __filesize = require('file-size');
const __TerserPlugin = require('terser-webpack-plugin');
const __CompressionPlugin = require('compression-webpack-plugin');
const __base64 = require('@coffeekraken/sugar/node/crypt/base64');
const __LazyDomLoadPlugin = require('./LazyDomLoadPlugin');
const __ConcatDependenciesVendorsPlugin = require('./ConcatDependenciesVendorsPlugin');
const __coffeeLoader = require('./coffeeLoader');
const __MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectPackageJson = require(process.cwd() + '/package.json');

module.exports = (compile = ['js']) => {

  // load the config
  const config = __getConfig();
  const entryObj = {};

  __coffeeLoader.options({
    compile: compile
  });
  __coffeeLoader.entry(entryObj);

  // add the lazyload resources
  // Object.keys(config.lazyload).forEach((selector) => {
  //   entryObj[`${config.dist.js.outputFolder}/lazyload/${__base64.encrypt(selector)}.js`] = config.lazyload[selector];
  // });

  __log(`Emptying the current javascript dist folder "${config.dist.js.outputFolder}"...`, 'info');
  __emptyDirSync(__dirname + '/../../' + config.dist.js.outputFolder);
  __log('Compiling/compressing the javascript bundle files...', 'info');

  let webpackConfig = {
    mode: 'production',
    entry: entryObj,
    context: __path.resolve(__dirname, '../../'),
    output: {
      filename: '[name]',
      pathinfo: false,
      path: __path.resolve(__dirname + '/../../'),
      publicPath: '/app/js/',
      chunkFilename: config.dist.js.outputFolder + `/chunks/[name]-[chunkhash]-${projectPackageJson.version}.js`
    },
    plugins: [
      new __ConcatDependenciesVendorsPlugin({
        outputFilePath: __path.resolve(`${__dirname}/../../src/css/03_generic/_js.scss`)
      }),
      // new __LazyDomLoadPlugin({
      //   outputEntry: 'common.bundle.js',
      //   entryRegexp: '^lazyload\/(.*).js$',
      //   scriptSrc: '/app/js/[name]',
      //   decryptSelectorFn: __base64.decrypt
      // })
    ],
    optimization: {
      minimize: true,
      minimizer: process.env.NODE_ENV === 'prod' ? [
        new __TerserPlugin({
          terserOptions: {}
        }
      )] : []
    },
    resolve: {
      alias: {
        '@squid': __path.resolve(__dirname, '../../src/js'),
        '@app': process.cwd() + '/' + config.dist.js.sourcesFolder,
        '@coffeekraken/sugar/js': __dirname + '/../../../../util/sugar/src/js',
        '@coffeekraken/sugar/node': __dirname + '/../../../../util/sugar/src/node'
      }
    },
    module: {
      rules: [
        {
          test: /\.*$/,
          use: [{
            loader: './bin/commands/coffeeLoader.js',
            options: {
              file: {
                name: '[path][name].[ext]',
                outputFolder: config.dist.images.outputFolder,
              }
            }
          }]
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
