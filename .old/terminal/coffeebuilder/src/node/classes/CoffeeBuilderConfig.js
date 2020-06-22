const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');
const __get = require('@coffeekraken/sugar/node/object/get');
const __set = require('@coffeekraken/sugar/node/object/set');
const __fs = require('fs');
const __path = require('path');
const __glob = require('glob');

/**
 * @name                            CoffeeBuilderConfig
 * @namespace                       terminal.coffeebuilder.node.classes
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

  }

  /**
   * @aname                               load
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderConfig
   * @type                                Function
   * 
   * Load the configuration from the default one and the current package one if it exist
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  load() {
    return new Promise((resolve, reject) => {

      const defaultConfig = require(__path.resolve(__dirname, '../../../coffeebuilder.config'));
      let baseConfig = {};

      this.__defaultConfig = Object.assign({}, defaultConfig);

      if (__fs.existsSync(__path.resolve(process.cwd(), 'coffeebuilder.config.js'))) {
        baseConfig = require(__path.resolve(process.cwd(), 'coffeebuilder.config.js'));
      }

      this._baseConfig = Object.assign({}, __deepMerge(defaultConfig, baseConfig));

      // init the config object
      this._currentConfig = Object.assign({}, this._baseConfig);

      resolve();

    });
  }

  /**
   * @name                                get
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderConfig
   * @type                                Boolean
   * 
   * This will return the current requested config but if the user has made a change manually to the requested
   * config, it will be his value that will be returned
   * 
   * @param           {String}                  path                  The config path to get like "autoSwitch" or "something.cool"
   * @param           {Boolean}                 [userProxy=true]      Tell if we want to check first in the user proxied values or not
   * @return          {Mixed}                                         Either the current config or the user setted one
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get(path, userProxy = true) {
    if (userProxy) {
      if (!this._userProxiedConfig) this._userProxiedConfig = {};
      const userValue = __get(this._userProxiedConfig, path);
      if (userValue !== undefined) return userValue;
    }
    return __get(this._currentConfig, path);
  }

  /**
   * @name                                set
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderConfig
   * @type                                Boolean
   * 
   * This will set a user defined config and save it to be able to return it when the "get" method is called
   * 
   * @param           {String}                  path                  The config path to get like "autoSwitch" or "something.cool"
   * @param           {Mixed}                   value                 The config value to set
   * @param           {Boolean}                 [userProxy=false]     Tell if the value setted has to be savec as a user proxied value
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  set(path, value, userProxy = false) {
    __set(this._currentConfig, path, value);
    if (userProxy) {
      if (!this._userProxiedConfig) this._userProxiedConfig = {};
      __set(this._userProxiedConfig, path, value);
    }
  }

  /**
   * @name                                setup
   * @namespace                           terminal.coffeebuilder.node.classes.CoffeeBuilderConfig
   * @type                                Function
   * 
   * Merge the passed config with the baseConfig one
   * 
   * @param           {Object}            config            The config object to merge
   * 
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  setup(config) {
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