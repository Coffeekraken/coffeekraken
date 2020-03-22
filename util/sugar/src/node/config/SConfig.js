const __fs = require('fs');
const __log = require('../log/log');
const __isPath = require('../fs/isPath');
const __fileName = require('../fs/filename');
const __methodExists = require('../class/methodExists');
const __isPlainObject = require('../is/plainObject');
const __isClass = require('../is/class');
const __deepMerge = require('../object/deepMerge');
const __get = require('../object/get');
const __set = require('../object/set');

/**
 * @name                                            config
 * @namespace                                       sugar.node.config
 * @type                                            Class
 *
 * This class allows you to quickly access/update some configuration depending on the data adapters specified.
 * The base available data adapters are "json" and "js" allowing you to store data inside files on the server drive.
 *
 * @example             js
 * const SConfig = require('@coffeekraken/sugar/node/class/SConfig');
 * const config = new SConfig({
 *    json: {
 *      filename: process.cwd() + '/config.json',
 *      encrypt: base64.encrypt,
 *      decrypt: base64.decrypt
 *    }
 * });
 * await config.get('log.frontend.mail.host'); // => gmail.google.com
 * await config.set('log.frontend.mail.host', 'mailchimp.com');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SConfig {

  /**
   * @name              _name
   * @type              {String}
   * 
   * The name of the config
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            _adapters
   * @type            {Object}
   * 
   * Save the list of available adapters by name: adapterPath
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _adapters = {};

  /**
   * @name             _settings
   * @type              {Object}
   * 
   * Store the actual settings object
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @constructor
   * @type                  Function
   * 
   * Init the config instance by passing a name and a settings object to configure your instance
   * 
   * @param                 {String}                    name                  The name of the config
   * @param                {Object}                    [settings={}]          
   * An object to configure your SConfig instance. See the list above
   * The available settings are:
   * - @setting         {String}            [adapters=["js"]]              An array of adapters name/instances to use for this SConfig instance
   * - @setting         {Boolean}           [allowSet=true]             Specify if you can change the configs during the process or not
   * - @settings        {Boolean}           [allowReset=true]           Specify if you can rest the configs during the process or not
   * @return              {SConfig}                                           An SConfig instance with the once you can access/update the configs
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(name, settings = {}) {

    // save the settings name
    this._name = name;

    // save the settings
    this._settings = {
      adapters: ['js'],
      allowSet: true,
      allowReset: true,
      allowNewConfig: false,
      throwErrorOnUndefinedConfig: true,
      ...settings
    };

    // init all the adapters if needed
    this._settings.adapters.forEach(adapter => {

      let adapterSettings = {
        name
      };
      let adapterName = null;
      let adapterInstance = null;

      if (__isPlainObject(adapter) && adapter.settings) {
        adapterSettings = __deepMerge(adapterSettings, adapter.settings);
      }
      if (__isPlainObject(adapter) && adapter.adapter) {
        adapterInstance = adapter.adapter;
      } else {
        adapterInstance = adapter;
      }

      if (__isClass(adapterInstance)) {
        if (adapterInstance.defaultSettings) {
          adapterSettings = __deepMerge(adapterInstance.defaultSettings, adapterSettings);
        }
        adapterName = adapterInstance.name;
        adapterInstance = new adapterInstance(adapterSettings);
      } else if (typeof adapterInstance === 'object' && !__isPlainObject(adapterInstance)) {
        // it's already an instance of the adapter
        adapterName = adapterInstance.constructor.name;
      } else if (typeof adapterInstance === 'string') {
        if (__isPath(adapterInstance, true)) {
          const cls = require(adapterInstance);
          if (cls.defaultSettings) {
            adapterSettings = __deepMerge(cls.defaultSettings, adapterSettings);
          }
          adapterName = cls.name;
          adapterInstance = new cls(adapterSettings);
        } else {
          // check that the passed adapter is a default one
          if (!__fs.existsSync(`${__dirname}/sConfigAdapters/${adapterInstance}.js`)) {
            throw new Error(`You have specified the adapter "${adapterInstance}" as adapter to use but it does not exists...`);
          }
          // load the class and instanciate it
          const cls = require(`${__dirname}/sConfigAdapters/${adapterInstance}.js`);
          if (cls.defaultSettings) {
            adapterSettings = __deepMerge(cls.defaultSettings, adapterSettings);
          }
          adapterName = cls.name;
          adapterInstance = new cls(adapterSettings);
        }
      }
      this._adapters[adapterName] = {
        instance: adapterInstance,
        config: {}
      }

    });

    // set the default get adapter if it has not been specified in the settings
    if (!this._settings.defaultGetAdapter) {
      this._settings.defaultGetAdapter = Object.keys(this._adapters)[0];
    }

  }

  /**
   * @name                                get
   * @namespace                           sugar.node.config.SConfig
   * @type                                Function
   *
   * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
   *
   * @param                 {String}                      path                 The dotted object path for the value wanted
   * @param                 {String}                      [adapter=null]       The data adapter that you want to use to retreive this value
   * @return                {Promise}                                          A promise that will be resolved once the data has been retreived...
   *
   * @example               js
   * await config.get('log.frontend.mail.host'); // => gmail.google.com
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get(path, adapter = this._settings.defaultGetAdapter) {

    if (adapter && !this._adapters[adapter]) {
      throw new Error(`You try to get the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`);
    }

    const value = __get(this._adapters[adapter].config, path);

    if (this._settings.throwErrorOnUndefinedConfig && value === undefined) {
      throw new Error(`You try to get the config "${path}" on the "${this._name}" SConfig instance but this config does not exists...`);
    }

    return value;

  }

  /**
   * @name                                set
   * @namespace                           sugar.node.config.SConfig
   * @type                                Function
   *
   * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
   *
   * @param                 {String}                      path                 The dotted object path for the value wanted
   * @param                 {String}                      [adapter=null]       The data adapter that you want to use to retreive this value
   * @return                {Promise}                                          A promise that will be resolved once the data has been retreived...
   *
   * @example               js
   * await config.get('log.frontend.mail.host'); // => gmail.google.com
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  set(path, value, adapters = Object.keys(this._adapters)) {

    if (!this._settings.allowSet) {
      throw new Error(`You try to set a config value on the "${this._name}" SConfig instance but this instance does not allow to set values... Set the "settings.allowSet" property to allow this action...`);
    }

    // check if we allow new config or not
    if (!this._settings.allowNewConfig && __get(this._adapters[this._settings.defaultGetAdapter].config, path) === undefined) {
      throw new Error(`You try to set the config "${path}" on the "${this._name}" SConfig instance but this config does not exists and this instance does not allow for new config creation...`);
    }

    adapters.forEach(adapter => {

      if (adapter && !this._adapters[adapter]) {
        throw new Error(`You try to set the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`);
      }

      __set(this._adapters[adapter].config, path, value);

    });
  }

};
