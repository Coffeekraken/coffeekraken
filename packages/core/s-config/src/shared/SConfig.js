// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDuration from '@coffeekraken/s-duration';
import __SEnv from '@coffeekraken/s-env';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __applyScope from '@coffeekraken/sugar/shared/object/applyScope';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __get from '@coffeekraken/sugar/shared/object/get';
import __set from '@coffeekraken/sugar/shared/object/set';
import __SConfigAdapter from './adapters/SConfigAdapter';
import __memoize from '@coffeekraken/sugar/shared/function/memoize';
import __isNode from '@coffeekraken/sugar/shared/is/node';
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
        var _a, _b;
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
        this._restPaths = [];
        // store the name
        if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
            throw new Error(`The name of an SConfig instance can contain only letters like [a-zA-Z0-9_-]...`);
        }
        // save the settings name
        this.id = name;
        // save the settings
        this._settings = __deepMerge({
            env: {
                env: (_a = __SEnv.get('env')) !== null && _a !== void 0 ? _a : 'dev',
                platform: ((_b = __SEnv.get('platform')) !== null && _b !== void 0 ? _b : __isNode()) ? 'node' : 'browser',
            },
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
            resolvers: [],
        }, settings);
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
                config: {},
            };
        });
        // set the default get adapter if it has not been specified in the settings
        if (!this._settings.defaultAdapter) {
            this._settings.defaultAdapter = Object.keys(this._adapters)[0];
        }
        // register the default resolver "[config...]"
        this._settings.resolvers.unshift({
            match: /\[config.[a-zA-Z0-9.\-_]+\]/gm,
            resolve(string, matches, config, path) {
                return __memoize(() => {
                    for (let i = 0; i < matches.length; i++) {
                        const match = matches[i];
                        const value = __get(config, match.replace('[config.', '').replace(']', ''));
                        if (value === undefined) {
                            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" config value does not exiats...`);
                        }
                        if (string === match)
                            return value;
                        string = string.replace(match, value);
                    }
                    return string;
                });
            },
        });
        // register the default resolver "[extends...]"
        this._settings.resolvers.unshift({
            match: /\[extends.[a-zA-Z0-9.\-_]+\]/gm,
            resolve(string, matches, config, path) {
                return __memoize(() => {
                    for (let i = 0; i < matches.length; i++) {
                        const match = matches[i];
                        const ext = __get(config, path.slice(0, 1)[0] + '.extends');
                        const value = __get(config, `${ext}.${matches[0].replace('[extends.', '').replace(']', '')}`);
                        if (value === undefined) {
                            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" extends config value does not exiats...`);
                        }
                        if (string === match)
                            return value;
                        string = string.replace(match, value);
                    }
                    return string;
                });
            },
        });
        // register the default resolver "[packageJson...]"
        // const packageJson = __packageJsonSync();
        // this._settings.resolvers.unshift({
        //   match: /\[packageJson.[a-zA-Z0-9.\-_]+\]/gm,
        //   resolve(match, config) {
        //     const value = __get(packageJson, match.replace('[packageJson.', '').replace(']', ''));
        //     if (value === undefined) {
        //       throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" package.json value does not exiats...`);
        //     }
        //     return value;
        //   }
        // });
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
        return __awaiter(this, void 0, void 0, function* () {
            const duration = new __SDuration();
            if (!this._adapters[adapter]) {
                throw new Error(`You try to load the config from the adapter "${adapter}" but this adapter does not exists...`);
            }
            if (!isUpdate && Object.keys(this._adapters[adapter].config).length !== 0) {
                return this._adapters[adapter].config;
            }
            let config = {};
            const loadedConfig = yield this._adapters[adapter].instance.load(isUpdate, this._settings.env, config);
            Object.keys(loadedConfig).forEach((configId) => {
                if (!Object.keys(loadedConfig[configId]).length)
                    return;
                config[configId] = loadedConfig[configId];
            });
            // filter depending on platform
            Object.keys(config).forEach((configId) => {
                var _a;
                const configObj = config[configId];
                if (((_a = configObj.metas) === null || _a === void 0 ? void 0 : _a.platform) && configObj.metas.platform.indexOf(__SEnv.get('platform')) === -1) {
                    delete config[configId];
                }
            });
            function extendsConfigIfNeeded(configToExtends) {
                if (configToExtends.extends && typeof configToExtends.extends === 'string') {
                    const extend = configToExtends.extends;
                    if (!config[extend]) {
                        throw new Error(`<red>[SConfig]</red> You have set an "<yellow>extends</yellow>" property to "<magenta>${extend}</magenta>" inside the "<cyan>${configName}</cyan>" config but this configuration you want to extends does not exists...`);
                    }
                    const extendsConfig = extendsConfigIfNeeded(Object.assign({}, config[extend]));
                    // delete configToExtends.extends;
                    const newExtendedConfig = __deepMerge(extendsConfig, configToExtends);
                    // delete newExtendedConfig.extends;
                    return newExtendedConfig;
                }
                else {
                    return configToExtends;
                }
            }
            // make a simple [] correspondance check
            __deepMap(config, ({ prop, value, path }) => {
                if (typeof value === 'string' && value.split('[').length !== value.split(']').length) {
                    throw new Error(`<red>[${this.constructor.name}]</red> We think that you've made a mistake in your config file at path "<yellow>${path}</yellow>" with the value "<cyan>${value}</cyan>"`);
                }
            });
            // handle the "extends" global property
            Object.keys(config).forEach((configName) => {
                config[configName] = extendsConfigIfNeeded(config[configName]);
            });
            // resolve environment properties like @dev
            config = this._resolveEnvironments(config);
            this._settings.resolvers.forEach((resolverObj) => {
                config = this._resolveInternalReferences(config, config, resolverObj);
            });
            this._restPaths.forEach((path) => {
                let obj = __get(config, path);
                let newObj = {};
                Object.keys(obj).forEach((key) => {
                    if (key === '...') {
                        newObj = Object.assign(Object.assign({}, newObj), obj['...']);
                    }
                    else {
                        newObj[key] = obj[key];
                    }
                });
                __set(config, path, newObj);
            });
            if (this.constructor._registeredPrepares[this.id]) {
                for (let k = 0; k < Object.keys(this.constructor._registeredPrepares[this.id]).length; k++) {
                    const configKey = Object.keys(this.constructor._registeredPrepares[this.id])[k];
                    config[configKey] = yield this.constructor._registeredPrepares[this.id][configKey](config[configKey], config);
                }
            }
            if (config instanceof Promise) {
                throw new Error('Promise based SConfig is not already implemented...');
            }
            else if (__isPlainObject(config)) {
                this._adapters[adapter].config = config;
                this._adapters[adapter].config.$ = {
                    hash: __md5.encrypt(config),
                    loadedAt: Date.now(),
                };
                return config;
            }
            else if (config !== null && config !== undefined) {
                throw new Error(`SConfig: Your "load" method of the "${adapter}" adapter has to return either a plain object, or a Promise resolved with a plain object. The returned value is "${config}" which is of type "${typeof config}"...`);
            }
        });
    }
    _resolveEnvironments(config) {
        return __applyScope(config, __SEnv.get('env') === 'production' ? ['prod', 'production'] : ['dev', 'development']);
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
        if (path.indexOf('...') !== -1) {
            const p = path.slice(0, path.indexOf('...'));
            if (this._restPaths.indexOf(p.join('.')) === -1) {
                this._restPaths.push(p.join('.'));
            }
        }
        if (__isPlainObject(originalValue)) {
            Object.keys(originalValue).forEach((key) => {
                originalValue[key] = this._resolveInternalReferences(originalValue[key], config, resolverObj, [
                    ...path,
                    key,
                ]);
            });
        }
        else if (Array.isArray(originalValue)) {
            originalValue = new Proxy(originalValue, {
                get: (target, name) => {
                    var _a;
                    if (name === '_processed')
                        return target._processed;
                    if (name instanceof Symbol)
                        return target[name];
                    if (!target._processed) {
                        Object.defineProperty(target, '_processed', {
                            enumerable: false,
                            value: {},
                        });
                    }
                    if (((_a = target._processed) === null || _a === void 0 ? void 0 : _a[name]) !== undefined) {
                        return target._processed[name];
                    }
                    const res = this._resolveInternalReferences(target[name], config, resolverObj, path);
                    target[name] = res;
                    target._processed[name] = res;
                    return target[name];
                },
            });
            // originalValue = originalValue.map((v) => {
            //   return this._resolveInternalReferences(v, config, resolverObj, path);
            // });
        }
        else if (typeof originalValue === 'string') {
            const matches = originalValue.match(resolverObj.match);
            if (matches && matches.length) {
                const resolvedValue = resolverObj.resolve(originalValue, matches, config, path);
                if (typeof resolvedValue === 'function') {
                    const target = __get(config, path.slice(0, -1).join('.'));
                    if (Array.isArray(target)) {
                    }
                    else {
                        Object.defineProperty(target, path.slice(-1)[0], {
                            get: resolvedValue,
                            set(value) { },
                        });
                    }
                    originalValue = __get(config, path.join('.'));
                }
                else {
                    originalValue = this._resolveInternalReferences(resolvedValue, config, resolverObj, path);
                }
            }
        }
        // check proxy
        if (this.constructor._registeredProxies[this.id] && this.constructor._registeredProxies[this.id][path[0]]) {
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
            throw new Error(`<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async instance function`);
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
            __get(this._adapters[this._settings.defaultAdapter].config, path) === undefined) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDLE9BQU8sS0FBSyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3pELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sZ0JBQWdCLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxTQUFTLE1BQU0sNkNBQTZDLENBQUM7QUFDcEUsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFzRTFELE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBTztJQTBFeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxZQUFZLElBQUksRUFBRSxXQUE2QixFQUFFOztRQWhHakQ7Ozs7Ozs7O1dBUUc7UUFDSCxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWI7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBcVhmLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFuVFosaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO1NBQ3JHO1FBRUQseUJBQXlCO1FBQ3pCLElB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