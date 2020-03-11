const __webpack = require('webpack');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __glob = require('glob');
const __getExtension = require('@coffeekraken/sugar/js/string/getExtension');
const __uniqid = require('@coffeekraken/sugar/js/string/uniqid');
const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __chokidar = require('chokidar');
const __restoreCursor = require('restore-cursor');
const __moduleAlias = require('module-alias');

const __coffeeBuilderApi = require('./classes/CoffeeBuilderApi');
const __coffeeBuilderPrivateApi = require('./classes/CoffeeBuilderPrivateApi');
const __coffeeEvents = require('./events');
const __coffeeBuilderUI = require('./classes/CoffeeBuilderUI');
const __stats = require('./stats');

const __path = require('path');
const __fs = require('fs');

const __defaultConfig = require('../../coffeebuilder.config');

const __CoffeeBuilderPlugin = require('./webpack/CoffeeBuilderPlugin');

class CoffeeBuilder {

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

  /**
   * @name                              _packages
   * @namespace                         terminal.coffeebuilder.node.CoffeeBuilder
   * @type                              Array
   * 
   * Store all the detected package in the coffeebuilder process scope
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _packages = [];

  /**
   * @name                                _runCompile
   * @namespace                           terminal.coffeebuilder.node.CoffeeBuilder
   * @type                                Array
   * 
   * Store all the resources types to take care of during the build process
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _runCompile = [];

  constructor(config = {}) {

    // add the "node_modules" path in module alias
    __moduleAlias.addPath(__path.resolve(__dirname, '../../node_modules'));

    // display the "home" UI
    __coffeeBuilderUI.changeLocation('home');

    this._config = __defaultConfig.setup(config);

    // run the plugins at "start" moment
    __coffeeBuilderPrivateApi._runPlugins('start');

    // init the CoffeeBuilderWebpack instance
    this.webpack = new CoffeeBuilderWebpack(this);

    // init watch
    if (this.config.watch) this._initWatch();

    process.on('beforeExit', () => {
      __coffeeBuilderPrivateApi._runPlugins('end');
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

    // loop on each packages to watch
    Object.keys(this.config.packages).forEach((packageKey, i) => {

      const packagePath = this.config.packages[packageKey];

      // let packageJson = {};
      // if (__fs.existsSync(process.cwd() + '/' + packagePath + '/package.json')) {
      //   packageJson = require(process.cwd() + '/' + packagePath + '/package.json');
      // }

      // let coffeebuilderPackageConfig = {};
      // if (__fs.existsSync(process.cwd() + '/' + packagePath + '/coffeebuilder.config.js')) {
      //   coffeebuilderPackageConfig = require(process.cwd() + '/' + packagePath + '/coffeebuilder.config.js');
      // }

      this.config.compile.forEach(compile => {

        const fileObj = this.config.resources[compile];
        if (!fileObj || !fileObj.sourcesFolders) return;
        fileObj.sourcesFolders.forEach((folder) => {

          // console.log(`${process.cwd()}/${packagePath}/${folder}/${fileObj.sources}`);

          __chokidar.watch(`${process.cwd()}/${packagePath}/${folder}/${fileObj.sources}`).on('change', (event, path) => {
            // this.resetBuildStats();
            console.log('Update in', packagePath, folder, fileObj.sources);
            // process.exit();

            this.run(packagePath, [compile]);
          });


        });

      });
    });
  }

  /**
   * @name                        config
   * @namespace                   terminal.coffeebuilder.node.CoffeeBuilder
   * @type                        Function
   *
   * Return the coffeebuilder configuration object
   *
   * @return        {Object}                The coffeebuilder configuration object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  config() {

    const config = this._config;

    // return the webpack configuration object
    return config;

  }
  get config() {
    return this._config;
  }

  /**
   * @name                            runConfig
   * @namespace                       terminal.coffeebuilder.node.CoffeeBuilder
   * @type                            Function
   * 
   * Return the coffeebuilder run specific config depending on the packages wanted to take care of
   * 
   * @param           {String}              [packagePath=null]            The package path to get the config from
   * @return          {Object}
   * 
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  runConfig(packageName = null) {

    // start with the defaul config
    let config = Object.assign({}, this.config());

    const packagePath = this.config.packages[packageName];

    // check if we have a packagePath to take the config from
    if (packagePath && __fs.existsSync(`${process.cwd()}/${packagePath}/coffeebuilder.config.js`)) {
      const packageConfig = require(`${process.cwd()}/${packagePath}/coffeebuilder.config.js`);
      config = __deepMerge(config, packageConfig);
    }

    // delete some configs that does not have to be there
    delete config.packages;
    delete config.setup;

    // return the config
    return config;

  }

  /**
   * @name                    run
   * @namespace               terminal.coffeebuilder.node.CoffeeBuilder
   * @type                    Function
   *
   * Run the build process and return a Promise that will be resolved once the build is completed
   *
   * @param           {String}               [packagePath=null]            The package path in which to launch the compilation/optimization process
   * @param           {Array}               [compile=null]                 An array of file types to compile. If not set, will take this parameter from the config
   * @return          {Promise}                       A promise that will be resolved once the build is completed
   *
   * @example           js
   * import coffeebuilder from '@coffeekraken/coffeebuilder';
   * const coffeebuilder = new coffeebuilder();
   * coffeebuilder.run().then((result) => {
   *    // do something once the build is finished
   * })
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(packagesNames = null, compile = null) {
    return new Promise((resolve, reject) => {

      if (packagesNames === null) {
        packagesNames = Object.keys(this.config.packages);
      }

      // save the resources types to run
      if (compile) this._runCompile = compile;
      else this._runCompile = this.config.compile;

      // reset the build stats
      this.resetBuildStats();

      // run the plugins at "before" moment
      __coffeeBuilderPrivateApi._runPlugins('before');

      // clear the injected scripts
      __coffeeBuilderApi.clearInjectedScripts();

      // save the startTimestamp
      __stats.setValue('build.startTimestamp', Date.now());

      // run webpack
      (async () => {

        // change the location to "build"
        __coffeeBuilderUI.changeLocation('build');

        // execute all the wanted packages
        for (let i = 0; i < packagesNames.length; i++) {

          // update the stats currentPackage value
          __coffeeBuilderApi.setCurrentPackage(packagesNames[i]);
          __stats.setCurrentPackage(packagesNames[i]);

          // run the current package
          await this.webpack.run(packagesNames[i], compile);

        }

        // update the stats currentPackage value
        __coffeeBuilderApi.setCurrentPackage(null);
        __stats.setCurrentPackage('.');

        // save the endTimestamp
        __stats.setValue('build.endTimestamp', Date.now());

        // change the location to "stats"
        __coffeeBuilderUI.changeLocation('stats');

        // run the plugins at the "after" moment
        __coffeeBuilderPrivateApi._runPlugins('after');

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
   * @name                    _coffeebuilder
   * @namespace               webpack.coffeebuilder.CoffeeBuilderWebpack
   * @type                    coffeebuilder
   *
   * Store the coffeebuilder instance
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _coffeebuilder = null;

  /**
   * @name                     constructor
   * @namespace                webpack.coffeebuilder.CoffeeBuilderWebpack
   * @type                      Function
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(coffeebuilder) {
    this._coffeebuilder = coffeebuilder;

    // handle the "webpack.config.js" file at the project root
    // if (__fs.existsSync(process.cwd() + '/webpack.config.js')) {
    //   this._coffeebuilder._config.vendors.webpack = __deepMerge(this._coffeebuilder._config.vendors.webpack, require(process.cwd() + '/webpack.config.js'));
    // }
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
  run(packageName = null, compile = null) {
    return new Promise((resolve, reject) => {

      this._packageName = packageName;
      this._packagePath = this._coffeebuilder._config.packages[packageName];
      this._compile = compile;

      if (this._packagePath && __fs.existsSync(`${process.cwd()}/${this._packagePath}/node_modules`)) {
        __moduleAlias.addPath(`${process.cwd()}/${this._packagePath}/node_modules`);
      }

      // check the needed configs in order to run the compilation properly
      if (Object.keys(this.config().entry).length === 0) {
        __coffeeBuilderUI.changeLocation('error', {
          message: `It seems that your configuration return <red><bold>no files</bold></red> to compile at all for the package "<yellow><bold>${this._packagePath}</bold></yellow>"...`
        });
        return;
      }

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
   * Return the webpack configuration object builded by coffeebuilder
   *
   * @return        {Object}                The webpack configuration object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  config() {

    const runConfig = this._coffeebuilder.runConfig(this._packageName);
    const webpackConfig = Object.assign({}, runConfig.vendors.webpack);

    // context
    const packagePath = this._packagePath ? process.cwd() + '/' + this._packagePath : process.cwd();
    webpackConfig.context = packagePath;

    // modules
    if (this._packagePath) {
      webpackConfig.resolve.modules.push(__path.resolve(process.cwd(), this._packagePath, 'node_modules'));
    }
    webpackConfig.resolve.modules.push(__path.resolve(__dirname, '../../node_modules'));
    webpackConfig.resolve.modules.push(__path.resolve(process.cwd(), 'node_modules'));

    // aliases
    this._coffeebuilder._packages.forEach(pkgPath => {
      if (__fs.existsSync(`${process.cwd()}/${pkgPath}/package.json`)) {
        const packageJson = require(`${process.cwd()}/${pkgPath}/package.json`);
        const name = packageJson.name;
        webpackConfig.resolve.alias[name] = __path.resolve(process.cwd(), pkgPath);
      }
    });

    // output
    if (this._packagePath) {
      webpackConfig.output.path = __path.resolve(process.cwd(), this._packagePath);
    }

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
   * Return the "entry" webpack configuration object builded by coffeebuilder
   *
   * @return                {Object}                The "entry" webpack object
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _getEntry() {

    // the entry webpack object
    let entryObj = {};
    let entryString = '';

    let packagePath = '';
    if (this._packagePath) {
      packagePath = this._packagePath;
    }

    const runConfig = this._coffeebuilder.runConfig(this._packageName);
    console.log(runConfig);

    // loop on the "compile" option to know which file types we have to handle
    const fileTypesToCompile = this._compile || runConfig.compile;
    fileTypesToCompile.forEach((fileType) => {

      // get the file type options object
      const optionsObj = runConfig.resources[fileType] || {};

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
        let searchPath = folder + '/' + optionsObj.sources;
        if (packagePath) {
          searchPath = `${packagePath}/${searchPath}`;
        }
        files = files.concat(__glob.sync(searchPath));
      });

      // process the founded files
      files.forEach((file, i) => {

        let entryKey = file;
        const ext = __getExtension(entryKey);
        entryKey = entryKey.replace(ext, optionsObj.saveExtension || ext);

        sourcesFolder.forEach((source) => {
          entryKey = entryKey.replace(source, '@outputFolder');
          if (entryKey.slice(0, 1) === '/') entryKey = entryKey.slice(1);
        });

        if (__getExtension(entryKey) === 'js') {
          outputFolder.forEach((folder) => {
            let key = entryKey.replace('@outputFolder', folder).replace(this._packagePath + '/', '');
            // key = key.replace('//', '/');
            // if ( ! entryKey.match(/\.js$/g)) return;
            entryObj[key] = process.cwd() + '/' + file;
            __coffeeEvents.emit('entryPathes', process.cwd() + '/' + file);
          });
        } else {
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

module.exports = CoffeeBuilder;
