const __tmpDir = require('@coffeekraken/sugar/node/fs/tmpDir');
const __writeFileSync = require('@coffeekraken/sugar/node/fs/writeFileSync');
const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __fs = require('fs');
const __path = require('path');
const __glob = require('glob');
const __defaultConfig = require('../../../coffeebuilder.config');

const __coffeeBuilderApi = require('./CoffeeBuilderApi');

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
   * @namespace       terminal.coffeebuilder.node.classes.CoffeeBuilderApi
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
   * @namespace                 terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                      Object
   * 
   * Store the default coffeebuilder configuration object
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _defaultConfig = {};

  /**
   * @name                      _baseConfig
   * @namespace                 terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                      Object
   * 
   * Store the default coffeebuilder configuration mixed with the configuration in the "process.cwd()" folder
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _baseConfig = {};

  /**
   * @name                      _config
   * @namespace                 terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                      Object
   * 
   * Store the current package configuration object
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _config = {};

  /**
   * @name            constructor
   * @namespace       terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type            Function
   * @constructor
   * 
   * Construct the class
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor() {

    setTimeout(() => {
      // load the configuration
      this._loadConfig();
    });

  }

  /**
   * @aname                               _loadConfig
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                                Function
   * 
   * Load the configuration from the default one and the current package one if it exist
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _loadConfig() {

    const defaultConfig = require(__path.resolve(__dirname, '../../../coffeebuilder.config'));
    let packageConfig = {}, baseConfig = {};

    this._defaultConfig = Object.assign({}, defaultConfig);

    if (__fs.existsSync(__path.resolve(process.cwd(), 'coffeebuilder.config.js'))) {
      baseConfig = require(__path.resolve(process.cwd(), 'coffeebuilder.config.js'));
    }

    this._baseConfig = Object.assign({}, __deepMerge(defaultConfig, baseConfig));

    if (!this._baseConfig.packages || Object.keys(this._baseConfig.packages).length === 0) {
      // find the packages
      const packagesObj = this._searchPackages();
      this._baseConfig.packages = packagesObj;
    }

    // set the current package if possible
    let _currentPackage = __coffeeBuilderApi.getCurrentPackage();
    if (Object.keys(this._baseConfig.packages).length > 0 && !_currentPackage) {
      const firstPackageName = Object.keys(this._baseConfig.packages)[0];
      _currentPackage = firstPackageName;
      __coffeeBuilderApi.setCurrentPackage(firstPackageName);
    }

    if (_currentPackage && this._baseConfig.packages[_currentPackage]) {
      if (__fs.existsSync(__path.resolve(__dirname, this._baseConfig.packages[_currentPackage], 'coffeebuilder.config.js'))) {
        packageConfig = require(__path.resolve(__dirname, this._baseConfig.packages[_currentPackage], 'coffeebuilder.config.js'));
      }
    }
    this._config = Object.assign({}, __deepMerge(this._baseConfig, packageConfig));

    console.log(_currentPackage, this._config);
    process.exit();

    console.log('DC', defaultConfig);

  }

  /**
   * @name                                _searchPackages
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                                Function
   * @private
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
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderApi
   * @type                                Function
   * @private
   * 
   * Run the registered plugins based on the "moment" ou want like "start", "before", etc...
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async _runPlugins(when = 'after') {

    for (let i = 0; i < Object.keys(this.config.plugins).length; i++) {
      const pluginObj = this.config.plugins[Object.keys(this.config.plugins)[i]];
      if (pluginObj.plugin[when]) {
        await pluginObj.plugin[when](this.stats, this.config.plugins[Object.keys(this.config.plugins)[i]].settings, this);
      }
    }

  }

}

module.exports = new CoffeeBuilderPrivateApi();