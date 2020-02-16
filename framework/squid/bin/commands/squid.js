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
const __base64 = require('@coffeekraken/sugar/node/crypt/base64');
const __CoffeePack = require('@coffeekraken/webpack-coffeepack');
const __initEnv = require('@coffeekraken/sugar/node/app/initEnv');

const projectPackageJson = require(process.cwd() + '/package.json');

// init env
__initEnv();

module.exports = (compile = ['js']) => {

  // load the config
  const config = __getConfig();
  const entryObj = {};

  const coffeepack = new __CoffeePack({});

  coffeepack.run().then(() => {
    console.log('build finished!');
  });

  // console.log(coffeepack.webpack.loaders());
  // console.log(coffeepack.webpack.plugins());
  // console.log(coffeepack.webpack.config());
  //
  // console.log(coffeepack.webpack.entry());

  // __coffeeLoader.options({
  //   compile: compile
  // });
  // __coffeeLoader.entry(entryObj);

  // add the lazyload resources
  // Object.keys(config.lazyload).forEach((selector) => {
  //   entryObj[`${config.dist.js.outputFolder}/lazyload/${__base64.encrypt(selector)}.js`] = config.lazyload[selector];
  // });

  __log(`Emptying the current javascript dist folder <bold><cyan>"${config.dist.js.outputFolder}"</cyan></bold>...`, 'info');
  __emptyDirSync(__dirname + '/../../' + config.dist.js.outputFolder);
  __log('Compiling/compressing the javascript bundle files...', 'info');


  if (__fs.existsSync(process.cwd() + '/webpack.config.js')) {
    webpackConfig = __deepMerge(webpackConfig, require(process.cwd() + '/webpack.config.js'));
  }

  // process the files
  // __webpack(webpackConfig, (err, stats) => {
  //   if (err || stats.hasErrors()) {
  //     __log(err || stats, 'error');
  //     return;
  //   }
  //   __log('The javascript bundle files have been builded successfuly:', 'success');
  //
  //   const generatedFiles = __glob.sync(__dirname + '/../../dist/js/**/*.{js,js.gz}');
  //   generatedFiles.forEach(filePath => {
  //     const stats = __fs.statSync(filePath);
  //     const size = __filesize(stats.size);
  //     __log(`--- ${filePath.replace(__path.resolve(__dirname, '../..') + '/', '')}: ${size.human()}`, 'warn');
  //   });
  //
  // });

};
