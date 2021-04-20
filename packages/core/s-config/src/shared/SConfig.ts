// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __get from '@coffeekraken/sugar/shared/object/get';
import __set from '@coffeekraken/sugar/shared/object/set';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __SConfigAdapter from './adapters/SConfigAdapter';

/**
 * @name                                            config
 * @namespace           s-config.shared
 * @type                                            Class
 * @status              beta
 *
 * This class allows you to quickly access/update some configuration depending on the data adapters specified.
 * The base available data adapters are:
 * - For node:
 *  - File system adapter: @coffeekraken/s-config/src/node/adapters/SConfigFsAdapter
 * - For js:
 *  - Localstorage adapter: @coffeekraken/s-config/src/js/adapters/SConfigLsAdapter
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      Add a "catch" method that allows to get the saving errors, etc...
 *
 * @example             js
 * import SConfig, { SConfigLsAdapter } from '@coffeekraken/s-config';
 * const config = new SConfig({
 *   adapters: [
 *    new SConfigLsAdapter()
 *   ]
 * });
 * await config.get('log.frontend.mail.host'); // => gmail.google.com
 * await config.set('log.frontend.mail.host', 'mailchimp.com');
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SConfig {
  /**
   * @name              _name
   * @type              {String}
   * @private
   *
   * The name of the config
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _name = null;

  /**
   * @name            _adapters
   * @type            {Object}
   * @private
   *
   * Save the registered adapters instances
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _adapters = {};

  /**
   * @name             _settings
   * @type              {Object}
   * @private
   *
   * Store the actual settings object
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  static _registeredProxies: any = {};
  static registerProxy(configId, scopePath, proxyFn) {
    if (!this._registeredProxies[configId])
      this._registeredProxies[configId] = {};
    this._registeredProxies[configId][scopePath] = proxyFn;
  }

  /**
   * @name                  constructor
   * @type                  Function
   *
   * Init the config instance by passing a name and a settings object to configure your instance
   *
   * @param                 {String}                   name                  The name of the config
   * @param                {Object}                    [settings={}]
   * An object to configure your SConfig instance. See the list above
   * The available settings are:
   * - adapters ([]) {Array}: An array of adapters instances to use for this SConfig instance
   * - defaultAdapter (null) {String}: This specify which adapter you want to use as default one. If not set, take the first adapter in the adapters list
   * - allowSave (true) {Boolean}: Specify if this instance can save the updated configs
   * - allowSet (true) {Boolean}: Specify if you can change the configs during the process or not
   * - allowReset (true) {Boolean}: Specify if you can rest the configs during the process or not
   * - allowNew (false) {Boolean}: Specify you can create new configs with this instance or not
   * - autoLoad (true) {Boolean}: Specify if you want the config to be loaded automatically at instanciation
   * - autoSave (true) {Boolean}: Specify if you want the setting to be saved through the adapters directly on "set" action
   * - throwErrorOnUndefinedConfig (true) {Boolean}: Specify if you want the class to throw some errors when get undefined configs
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(name, settings = {}) {
    // store the name
    if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
      throw new Error(
        `The name of an SConfig instance can contain only letters like [a-zA-Z0-9_-]...`
      );
    }

    // save the settings name
    this.id = name;

    // save the settings
    this._settings = {
      adapters: [],
      defaultAdapter: null,
      allowSave: true,
      allowSet: true,
      allowReset: true,
      allowNew: false,
      autoLoad: true,
      autoSave: true,
      updateTimeout: 500,
      throwErrorOnUndefinedConfig: true,
      ...settings
    };

    // init all the adapters if needed
    this._settings.adapters.forEach((adapter) => {
      if (!adapter instanceof __SConfigAdapter) {
        throw new Error(
          `You have specified the adapter "${
            adapter.name || 'unknown'
          }" as adapter for your "${
            this.id
          }" SConfig instance but this adapter does not extends the SConfigAdapter class...`
        );
      }

      // make sure we have a name for this adapter
      if (!adapter.name) {
        adapter.name = this.id + ':' + adapter.constructor.name;
      } else {
        adapter.name = this.id + ':' + adapter.name;
      }

      this._adapters[adapter.name] = {
        instance: adapter,
        config: {}
      };
    });

    // set the default get adapter if it has not been specified in the settings
    if (!this._settings.defaultAdapter) {
      this._settings.defaultAdapter = Object.keys(this._adapters)[0];
    }

    Object.keys(this._adapters).forEach((adapterName) => {
      const adapterObj = this._adapters[adapterName];
      let timeout;
      if (!adapterObj.instance) return;
      if (adapterObj.instance._settings.onUpdate) {
        adapterObj.instance._settings.onUpdate = () => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            // load the updated config
            this.load();
          }, this._settings.updateTimeout);
        };
      }
    });

    // load the config from the default adapter if the setting "autoLoad" is true
    if (this._settings.autoLoad) {
      this.load();
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
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  load(adapter = this._settings.defaultAdapter) {
    // make sure we load only once the config
    // if (_SConfigLoadingByAdapter[adapter]) {
    //   return null;
    // }
    // _SConfigLoadingByAdapter[adapter] = true;

    if (!this._adapters[adapter]) {
      throw new Error(
        `You try to load the config from the adapter "${adapter}" but this adapter does not exists...`
      );
    }

    if (Object.keys(this._adapters[adapter].config).length !== 0) {
      return this._adapters[adapter].config;
    }

    let config = this._adapters[adapter].instance.load();

    config = this._resolveInternalReferences(config, config);

    if (config instanceof Promise) {
      return new Promise((resolve) => {
        config.then((c) => {
          if (Object.keys(this._adapters[adapter].config).length === 0 && c) {
            this._adapters[adapter].config = c;
            this._adapters[adapter].config.$ = {
              hash: __md5.encrypt(c),
              loadedAt: Date.now()
            };
            return resolve(c);
          }
          return resolve(this._adapters[adapter].config);
        });
      });
    } else if (__isPlainObject(config)) {
      this._adapters[adapter].config = config;
      this._adapters[adapter].config.$ = {
        hash: __md5.encrypt(config),
        loadedAt: Date.now()
      };
      return config;
    } else if (config !== null && config !== undefined) {
      throw new Error(
        `SConfig: Your "load" method of the "${adapter}" adapter has to return either a plain object, or a Promise resolved with a plain object. The returned value is "${config}" which is of type "${typeof config}"...`
      );
    }
  }

  /**
   * @name                          save
   * @type                          Function
   *
   * Save the config through all the registered adapters or just the one specify in params
   *
   * @param           {String|Array}          [adapters=Object.keys(this._adapters)]        The adapters to save the config through
   * @return          {Promise}                                                             A promise once all the adapters have correctly saved the config
   *
   * @example           js
   * await config.save();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  save(adapters = Object.keys(this._adapters)) {
    if (!this._settings.allowSave) {
      throw new Error(
        `You try to save the config on the "${this.id}" SConfig instance but this instance does not allow to save configs... Set the "settings.allowSave" property to allow this action...`
      );
    }

    for (let i = 0; i < adapters.length; i++) {
      const adapter = adapters[i];

      if (adapter && !this._adapters[adapter]) {
        throw new Error(
          `You try to save the config on the "${this.id}" SConfig instance using the adapter "${adapter}" but this adapter does not exists...`
        );
      }

      this._adapters[adapter].instance.save(this._adapters[adapter].config);
    }

    // all saved correctly
    return true;
  }

  _resolveInternalReferences(originalValue, config, path = []) {
    if (__isPlainObject(originalValue)) {
      Object.keys(originalValue).forEach((key) => {
        if (key === '...') {
          originalValue = {
            ...originalValue,
            ...this._resolveInternalReferences(originalValue[key], config, [
              ...path,
              key
            ])
          };
        }
      });
      delete originalValue['...'];
      Object.keys(originalValue).forEach((key) => {
        try {
          originalValue[key] = this._resolveInternalReferences(
            originalValue[key],
            config,
            [...path, key]
          );
        } catch (e) {}
      });
    } else if (Array.isArray(originalValue)) {
      originalValue = originalValue.map((v) => {
        return this._resolveInternalReferences(v, config, path);
      });
    } else if (typeof originalValue === 'string') {
      const reg = /\[config.[a-zA-Z0-9.\-_]+\]/gm;
      const matches = originalValue.match(reg);

      if (matches && matches.length) {
        if (matches.length === 1 && originalValue === matches[0]) {
          const resolvedValue = __get(
            config,
            matches[0].replace('[config.', '').replace(']', '')
          );
          originalValue = this._resolveInternalReferences(
            resolvedValue,
            config,
            path
          );
        } else {
          matches.forEach((match) => {
            const resolvedValue = this._resolveInternalReferences(
              match,
              config,
              path
            );
            originalValue = originalValue.replace(match, resolvedValue);
          });
          originalValue = this._resolveInternalReferences(
            originalValue,
            config,
            path
          );
        }
      }
    }

    // check proxy
    if (this.constructor._registeredProxies[this.id][path[0]]) {
      originalValue = this.constructor._registeredProxies[this.id][path[0]](
        path.join('.'),
        originalValue,
        config
      );
    }

    return originalValue;
  }

  /**
   * @name                                get
   * @type                                Function
   *
   * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
   *
   * @param                 {String}                     path                 The dotted object path for the value wanted
   * @param                 {String}                      [adapter=null]       The data adapter that you want to use to retreive this value
   * @param                 {Object}                      [settings={}]         The same object settings that you can pass in the constructor but just for this get process
   * @return                {Mixed}                                            The value getted
   *
   * @example               js
   * await config.get('log.frontend.mail.host'); // => gmail.google.com
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get(
    path,
    adapter = this._settings.defaultAdapter,
    settings = {},
    _level = 0
  ) {
    settings = __deepMerge(this._settings, settings);

    if (adapter && !this._adapters[adapter]) {
      throw new Error(
        `You try to get the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`
      );
    }

    if (Object.keys(this._adapters[adapter].config).length === 0) {
      this.load();
    }

    const originalValue = __get(this._adapters[adapter].config, path);

    if (settings.throwErrorOnUndefinedConfig && originalValue === undefined) {
      throw new Error(
        `You try to get the config "${path}" on the "${this.id}" SConfig instance but this config does not exists...`
      );
    }

    return originalValue;
  }

  /**
   * @name                                set
   * @namespace           node.config.SConfig
   * @type                                Function
   *
   * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
   *
   * @param                 {String}                     path                 The dotted object path for the value wanted
   * @param                 {Mixed}                      value                 The value to set
   * @param                 {String|Array}                      [adapters=Object.keys(this._adapters)]       The adapter you want to use or an array of adapters
   * @return                {Promise}                                          A promise resolved once the setting has been correctly set (and save depending on your instance config)
   *
   * @example               js
   * config.set('log.frontend.mail.host', 'coffeekraken.io');
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  set(path, value, adapters = Object.keys(this._adapters)) {
    if (!this._settings.allowSet) {
      throw new Error(
        `You try to set a config value on the "${this.id}" SConfig instance but this instance does not allow to set values... Set the "settings.allowSet" property to allow this action...`
      );
    }

    // check if we allow new config or not
    if (
      !this._settings.allowNew &&
      __get(this._adapters[this._settings.defaultAdapter].config, path) ===
        undefined
    ) {
      throw new Error(
        `You try to set the config "${path}" on the "${this.id}" SConfig instance but this config does not exists and this instance does not allow for new config creation...`
      );
    }

    adapters.forEach((adapter) => {
      if (adapter && !this._adapters[adapter]) {
        throw new Error(
          `You try to set the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`
        );
      }

      __set(this._adapters[adapter].config, path, value);
    });

    // check if need to autoSave or not
    if (this._settings.autoSave) {
      return this.save(adapters);
    }

    // return true
    return true;
  }
}
