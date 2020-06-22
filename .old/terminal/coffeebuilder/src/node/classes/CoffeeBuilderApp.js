const __moduleAlias = require('module-alias');
const __path = require('path');
const __fs = require('fs');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __glob = require('glob');

const __CoffeeBuilderApi = require('./CoffeeBuilderApi');
const __CoffeeBuilderPrivateApi = require('./CoffeeBuilderPrivateApi');
const __CoffeeBuilderEvents = require('./CoffeeBuilderEvents');
const __CoffeeBuilderUI = require('./CoffeeBuilderUI');
const __CoffeeBuilderStats = require('./CoffeeBuilderStats');
const __CoffeeBuilderConfig = require('./CoffeeBuilderConfig');
const __CoffeeBuilderWebpack = require('./CoffeeBuilderWebpack');

module.exports = class CoffeeBuilderApp extends __CoffeeBuilderApi {

  constructor() {
    super();
    if (global.CoffeeBuilder) {
      return global.CoffeeBuilder.app;
    }
  }

  async bootstrap(userConfig = {}) {
    const foundedPackages = await this._searchPackages(userConfig);
    if (!userConfig.packages) userConfig.packages = [];
    userConfig.packages = userConfig.packages.concat(foundedPackages);
    await this.starting(userConfig);
  }

  async starting(userConfig = {}) {

    // init all the classes needed
    global.CoffeeBuilder = {};
    CoffeeBuilder.app = this;
    CoffeeBuilder.events = new __CoffeeBuilderEvents();

    global.loga = (...args) => {
      CoffeeBuilder.events.emit('log', ...args);
    };

    loga('Hello', 'Coco', {
      plop: true
    });
    process.exit();

    CoffeeBuilder.stats = new __CoffeeBuilderStats();
    CoffeeBuilder.config = new __CoffeeBuilderConfig();
    CoffeeBuilder.api = this;
    CoffeeBuilder._api = new __CoffeeBuilderPrivateApi();
    CoffeeBuilder.ui = new __CoffeeBuilderUI();
    CoffeeBuilder.webpack = new __CoffeeBuilderWebpack();

    // add the "node_modules" path in module alias
    __moduleAlias.addPath(__path.resolve(__dirname, '../../../node_modules'));

    // load the app dependencies
    await CoffeeBuilder.config.load();

    // set the passed config
    CoffeeBuilder.config.setup(userConfig);

    // run the plugins at "start" moment
    CoffeeBuilder._api._runPlugins('start');

    // run the "end" plugins phase
    process.on('beforeExit', () => {
      CoffeeBuilder._api._runPlugins('end');
    });

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
    const defaultConfig = require('../../../coffeebuilder.config');
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

}
