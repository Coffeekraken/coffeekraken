const __chokidar = require('chokidar');
const __restoreCursor = require('restore-cursor');
const __moduleAlias = require('module-alias');
const __path = require('path');

const __CoffeeBuilderApi = require('./classes/CoffeeBuilderApi');
const __CoffeeBuilderPrivateApi = require('./classes/CoffeeBuilderPrivateApi');
const __CoffeeBuilderEvents = require('./classes/CoffeeBuilderEvents');
const __CoffeeBuilderUI = require('./classes/CoffeeBuilderUI');
const __CoffeeBuilderStats = require('./classes/CoffeeBuilderStats');
const __CoffeeBuilderWebpack = require('./classes/CoffeeBuilderWebpack');

class CoffeeBuilderApp extends __CoffeeBuilderApi {

  constructor(config = {}) {

    super();

    if (global.CoffeeBuilder) {
      return global.CoffeeBuilder.app;
    }

    // init all the classes needed
    global.CoffeeBuilder = {};
    CoffeeBuilder.app = this;
    CoffeeBuilder.events = new __CoffeeBuilderEvents();
    CoffeeBuilder.stats = new __CoffeeBuilderStats();
    CoffeeBuilder.api = this;
    CoffeeBuilder._api = new __CoffeeBuilderPrivateApi();
    CoffeeBuilder.ui = new __CoffeeBuilderUI();
    CoffeeBuilder.webpack = new __CoffeeBuilderWebpack();

    // add the "node_modules" path in module alias
    __moduleAlias.addPath(__path.resolve(__dirname, '../../node_modules'));

    // display the "home" UI
    CoffeeBuilder.ui.changeLocation('home');

    // set the passed config
    CoffeeBuilder._api.setConfig(config);

    // run the plugins at "start" moment
    CoffeeBuilder._api._runPlugins('start');

    // init watch
    if (CoffeeBuilder.api.config.watch) this._initWatch();

    // run the "end" plugins phase
    process.on('beforeExit', () => {
      CoffeeBuilder._api._runPlugins('end');
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
    Object.keys(CoffeeBuilder.api.baseConfig.packages).forEach((packageKey, i) => {

      const packagePath = CoffeeBuilder.api.baseConfig.packages[packageKey];

      CoffeeBuilder.api.config.compile.forEach(compile => {

        const fileObj = CoffeeBuilder.api.config.resources[compile];
        if (!fileObj || !fileObj.sourcesFolders) return;
        fileObj.sourcesFolders.forEach((folder) => {

          __chokidar.watch(`${process.cwd()}/${packagePath}/${folder}/${fileObj.sources}`).on('change', (event, path) => {
            console.log('Update in', packagePath, folder, fileObj.sources);
            this.run(packageKey, [compile]);
          });
        });
      });
    });
  }

}

module.exports = CoffeeBuilderApp;
