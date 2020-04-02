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
const __upperFirst = require('../string/upperFirst');

/**
 * @name                                            config
 * @namespace                                       sugar.node.config
 * @type                                            Class
 *
 * This class allows you to quickly access/update some configuration depending on the data adapters specified.
 * The base available data adapters are "json" and "js" allowing you to store data inside files on the server drive.
 *
 * @example             js
 * const SConfig = require('@coffeekraken/sugar/node/config/SConfig');
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
   * - adapters (['js']) {Array}: An array of adapters names/instances to use for this SConfig instance
   * - defaultAdapter (null) {String}: This specify which adapter you want to use as default one. If not set, take the first adapter in the adapters list
   * - allowSave (true) {Boolean}: Specify if this instance can save the updated configs
   * - allowSet (true) {Boolean}: Specify if you can change the configs during the process or not
   * - allowReset (true) {Boolean}: Specify if you can rest the configs during the process or not
   * - allowNew (false) {Boolean}: Specify you can create new configs with this instance or not
   * - autoLoad (true) {Boolean}: Specify if you want the config to be loaded automatically at instanciation
   * - throwErrorOnUndefinedConfig (true) {Boolean}: Specify if you want the class to throw some errors when get undefined configs
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
      defaultAdapter: null,
      allowSave: true,
      allowSet: true,
      allowReset: true,
      allowNew: false,
      autoLoad: true,
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
          if (!__fs.existsSync(`${__dirname}/adapters/SConfig${__upperFirst(adapterInstance)}Adapter.js`)) {
            throw new Error(`You have specified the adapter "${adapterInstance}" as adapter to use but it does not exists...`);
          }
          // load the class and instanciate it
          const cls = require(`${__dirname}/adapters/SConfig${__upperFirst(adapterInstance)}Adapter.js`);
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
    if (!this._settings.defaultAdapter) {
      this._settings.defaultAdapter = Object.keys(this._adapters)[0];
    }

    // load the config from the default adapter if the setting "autoLoad" is true
    if (this._settings.autoLoad) {
      (async () => {
        await this.load();
      })();
    }

  }

  /**
   * @name                                load
   * @type                                Function
   * 
   * Load the config from the default adapter or from the passed adapter
   * 
   * @param           {String}            [adapter=this._settings.defaultAdapter]         The adapter to use to load the config
   * @return          {Promise}                                                           A promise that will be resolved with the loaded config
   * 
   * @example           js
   * const config = await config.load();
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  load(adapter = this._settings.defaultAdapter) {
    if (!this._adapters[adapter]) {
      throw new Error(`You try to load the config from the adapter "${adapter}" but this adapter does not exists...`);
    }
    const config = this._adapters[adapter].instance.load();
    this._adapters[adapter].config = config;
    return config;
  }

  /**
   * @name                          save
   * @type                          Function
   * 
   * Save the config through all the registered adapters or just the one specify in params
   * 
   * @param           {String|Array}          [adapters=Object.keys(this._adapters)]        The adapters to save the config through
   * @return          {Promise}                                                              A promise once all the adapters have correctly saved the config
   * 
   * @example           js
   * await config.save();
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async save(adapters = Object.keys(this._adapters)) {

    if (!this._settings.allowSave) {
      throw new Error(`You try to save the config on the "${this._name}" SConfig instance but this instance does not allow to save configs... Set the "settings.allowSave" property to allow this action...`);
    }

    for (let i = 0; i < adapters.length; i++) {
      const adapter = adapters[i];

      if (adapter && !this._adapters[adapter]) {
        throw new Error(`You try to save the config on the "${this._name}" SConfig instance using the adapter "${adapter}" but this adapter does not exists...`);
      }

      await this._adapters[adapter].instance.save(this._adapters[adapter].config);

    }

    // all saved correctly
    return true;

  }

  /**
   * @name                                get
   * @type                                Function
   *
   * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
   *
   * @param                 {String}                      path                 The dotted object path for the value wanted
   * @param                 {String}                      [adapter=null]       The data adapter that you want to use to retreive this value
   * @return                {Mixed}                                            The value getted
   *
   * @example               js
   * await config.get('log.frontend.mail.host'); // => gmail.google.com
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get(path, adapter = this._settings.defaultAdapter) {

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
   * @param                 {Mixed}                       value                 The value to set
   * @param                 {String|Array}                      [adapters=Object.keys(this._adapters)]       The adapter you want to use or an array of adapters
   *
   * @example               js
   * config.set('log.frontend.mail.host', 'coffeekraken.io');
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  set(path, value, adapters = Object.keys(this._adapters)) {

    if (!this._settings.allowSet) {
      throw new Error(`You try to set a config value on the "${this._name}" SConfig instance but this instance does not allow to set values... Set the "settings.allowSet" property to allow this action...`);
    }

    // check if we allow new config or not
    if (!this._settings.allowNew && __get(this._adapters[this._settings.defaultAdapter].config, path) === undefined) {
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
