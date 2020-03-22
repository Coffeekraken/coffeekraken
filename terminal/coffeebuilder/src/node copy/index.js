const __chokidar = require('chokidar');
const __restoreCursor = require('restore-cursor');
const __moduleAlias = require('module-alias');
const __path = require('path');
const __fs = require('fs');
const __blessed = require('blessed');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __parseHtml = require('@coffeekraken/sugar/node/terminal/parseHtml');
const __glob = require('glob');
const __ora = require('ora');

const __CoffeeBuilderApi = require('./classes/CoffeeBuilderApi');
const __CoffeeBuilderPrivateApi = require('./classes/CoffeeBuilderPrivateApi');
const __CoffeeBuilderEvents = require('./classes/CoffeeBuilderEvents');
const __CoffeeBuilderUI = require('./classes/CoffeeBuilderUI');
const __CoffeeBuilderStats = require('./classes/CoffeeBuilderStats');
const __CoffeeBuilderConfig = require('./classes/CoffeeBuilderConfig');
const __CoffeeBuilderWebpack = require('./classes/CoffeeBuilderWebpack');

class CoffeeBuilderApp extends __CoffeeBuilderApi {

  constructor(userConfig = {}) {

    super();

    if (global.CoffeeBuilder) {
      return global.CoffeeBuilder.app;
    }

    this._drawLoading();

    setTimeout(() => {
      (async () => {

        const foundedPackages = await this._searchPackages(userConfig);
        if (!userConfig.packages) userConfig.packages = [];
        userConfig.packages = userConfig.packages.concat(foundedPackages);

        await this.starting(userConfig);

      })();
    }, 100);

  }

  async starting(userConfig) {

    // init all the classes needed
    global.CoffeeBuilder = {};
    CoffeeBuilder.app = this;
    CoffeeBuilder.events = new __CoffeeBuilderEvents();
    CoffeeBuilder.stats = new __CoffeeBuilderStats();
    CoffeeBuilder.config = new __CoffeeBuilderConfig();
    CoffeeBuilder.api = this;
    CoffeeBuilder._api = new __CoffeeBuilderPrivateApi();
    CoffeeBuilder.ui = new __CoffeeBuilderUI();
    CoffeeBuilder.webpack = new __CoffeeBuilderWebpack();

    // add the "node_modules" path in module alias
    __moduleAlias.addPath(__path.resolve(__dirname, '../../node_modules'));

    // load the app dependencies
    await CoffeeBuilder.config.load();

    // set the passed config
    CoffeeBuilder.config.setup(userConfig);

    // run the plugins at "start" moment
    CoffeeBuilder._api._runPlugins('start');

    // init watch
    // if (CoffeeBuilder.config.get('watch')) this._initWatch();

    // run the "end" plugins phase
    process.on('beforeExit', () => {
      CoffeeBuilder._api._runPlugins('end');
    });

    // restore the hided cursor on process exit
    __restoreCursor();

    // display the "home" UI
    CoffeeBuilder.ui.changeLocation('home');

    return true;

  }

  /**
   * @name                                _loadConfigs
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderApp
   * @type                                Function
   * 
   * Load the default and the base config files
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _loadConfigs(userConfig) {
    const defaultConfig = require('../../coffeebuilder.config');
    const baseConfig = {};
    if (__fs.existsSync(`${process.cwd()}/coffeebuilder.config.js`)) {
      baseConfig = require(`${process.cwd()}/coffeebuilder.config.js`);
    }
    return __deepMerge(defaultConfig, baseConfig, userConfig);
  }

  /**
   * @name                                _searchPackages
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * @private
   * 
   * Search for the packages inside sub folders
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _searchPackages(userConfig) {

    const config = await this._loadConfigs(userConfig);

    // search for all the packages
    const packagesAdaptersClassesArray = config.packagesAdapters;

    let packagesPaths = [];

    packagesAdaptersClassesArray.forEach(adapterClass => {
      const search = adapterClass.searchGlob;
      const ignore = adapterClass.ignoreGlob || '';
      if (adapterClass.searchGlob) {
        packagesPaths = packagesPaths.concat(__glob.sync(search, {
          ignore
        }));
      }
    });

    packagesPaths = packagesPaths.map(p => {
      const parts = p.split('/');
      parts.pop();
      return parts.join('/');
    }).filter(p => p !== '');

    return packagesPaths;
  }

  _drawLoading() {

    if (!this._blessedScreen) {
      this._blessedScreen = __blessed.screen({
        smartCSR: false,
        fullUnicode: true,
        forceUnicode: true
      });
      // Quit on Escape, q, or Control-C.
      this._blessedScreen.key(['C-c'], function (ch, key) {
        return process.exit(0);
      });
    }
    if (!this._blessedContent) {
      this._blessedContent = __blessed.box({
        top: 'center',
        left: 'center',
        width: 36,
        height: 1,
        content: __parseHtml('Loading <yellow><bold>CoffeeBuilder</bold></yellow> please wait...'),
        tags: true,
        scrollable: true
      });
      this._blessedScreen.append(this._blessedContent);
    }

    this._blessedScreen.render();

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

    //   // loop on each packages to watch
    //   Object.keys(CoffeeBuilder.config.base.packages).forEach((packageKey, i) => {

    //     const packagePath = CoffeeBuilder.config.base.packages[packageKey];

    //     CoffeeBuilder.config.current.compile.forEach(compile => {

    //       const fileObj = CoffeeBuilder.config.current.resources[compile];
    //       if (!fileObj || !fileObj.sourcesFolders) return;
    //       fileObj.sourcesFolders.forEach((folder) => {

    //         __chokidar.watch(`${process.cwd()}/${packagePath}/${folder}/${fileObj.sources}`).on('change', (event, path) => {
    //           console.log('Update in', packagePath, folder, fileObj.sources);
    //           this.run(packageKey, [compile]);
    //         });
    //       });
    //     });
    //   });
    // }

  }

}

module.exports = CoffeeBuilderApp;
