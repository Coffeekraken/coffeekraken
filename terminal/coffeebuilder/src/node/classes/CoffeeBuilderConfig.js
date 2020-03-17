const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __fs = require('fs');
const __path = require('path');
const __glob = require('glob');

/**
 * @name                            CoffeeBuilderConfig
 * @namespace                       terminal.coffeebuilder.node
 * @type                            Class
 * 
 * Expose some methods to interact with the coffeebuilder configuration
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class CoffeeBuilderConfig {

  /**
   * @name                      _defaultConfig
   * @namespace                 terminal.coffeebuilder.node.classes.CoffeeBuilderConfig
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
   * @namespace                 terminal.coffeebuilder.node.classes.CoffeeBuilderConfig
   * @type                      Object
   * @private
   * 
   * Store the default coffeebuilder configuration mixed with the configuration in the "process.cwd()" folder
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _baseConfig = {};

  /**
   * @name                      _currentConfig
   * @namespace                 terminal.coffeebuilder.node.classes.CoffeeBuilderConfig
   * @type                      Object
   * @private
   * 
   * Store the current package configuration object
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _currentConfig = {};

  /**
   * @name            constructor
   * @namespace       terminal.coffeebuilder.node.classes.CoffeeBuilderConfig
   * @type            Function
   * @constructor
   * 
   * Construct the class
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {

    // load the configs
    this._loadConfigs();

  }

  /**
   * @aname                               _loadConfigs
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderConfig
   * @type                                Function
   * 
   * Load the configuration from the default one and the current package one if it exist
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _loadConfigs() {

    const defaultConfig = require(__path.resolve(__dirname, '../../../coffeebuilder.config'));
    let baseConfig = {};

    this.__defaultConfig = Object.assign({}, defaultConfig);

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
    this._currentConfig = Object.assign({}, this._baseConfig);

    // set the current package if possible
    let _currentPackage;
    if (Object.keys(this._baseConfig.packages).length > 0 && !_currentPackage) {
      const firstPackageName = Object.keys(this._baseConfig.packages)[0];
      setTimeout(() => {
        CoffeeBuilder.api.setCurrentPackageByName(firstPackageName);
        CoffeeBuilder.ui.draw();
      });
    }

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
   * @name                                set
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderConfig
   * @type                                Function
   * 
   * Merge the passed config with the baseConfig one
   * 
   * @param           {Object}            config            The config object to merge
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  set(config) {
    this._baseConfig = Object.assign({}, __deepMerge(this._baseConfig, config));
  }

  /**
   * @name                                current
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderConfig
   * @type                                Object
   * 
   * Access the current config object. This object is the result of the default coffeebuilder config mixed with the "base" config specified in the "coffeebuilder.config.js" file
   * at the "process.cwd()" folder path and mixed with the current package config specified in the "coffeebuilder.config.js" file at the package root path...
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get current() {
    return this._currentConfig;
  }
  set current(value) {
    return this._currentConfig = value;
  }

  /**
   * @name                                baseConfig
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderConfig
   * @type                                Object
   * 
   * Access the baseConfig object. This object is the result of the default coffeebuilder config mixed with the "base" baseConfig specified in the "coffeebuilder.baseConfig.js" file
   * at the "process.cwd()" folder path.
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get base() {
    return this._baseConfig;
  }

  /**
   * @name                                defaultConfig
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderConfig
   * @type                                Object
   * 
   * Access the defaultConfig object. This object is the one specified in the CoffeeBuilder package.
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get default() {
    return this._defaultConfig;
  }

}

module.exports = CoffeeBuilderConfig;