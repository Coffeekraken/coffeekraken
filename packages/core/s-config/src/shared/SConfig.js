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
                        const value = __get(config, `${ext}.${match.replace('[extends.', '').replace(']', '')}`);
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
        // register the default resolver "[extends...]"
        this._settings.resolvers.unshift({
            match: /\[this.[a-zA-Z0-9.\-_]+\]/gm,
            resolve(string, matches, config, path) {
                return __memoize(() => {
                    for (let i = 0; i < matches.length; i++) {
                        const match = matches[i];
                        // console.log(`${path.slice(0, 1)[0]}.${match.replace('[this.', '').replace(']', '')}`);
                        const value = __get(config, `${path.slice(0, 1)[0]}.${match.replace('[this.', '').replace(']', '')}`);
                        if (value === undefined) {
                            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" "this" config value does not exiats...`);
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
    static registerPrepare(configId, configKey, prepareFn) {
        if (!this._registeredPrepares[configId])
            this._registeredPrepares[configId] = {};
        this._registeredPrepares[configId][configKey] = prepareFn;
    }
    static registerPreprocess(configId, configKey, preprocessFn) {
        if (!this._registeredPreprocesses[configId])
            this._registeredPreprocesses[configId] = {};
        this._registeredPreprocesses[configId][configKey] = preprocessFn;
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
                if (!loadedConfig[configId])
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
            function extendsConfigIfNeeded(configToExtends, configName) {
                if (configToExtends.extends && typeof configToExtends.extends === 'string') {
                    const extend = configToExtends.extends;
                    if (!config[extend]) {
                        throw new Error(`<red>[SConfig]</red> You have set an "<yellow>extends</yellow>" property to "<magenta>${extend}</magenta>" inside the "<cyan>${configName}</cyan>" config but this configuration you want to extends does not exists...`);
                    }
                    const extendsConfig = extendsConfigIfNeeded(Object.assign({}, config[extend]), configName);
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
            if (this.constructor._registeredPreprocesses[this.id]) {
                for (let k = 0; k < Object.keys(this.constructor._registeredPreprocesses[this.id]).length; k++) {
                    const configKey = Object.keys(this.constructor._registeredPreprocesses[this.id])[k];
                    config[configKey] = yield this.constructor._registeredPreprocesses[this.id][configKey](config[configKey], config);
                }
            }
            // handle the "extends" global property
            Object.keys(config).forEach((configName) => {
                config[configName] = extendsConfigIfNeeded(config[configName], configName);
            });
            // resolve environment properties like @dev
            config = this._resolveEnvironments(config);
            this._settings.resolvers.forEach((resolverObj) => {
                config = this._resolveInternalReferences(config, config, resolverObj);
            });
            let nestedRests = [];
            this._restPaths
                // .sort((first, second) => {
                //     if (first.split('.').length < second.split('.').length) return -1;
                // })
                .forEach((path) => {
                let obj = __get(config, path);
                let newObj = {};
                Object.keys(obj).forEach((key) => {
                    if (key === '...') {
                        // console.log('FF', obj['...']);
                        newObj = Object.assign(Object.assign({}, newObj), obj['...']);
                        delete obj['...'];
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
/**
 * @name        registerPreprocess
 * @type        Function
 * @static
 *
 * This method allows you to register a prepare function that will be fired once the config is ready so you can make updates as needed
 *
 * @param     {String}      configId        The configuration id you want to proxy
 * @param     {String}      configKey       The root config key you want to prepare with that function. This has to be one of the root config property
 * @param     {ISConfigPreprocessFn}     preprocessFn         The prepare function that MUST return the new current config and that take as parameters the current config object and the whole config object
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SConfig._registeredPreprocesses = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDLE9BQU8sS0FBSyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3pELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sZ0JBQWdCLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxTQUFTLE1BQU0sNkNBQTZDLENBQUM7QUFDcEUsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUEyRTFELE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBTztJQTBFeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxZQUFZLElBQUksRUFBRSxXQUE2QixFQUFFOztRQWhHakQ7Ozs7Ozs7O1dBUUc7UUFDSCxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWI7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBaWFmLGVBQVUsR0FBRyxFQUFFLENBQUM7UUEvVlosaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO1NBQ3JHO1FBRUQseUJBQXlCO1FBQ3pCLElB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