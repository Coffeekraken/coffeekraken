// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __get from '@coffeekraken/sugar/shared/object/get';
import __set from '@coffeekraken/sugar/shared/object/set';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __SConfigAdapter from './adapters/SConfigAdapter';
import __SEnv from '@coffeekraken/s-env';
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
     * - resolvers ([]) {ISConfigResolverObj[]}: Specify some resolvers function to handle special values like "[theme.something....]"
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
        this._settings = Object.assign({ adapters: [], defaultAdapter: null, allowSave: true, allowSet: true, allowReset: true, allowNew: false, autoLoad: true, autoSave: true, updateTimeout: 500, throwErrorOnUndefinedConfig: true, resolvers: [] }, settings);
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
        // register the default resolver "[config...]"
        this._settings.resolvers.unshift({
            match: /\[config.[a-zA-Z0-9.\-_]+\]/gm,
            resolve(match, config) {
                return __get(config, match.replace('[config.', '').replace(']', ''));
            }
        });
        Object.keys(this._adapters).forEach((adapterName) => {
            const adapterObj = this._adapters[adapterName];
            let timeout;
            if (!adapterObj.instance)
                return;
            if (!adapterObj.instance._settings.onUpdate) {
                adapterObj.instance._settings.onUpdate = () => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        // load the updated config
                        this.load(adapterName, true);
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
    static registerPrepare(configId, configKey, prepareFn) {
        if (!this._registeredPrepares[configId])
            this._registeredPrepares[configId] = {};
        this._registeredPrepares[configId][configKey] = prepareFn;
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
    load(adapter = this._settings.defaultAdapter, isUpdate = false) {
        // make sure we load only once the config
        // if (_SConfigLoadingByAdapter[adapter]) {
        //   return null;
        // }
        // _SConfigLoadingByAdapter[adapter] = true;
        if (!this._adapters[adapter]) {
            throw new Error(`You try to load the config from the adapter "${adapter}" but this adapter does not exists...`);
        }
        if (!isUpdate && Object.keys(this._adapters[adapter].config).length !== 0) {
            return this._adapters[adapter].config;
        }
        let config = this._adapters[adapter].instance.load(isUpdate);
        Object.keys(config).forEach(configName => {
            if (config[configName].extends && typeof config[configName].extends === 'string') {
                const extend = config[configName].extends;
                if (!config[extend]) {
                    throw new Error(`<red>[SConfig]</red> You have set an "<yellow>extends</yellow>" property to "<magenta>${extend}</magenta>" inside the "<cyan>${configName}</cyan>" config but this configuration you want to extends does not exists...`);
                }
                config[configName] = __deepMerge(Object.assign({}, config[extend]), config[configName]);
                delete config[configName].extends;
            }
        });
        this._settings.resolvers.forEach((resolverObj) => {
            config = this._resolveInternalReferences(config, config, resolverObj);
        });
        if (this.constructor._registeredPrepares[this.id]) {
            Object.keys(this.constructor._registeredPrepares[this.id]).forEach((configKey) => {
                config[configKey] = this.constructor._registeredPrepares[this.id][configKey](config[configKey], config);
            });
        }
        config = __deepMap(config, ({ value }) => {
            if (value === undefined) {
                return -1;
            }
            return value;
        });
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
    _resolveInternalReferences(originalValue, config, resolverObj, path = []) {
        const prop = path.slice(-1)[0];
        if (prop && prop.match(/.*@.*/) && originalValue) {
            const parts = prop.split('@');
            const env = parts[1];
            const p = parts[0];
            if (__SEnv.is(env)) {
                __set(config, `${path.slice(0, -1).join('.')}.${p}`, this._resolveInternalReferences(originalValue, config, resolverObj, path.slice(0, -1)));
                originalValue = undefined;
            }
        }
        else if (__isPlainObject(originalValue)) {
            const afterObj = {};
            let isAfter = false;
            Object.keys(originalValue).forEach((key) => {
                if (key === '...') {
                    isAfter = true;
                }
                else if (isAfter) {
                    afterObj[key] = originalValue[key];
                }
            });
            Object.keys(originalValue).forEach((key) => {
                if (key === '...') {
                    const val = originalValue['...'];
                    const res = this._resolveInternalReferences(val, config, resolverObj, [...path, key]);
                    if (res !== val) {
                        delete originalValue['...'];
                        originalValue = __deepMerge(originalValue, res);
                    }
                }
            });
            // apply after object
            originalValue = __deepMerge(originalValue, afterObj);
            // delete originalValue['...'];
            Object.keys(originalValue).forEach((key) => {
                try {
                    originalValue[key] = this._resolveInternalReferences(originalValue[key], config, resolverObj, [...path, key]);
                }
                catch (e) { }
            });
        }
        else if (Array.isArray(originalValue)) {
            originalValue = originalValue.map((v) => {
                return this._resolveInternalReferences(v, config, resolverObj, path);
            });
        }
        else if (typeof originalValue === 'string') {
            const matches = originalValue.match(resolverObj.match);
            if (matches && matches.length) {
                if (matches.length === 1 && originalValue === matches[0]) {
                    const resolvedValue = resolverObj.resolve(matches[0], config, path);
                    originalValue = this._resolveInternalReferences(resolvedValue, config, resolverObj, path);
                }
                else {
                    matches.forEach((match) => {
                        const resolvedValue = this._resolveInternalReferences(match, config, resolverObj, path);
                        originalValue = originalValue.replace(match, resolvedValue);
                    });
                    originalValue = this._resolveInternalReferences(originalValue, config, resolverObj, path);
                }
            }
        }
        // check proxy
        if (this.constructor._registeredProxies[this.id] &&
            this.constructor._registeredProxies[this.id][path[0]]) {
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
/**
 * @name        registerProxy
 * @type        Function
 * @static
 *
 * This method allows you to register a proxy function for some particular config.
 *
 * @param     {String}      configId        The configuration id you want to proxy
 * @param     {String}      scopePath       The dot path of the value you want to proxy
 * @param     {ISConfigProxyFn}     proxyFn       The proxy function that must return a value and that take as parameters the dot path, the original value of the targeted config and the config object
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SConfig._registeredProxies = {};
/**
 * @name        registerPrepare
 * @type        Function
 * @static
 *
 * This method allows you to register a prepare function that will be fired once the config is ready so you can make updates as needed
 *
 * @param     {String}      configId        The configuration id you want to proxy
 * @param     {String}      configKey       The root config key you want to prepare with that function. This has to be one of the root config property
 * @param     {ISConfigPrepareFn}     prepareFn         The prepare function that MUST return the new current config and that take as parameters the current config object and the whole config object
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SConfig._registeredPrepares = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3pELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sZ0JBQWdCLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFrRHpDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBTztJQW9GMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxZQUFZLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtRQTFHL0I7Ozs7Ozs7O1dBUUc7UUFDSCxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWI7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBNEViLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQ2IsZ0ZBQWdGLENBQ2pGLENBQUM7U0FDSDtRQUVELHlCQUF5QjtRQUN6QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUVmLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsU0FBUyxtQkFDWixRQUFRLEVBQUUsRUFBRSxFQUNaLGNBQWMsRUFBRSxJQUFJLEVBQ3BCLFNBQVMsRUFBRSxJQUFJLEVBQ2YsUUFBUSxFQUFFLElBQUksRUFDZCxVQUFVLEVBQUUsSUFBSSxF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