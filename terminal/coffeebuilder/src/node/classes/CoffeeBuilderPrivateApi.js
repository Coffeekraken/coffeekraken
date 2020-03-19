const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __fs = require('fs');
const __path = require('path');
const __glob = require('glob');

const __CoffeeBuilderPackage = require('./CoffeeBuilderPackage');

/**
 * @name                            CoffeeBuilderPrivateApi
 * @namespace                       terminal.coffeebuilder.node.classes
 * @type                            Class
 * 
 * Expose some methods to interact with the coffeebuilder instance, settings, etc...
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class CoffeeBuilderPrivateApi {

  /**
   * @name            _injectScriptFilePath
   * @namespace       terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type            String
   * @private
   * 
   * Store the file path where the injected script will be injected
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _injectScriptFilePath = `${__tmpDir()}/coffeeBuilderInjectScript.js`;

  /**
   * @name                        _currentPackageName
   * @namespace                   terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                        String
   * @private
   * 
   * Store the current package name
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _currentPackageName = null;

  /**
   * @name            constructor
   * @namespace       terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type            Function
   * @constructor
   * 
   * Construct the class
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {
    setTimeout(() => {
      this._initPackages();
      this._listenPackagesUpdated();
      this._listenCompilationErrors();
    });
  }

  /**
   * @name                                getCurrentPackageName
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * 
   * Return the current package name
   * 
   * @return            {String}                      The current package name or null if is the "default" one
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getCurrentPackageName() {
    return this._currentPackageName;
  }

  /**
   * @name                                setCurrentPackageByName
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * 
   * Set the current package name
   * 
   * @param           {String}              packageName             The package name to set
   * 
   * @todo      low           Check that the passed package name exist
   * @todo      low           Emit and event
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  setCurrentPackageByName(packageName) {

    if (!this.getPackage(packageName)) {
      return CoffeeBuilder.ui.changeLocation('error', {
        message: `You try to access the package "<red>${packageName}</red>" but it has not been registered...`
      });
    }

    this._currentPackageName = packageName;

    CoffeeBuilder.config.current = Object.assign({}, this.getPackage(packageName).config);
    delete CoffeeBuilder.config.current.packages;
  }

  /**
   * @name                                getCurrentPackage
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * 
   * Return the current package instance
   * 
   * @return      {CoffeeBuilderPackage}            The package instance
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getCurrentPackage() {
    return this.getPackage(this.getCurrentPackageName());
  }

  /**
   * @name                                getPackagesPathes
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * 
   * Return an array of packages pathes
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getPackagesPathes() {
    return CoffeeBuilder.config.base.packages;
  }

  /**
   * @name                                _initPackages
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * 
   * Init the packages instances
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initPackages() {
    // loop on the packages pathes registered in the config
    if (this._packagesCache) return this._packagesCache;
    this._packagesCache = {}
    CoffeeBuilder.config.base.packages.forEach(p => {
      const packageInstance = new __CoffeeBuilderPackage(p);
      this._packagesCache[packageInstance.name] = packageInstance;
    });
    this.setCurrentPackageByName(this._packagesCache[Object.keys(this._packagesCache)[0]].name);
    CoffeeBuilder.ui.draw();
    return this._packagesCache;
  }

  /**
   * @name                                _listenPackagesUpdated
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * @private
   * 
   * Listen for the "packageUpdated" event on the CoffeeBuilderEvents instance and run the build automatically
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _listenPackagesUpdated() {
    CoffeeBuilder.events.on('packageUpdated', (p) => {
      this.setCurrentPackageByName(p.name);
      CoffeeBuilder.api.run();
      if (CoffeeBuilder.config.get('autoSwitch')) {
        CoffeeBuilder.ui.changeLocation('build');
      }
    });
  }

  _listenCompilationErrors() {
    CoffeeBuilder.events.on('compilationFailed', (e) => {
      console.log('COMPilation failed', e);
    });
  }

  /**
   * @name                                getPackages
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * 
   * Return an object of all the packages found in the current CoffeeBuilder process
   * The object is formated like so:
   * {
   *    "packageName": "packageInstance {CoffeeBuilderPackage}"
   * }
   * 
   * @return          {Object}                  An object of founded packages in the current process
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getPackages() {
    if (!this._packagesCache) this._initPackages();
    return this._packagesCache;
  }

  /**
   * @name                                getPackage
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * 
   * Return the CoffeeBuilderPackage instance of the passed package name
   * 
   * @param           {String}                packageName         The package name wanted
   * @return          {CoffeeBuilderPackage}                  The CoffeeBuilderPackage instance of the required package
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getPackage(packageName) {
    const packages = this.getPackages();
    return packages[packageName];
  }

  /**
   * @name                                _runPlugins
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * @private
   * 
   * Run the registered plugins based on the "moment" ou want like "start", "before", etc...
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _runPlugins(when = 'after') {

    for (let i = 0; i < Object.keys(CoffeeBuilder.config.current.plugins).length; i++) {
      const pluginObj = CoffeeBuilder.config.current.plugins[Object.keys(CoffeeBuilder.config.current.plugins)[i]];
      if (pluginObj.plugin[when]) {
        await pluginObj.plugin[when](CoffeeBuilder.stats, CoffeeBuilder.config.current.plugins[Object.keys(CoffeeBuilder.config.current.plugins)[i]].settings, this);
      }
    }

  }

}

module.exports = CoffeeBuilderPrivateApi;