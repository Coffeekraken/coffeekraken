// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __get from '@coffeekraken/sugar/shared/object/get';
import __set from '@coffeekraken/sugar/shared/object/set';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
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
        /**
         * @name              _name
         * @type              {String}
         * @private
         *
         * The name of the config
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._name = null;
        /**
         * @name            _adapters
         * @type            {Object}
         * @private
         *
         * Save the registered adapters instances
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._adapters = {};
        /**
         * @name             _settings
         * @type              {Object}
         * @private
         *
         * Store the actual settings object
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        // store the name
        if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
            throw new Error(`The name of an SConfig instance can contain only letters like [a-zA-Z0-9_-]...`);
        }
        // save the settings name
        this.id = name;
        // save the settings
        this._settings = Object.assign({ adapters: [], defaultAdapter: null, allowSave: true, allowSet: true, allowReset: true, allowNew: false, autoLoad: true, autoSave: true, updateTimeout: 500, throwErrorOnUndefinedConfig: true }, settings);
        // init all the adapters if needed
        this._settings.adapters.forEach((adapter) => {
            if (!adapter instanceof __SConfigAdapter) {
                throw new Error(`You have specified the adapter "${adapter.name || 'unknown'}" as adapter for your "${this.id}" SConfig instance but this adapter does not extends the SConfigAdapter class...`);
            }
            // make sure we have a name for this adapter
            if (!adapter.name) {
                adapter.name = this.id + ':' + adapter.constructor.name;
            }
            else {
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
            if (!adapterObj.instance)
                return;
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
    static registerProxy(configId, scopePath, proxyFn) {
        if (!this._registeredProxies[configId])
            this._registeredProxies[configId] = {};
        this._registeredProxies[configId][scopePath] = proxyFn;
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
            throw new Error(`You try to load the config from the adapter "${adapter}" but this adapter does not exists...`);
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
        }
        else if (__isPlainObject(config)) {
            this._adapters[adapter].config = config;
            this._adapters[adapter].config.$ = {
                hash: __md5.encrypt(config),
                loadedAt: Date.now()
            };
            return config;
        }
        else if (config !== null && config !== undefined) {
            throw new Error(`SConfig: Your "load" method of the "${adapter}" adapter has to return either a plain object, or a Promise resolved with a plain object. The returned value is "${config}" which is of type "${typeof config}"...`);
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
            throw new Error(`You try to save the config on the "${this.id}" SConfig instance but this instance does not allow to save configs... Set the "settings.allowSave" property to allow this action...`);
        }
        for (let i = 0; i < adapters.length; i++) {
            const adapter = adapters[i];
            if (adapter && !this._adapters[adapter]) {
                throw new Error(`You try to save the config on the "${this.id}" SConfig instance using the adapter "${adapter}" but this adapter does not exists...`);
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
                    originalValue = Object.assign(Object.assign({}, originalValue), this._resolveInternalReferences(originalValue[key], config, [
                        ...path,
                        key
                    ]));
                }
            });
            delete originalValue['...'];
            Object.keys(originalValue).forEach((key) => {
                try {
                    originalValue[key] = this._resolveInternalReferences(originalValue[key], config, [...path, key]);
                }
                catch (e) { }
            });
        }
        else if (Array.isArray(originalValue)) {
            originalValue = originalValue.map((v) => {
                return this._resolveInternalReferences(v, config, path);
            });
        }
        else if (typeof originalValue === 'string') {
            const reg = /\[config.[a-zA-Z0-9.\-_]+\]/gm;
            const matches = originalValue.match(reg);
            if (matches && matches.length) {
                if (matches.length === 1 && originalValue === matches[0]) {
                    const resolvedValue = __get(config, matches[0].replace('[config.', '').replace(']', ''));
                    originalValue = this._resolveInternalReferences(resolvedValue, config, path);
                }
                else {
                    matches.forEach((match) => {
                        const resolvedValue = this._resolveInternalReferences(match, config, path);
                        originalValue = originalValue.replace(match, resolvedValue);
                    });
                    originalValue = this._resolveInternalReferences(originalValue, config, path);
                }
            }
        }
        // check proxy
        if (this.constructor._registeredProxies[this.id][path[0]]) {
            originalValue = this.constructor._registeredProxies[this.id][path[0]](path.join('.'), originalValue, config);
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
    get(path, adapter = this._settings.defaultAdapter, settings = {}, _level = 0) {
        settings = __deepMerge(this._settings, settings);
        if (adapter && !this._adapters[adapter]) {
            throw new Error(`You try to get the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`);
        }
        if (Object.keys(this._adapters[adapter].config).length === 0) {
            this.load();
        }
        const originalValue = __get(this._adapters[adapter].config, path);
        if (settings.throwErrorOnUndefinedConfig && originalValue === undefined) {
            throw new Error(`You try to get the config "${path}" on the "${this.id}" SConfig instance but this config does not exists...`);
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
            throw new Error(`You try to set a config value on the "${this.id}" SConfig instance but this instance does not allow to set values... Set the "settings.allowSet" property to allow this action...`);
        }
        // check if we allow new config or not
        if (!this._settings.allowNew &&
            __get(this._adapters[this._settings.defaultAdapter].config, path) ===
                undefined) {
            throw new Error(`You try to set the config "${path}" on the "${this.id}" SConfig instance but this config does not exists and this instance does not allow for new config creation...`);
        }
        adapters.forEach((adapter) => {
            if (adapter && !this._adapters[adapter]) {
                throw new Error(`You try to set the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`);
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
SConfig._registeredProxies = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcy1jb25maWcvc3JjL3NoYXJlZC9TQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV4RSxPQUFPLGdCQUFnQixNQUFNLDJCQUEyQixDQUFDO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLE9BQU87SUF5QzFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxZQUFZLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtRQTlEL0I7Ozs7Ozs7O1dBUUc7UUFDSCxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWI7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBZ0NiLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQ2IsZ0ZBQWdGLENBQ2pGLENBQUM7U0FDSDtRQUVELHlCQUF5QjtRQUN6QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUVmLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsU0FBUyxtQkFDWixRQUFRLEVBQUUsRUFBRSxFQUNaLGNBQWMsRUFBRSxJQUFJLEVBQ3BCLFNBQVMsRUFBRSxJQUFJLEVBQ2YsUUFB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