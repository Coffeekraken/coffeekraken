const __webpack = require('webpack');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');
const __log = require('@coffeekraken/sugar/node/log/log');
const __glob = require('glob');
const __filterObj = require('@coffeekraken/sugar/js/object/filter');
const __sortObj = require('@coffeekraken/sugar/js/object/sort');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __uniqid = require('@coffeekraken/sugar/js/string/uniqid');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __cfonts = require('cfonts');
const __chokidar = require('chokidar');
const __restoreCursor = require('restore-cursor');

const __coffeeBuilderApi = require('./classes/CoffeeBuilderApi');
const __coffeeEvents = require('./events');
const __coffeeBuilderUI = require('./classes/CoffeeBuilderUI');
const __CoffeeBuilderResource = require('./classes/CoffeeBuilderResource');
const __setup = require('../../coffeebuilder.config').setup;
const __stats = require('./stats');

const __path = require('path');
const __fs = require('fs');

const __defaultConfig = require('../../coffeebuilder.config');

const __CoffeeBuilderPlugin = require('./webpack/CoffeeBuilderPlugin');
const __lazyDomLoadPlugin = require('./plugins/lazyDomLoad');

class CoffeePack {

  /**
   * @name                        _processors
   * @namespace                   terminal.coffeebuilder.node.CoffeeBuilder
   * @type                        Object
   *
   * Store all the registered processors
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _processors = {};

  /**
   * @name                        _postProcessors
   * @namespace                   terminal.coffeebuilder.node.CoffeeBuilder
   * @type                        Object
   *
   * Store all the registered processors
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _postProcessors = {};

  /**
   * @name                        _plugins
   * @namespace                   terminal.coffeebuilder.node.CoffeeBuilder
   * @type                        Object
   *
   * Store all the registered plugins
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _plugins = {};

  _watchCompile = [];
  _drawInterfaceTimeout = null;

  constructor(config = {}) {

    // display the "home" UI
    __coffeeBuilderUI.changeLocation('home');

    this._config = __setup(config);

    // run the plugins at "start" moment
    __coffeeBuilderApi._runPlugins('start');

    // init the CoffeeBuilderWebpack instance
    this.webpack = new CoffeeBuilderWebpack(this);

    // init watch
    // if (this._config.watch) this._initWatch();

    process.on('beforeExit', () => {
      __coffeeBuilderApi._runPlugins('end');
    });

    // restore the hided cursor on process exit
    __restoreCursor();

  }

  /**
   * @name                        _initWatch
   * @namespace                   coffeebuilder.CoffeeBuilder
   * @type                        Function
   * @private
   *
   * Initialize the watch process on files
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initWatch() {

    // loop on each asked compile files
    this._config.compile.forEach((compile) => {

      const fileObj = this._config.resources[compile];
      if (!fileObj || !fileObj.sourcesFolder) return;

      fileObj.sourcesFolder.forEach((folder) => {

        __chokidar.watch(`${folder}/${fileObj.sources}`).on('change', (event, path) => {
          this.resetBuildStats();
          this._watchCompile = [compile];
          this.run([compile]);
        });


      });

    });

  }

  /**
   * @name                        config
   * @namespace                   terminal.coffeebuilder.node.CoffeeBuilder
   * @type                        Function
   *
   * Return the coffeepack configuration object
   *
   * @return        {Object}                The coffeepack configuration object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  config() {

    const config = this._config;

    // return the webpack configuration object
    return config;

  }

  /**
   * @name                    run
   * @namespace               terminal.coffeebuilder.node.CoffeeBuilder
   * @type                    Function
   *
   * Run the build process and return a Promise that will be resolved once the build is completed
   *
   * @param           {Array}                         An array of file types to compile. If not set, will take this parameter from the config
   * @return          {Promise}                       A promise that will be resolved once the build is completed
   *
   * @example           js
   * import CoffeePack from '@coffeekraken/coffeepack';
   * const coffeepack = new CoffeePack();
   * coffeepack.run().then((result) => {
   *    // do something once the build is finished
   * })
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(compile = null) {
    return new Promise((resolve, reject) => {

      // run the plugins at "before" moment
      __coffeeBuilderApi._runPlugins('before');

      // clear the injected scripts
      __coffeeBuilderApi.clearInjectedScripts();

      // save the startTimestamp
      __stats.build.startTimestamp = Date.now();

      // run webpack
      (async () => {

        // change the location to "build"
        __coffeeBuilderUI.changeLocation('build');

        await this.webpack.run(compile);

        // console.log('PLOP'); process.exit();

        // save the endTimestamp
        __stats.build.endTimestamp = Date.now();

        // change the location to "stats"
        __coffeeBuilderUI.changeLocation('stats');

        // run the plugins at the "after" moment
        __coffeeBuilderApi._runPlugins('after');

        resolve();
      })();
    });
  }

  /**
   * @name                  resetBuildStats
   * @namespace             coffeebuilder.node.CoffeeBuilder
   * @type                  Function
   *
   * Reset the build stats
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  resetBuildStats() {
    __stats.reset();
  }

}

class CoffeeBuilderWebpack {

  /**
   * @name                    _coffeepack
   * @namespace               webpack.coffeepack.CoffeeBuilderWebpack
   * @type                    CoffeePack
   *
   * Store the CoffeePack instance
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _coffeepack = null;

  /**
   * @name                     constructor
   * @namespace                webpack.coffeepack.CoffeeBuilderWebpack
   * @type                      Function
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(coffeepack) {
    this._coffeepack = coffeepack;

    // handle the "webpack.config.js" file at the project root
    if (__fs.existsSync(process.cwd() + '/webpack.config.js')) {
      this._coffeepack._config.vendors.webpack = __deepMerge(this._coffeepack._config.vendors.webpack, require(process.cwd() + '/webpack.config.js'));
    }
  }

  /**
   * @name                        run
   * @namespace                   terminal.coffeebuilder.node.CoffeeBuilder
   * @type                        Function
   *
   * Run the webpack build process
   *
   * @param           {Array}             [compile=null]            An array of which file types you want to compile
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(compile = null) {
    return new Promise((resolve, reject) => {

      this._compile = compile;

      __webpack(this.config(), (err, stats) => {
        if (err || stats.hasErrors()) {
          console.log(stats);
        }
        // console.log(stats);
        // process finished
        resolve(stats);
      });
    });
  }

  /**
   * @name                        webpackConfig
   * @namespace                   terminal.coffeebuilder.node.CoffeeBuilder
   * @type                        Function
   *
   * Return the webpack configuration object builded by coffeepack
   *
   * @return        {Object}                The webpack configuration object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  config() {

    const webpackConfig = Object.assign({}, this._coffeepack._config.vendors.webpack);

    // entry
    webpackConfig.entry = this._getEntry();

    // return the webpack configuration object
    return webpackConfig;

  }

  /**
   * @name                        _getEntry
   * @namespace                   terminal.coffeebuilder.node.CoffeeBuilder
   * @type                        Function
   * @private
   *
   * Return the "entry" webpack configuration object builded by coffeepack
   *
   * @return                {Object}                The "entry" webpack object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _getEntry() {

    // the entry webpack object
    let entryObj = {};
    let entryString = '';

    // loop on the "compile" option to know which file types we have to handle
    const fileTypesToCompile = this._compile || this._coffeepack._config.compile;
    fileTypesToCompile.forEach((fileType) => {

      // get the file type options object
      const optionsObj = this._coffeepack._config.resources[fileType] || {};

      // check the configuration object
      if (!optionsObj.sourcesFolders) {
        throw new Error(`You try to compile the <yellow>"${fileType}"</yellow> files but you don't have setted the <red>"config.${fileType}.sourcesFolder"</red> config...`);
      }
      if (!optionsObj.outputFolders) {
        throw new Error(`You try to compile the <yellow>"${fileType}"</yellow> files but you don't have setted the <red>"config.${fileType}.outputFolder"</red> config...`);
      }
      if (!optionsObj.sources) {
        throw new Error(`You try to compile the <yellow>"${fileType}"</yellow> files but you don't have setted the <red>"config.${fileType}.sources"</red> config...`);
      }

      const sourcesFolder = Array.isArray(optionsObj.sourcesFolders) ? optionsObj.sourcesFolders : [optionsObj.sourcesFolders];
      const outputFolder = Array.isArray(optionsObj.outputFolders) ? optionsObj.outputFolders : [optionsObj.outputFolders];

      // search for the files
      let files = [];
      sourcesFolder.forEach((folder) => {
        files = files.concat(__glob.sync(folder + '/' + optionsObj.sources));
      });

      // process the founded files
      files.forEach((file, i) => {

        let entryKey = file;
        const ext = __getExtension(entryKey);
        entryKey = entryKey.replace(ext, optionsObj.saveExtension || ext);

        sourcesFolder.forEach((source) => {
          entryKey = entryKey.replace(source, '');
          if (entryKey.slice(0, 1) === '/') entryKey = entryKey.slice(1);
        });

        if (__getExtension(entryKey) === 'js') {
          outputFolder.forEach((folder) => {
            let key = `${folder}/${entryKey}`;
            key = key.replace('//', '/');
            // if ( ! entryKey.match(/\.js$/g)) return;
            entryObj[key] = process.cwd() + '/' + file;
            __coffeeEvents.emit('entryPathes', process.cwd() + '/' + file);
          });
        } else {
          const filename = file.split('/').slice(-1)[0];
          entryKey = entryKey.replace('//', '/');
          entryString += `import * as coffeebuilderImport${__uniqid()} from '${process.cwd() + '/' + file}';\n`;
          __coffeeEvents.emit('entryPathes', process.cwd() + '/' + file);
        }

      });

    });

    if (entryString !== '') {

      const tmpDir = __tmpDir();
      __fs.writeFileSync(tmpDir + '/coffeebuilderImports.js', entryString);

      const relativePathToTmpDir = __path.relative(process.cwd(), tmpDir);
      entryObj[relativePathToTmpDir + '/coffeebuilderImportsBuilded.js'] = tmpDir + '/coffeebuilderImports.js';

    }

    // return the entry object
    return entryObj;

  }

}

module.exports = CoffeePack;
