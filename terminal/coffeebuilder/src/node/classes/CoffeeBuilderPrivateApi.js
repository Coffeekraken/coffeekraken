const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __fs = require('fs');
const __path = require('path');
const __glob = require('glob');
const __defaultConfig = require('../../../coffeebuilder.config');

/**
 * @name                            api
 * @namespace                       terminal.coffeebuilder.node
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
   * @name                      _defaultConfig
   * @namespace                 terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                      Object
   * @private
   * 
   * Store the default coffeebuilder configuration object
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _defaultConfig = {};

  /**
   * @name                      _baseConfig
   * @namespace                 terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                      Object
   * @private
   * 
   * Store the default coffeebuilder configuration mixed with the configuration in the "process.cwd()" folder
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _baseConfig = {};

  /**
   * @name                      _config
   * @namespace                 terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                      Object
   * @private
   * 
   * Store the current package configuration object
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _config = {};

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

    // load the configuration
    this._loadConfig();

  }

  /**
   * @aname                               _loadConfig
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * 
   * Load the configuration from the default one and the current package one if it exist
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _loadConfig() {

    const defaultConfig = require(__path.resolve(__dirname, '../../../coffeebuilder.config'));
    let baseConfig = {};

    this._defaultConfig = Object.assign({}, defaultConfig);

    if (__fs.existsSync(__path.resolve(process.cwd(), 'coffeebuilder.config.js'))) {
      baseConfig = require(__path.resolve(process.cwd(), 'coffeebuilder.config.js'));
    }

    this._baseConfig = Object.assign({}, __deepMerge(defaultConfig, baseConfig));

    if (!this._baseConfig.packages || Object.keys(this._baseConfig.packages).length === 0) {
      // find the packages
      let packagesObj = this._searchPackages();

      // check if theirs a package.json at the process root folder
      if (__fs.existsSync(__path.resolve(process.cwd(), 'package.json'))) {
        const packageJson = require(__path.resolve(process.cwd(), 'package.json'));
        const obj = {};
        obj[packageJson.name] = process.cwd();
        packagesObj = Object.assign(obj, packagesObj);
      }

      this._baseConfig.packages = packagesObj;
    }

    // init the config object
    this._config = Object.assign({}, this._baseConfig);

    // set the current package if possible
    let _currentPackage;
    if (Object.keys(this._baseConfig.packages).length > 0 && !_currentPackage) {
      const firstPackageName = Object.keys(this._baseConfig.packages)[0];
      this.setCurrentPackageByName(firstPackageName);
    }

  }

  /**
   * @name                                setConfig
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Function
   * 
   * Merge the passed config with the baseConfig one
   * 
   * @param           {Object}            config            The config object to merge
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  setConfig(config) {
    this._baseConfig = Object.assign({}, __deepMerge(this._baseConfig, config));
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
    this._currentPackageName = packageName;

    let packageConfig = {};
    if (packageName && this._baseConfig.packages[packageName]) {
      if (__fs.existsSync(__path.resolve(process.cwd(), this._baseConfig.packages[packageName], 'coffeebuilder.config.js'))) {
        packageConfig = require(__path.resolve(process.cwd(), this._baseConfig.packages[packageName], 'coffeebuilder.config.js'));
      }
    }
    this._config = Object.assign({}, __deepMerge(this._baseConfig, packageConfig));
    delete this._config.packages;
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
    return Object.values(this._baseConfig.packages);
  }

  /**
   * @name                                config
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Object
   * 
   * Access the config object. This object is the result of the default coffeebuilder config mixed with the "base" config specified in the "coffeebuilder.config.js" file
   * at the "process.cwd()" folder path and mixed with the current package config specified in the "coffeebuilder.config.js" file at the package root path...
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get config() {
    return this._config;
  }

  /**
   * @name                                baseConfig
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Object
   * 
   * Access the baseConfig object. This object is the result of the default coffeebuilder config mixed with the "base" baseConfig specified in the "coffeebuilder.baseConfig.js" file
   * at the "process.cwd()" folder path.
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get baseConfig() {
    return this._baseConfig;
  }

  /**
   * @name                                defaultConfig
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderPrivateApi
   * @type                                Object
   * 
   * Access the defaultConfig object. This object is the one specified in the CoffeeBuilder package.
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get defaultConfig() {
    return this._defaultConfig;
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
  _searchPackages() {
    // search for all the packages
    let packages = __glob.sync('**/*(package.json|coffeebuilder.config.js)', {
      ignore: '**/node_modules/**'
    }).map(p => {
      return p.replace('/package.json', '').replace('/coffeebuilder.config.js', '');
    });
    packages = [...new Set(packages)];
    const packagesObj = {};
    packages.forEach(p => {
      if (__fs.existsSync(__path.resolve(process.cwd(), p, 'package.json'))) {
        const packageJson = require(__path.resolve(process.cwd(), p, 'package.json'));
        packagesObj[packageJson.name] = p;
      }
    });
    return packagesObj;
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

    for (let i = 0; i < Object.keys(this._config.plugins).length; i++) {
      const pluginObj = this._config.plugins[Object.keys(this._config.plugins)[i]];
      if (pluginObj.plugin[when]) {
        await pluginObj.plugin[when](CoffeeBuilder.stats, this._config.plugins[Object.keys(this._config.plugins)[i]].settings, this);
      }
    }

  }

}

module.exports = CoffeeBuilderPrivateApi;