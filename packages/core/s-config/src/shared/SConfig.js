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
                platform: ((_b = __SEnv.get('platform')) !== null && _b !== void 0 ? _b : __isNode())
                    ? 'node'
                    : 'browser',
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
        function resolveConfig(string, matches, config, path) {
            return () => {
                for (let i = 0; i < matches.length; i++) {
                    const match = matches[i];
                    const value = __get(config, match.replace('[config.', '').replace(']', ''));
                    if (value === undefined) {
                        throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" config value does not exiats...`);
                    }
                    if (string === match)
                        return value;
                    // if (match.includes('storage.src.rootDir')) {
                    //     console.log('MA', match, value);
                    // }
                    string = string.replace(match, value);
                }
                // @todo        find a way to avoid this redondant part
                if (string.includes('[config.')) {
                    const mtchs = string.match(/\[config.[a-zA-Z0-9.\-_]+\]/gm);
                    mtchs.forEach((mt) => {
                        const p = mt
                            .replace(/^\[config\./, '')
                            .replace(/\]$/, '');
                        string = string.replace(mt, __get(config, p));
                    });
                }
                return string;
            };
        }
        // register the default resolver "[config...]"
        this._settings.resolvers.unshift({
            match: /\[config.[a-zA-Z0-9.\-_]+\]/gm,
            resolve: resolveConfig,
        });
        // register the default resolver "[extends...]"
        this._settings.resolvers.unshift({
            match: /\[extends.[a-zA-Z0-9.\-_]+\]/gm,
            resolve(string, matches, config, path) {
                return () => {
                    for (let i = 0; i < matches.length; i++) {
                        const match = matches[i];
                        const ext = __get(config, path.slice(0, 1)[0] + '.extends');
                        const value = __get(config, `${ext}.${match
                            .replace('[extends.', '')
                            .replace(']', '')}`);
                        if (value === undefined) {
                            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" extends config value does not exiats...`);
                        }
                        if (string === match)
                            return value;
                        string = string.replace(match, value);
                    }
                    return string;
                };
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
                        const value = __get(config, `${path.slice(0, 1)[0]}.${match
                            .replace('[this.', '')
                            .replace(']', '')}`);
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
    static registerPostprocess(configId, configKey, postprocessFn) {
        if (!this._registeredPostprocess[configId])
            this._registeredPostprocess[configId] = {};
        this._registeredPostprocess[configId][configKey] = postprocessFn;
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
            if (!isUpdate &&
                Object.keys(this._adapters[adapter].config).length !== 0) {
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
                if (((_a = configObj.metas) === null || _a === void 0 ? void 0 : _a.platform) &&
                    configObj.metas.platform.indexOf(__SEnv.get('platform')) === -1) {
                    delete config[configId];
                }
            });
            function extendsConfigIfNeeded(configToExtends, configName) {
                if (configToExtends.extends &&
                    typeof configToExtends.extends === 'string') {
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
                if (typeof value === 'string' &&
                    value.split('[').length !== value.split(']').length) {
                    throw new Error(`<red>[${this.constructor.name}]</red> We think that you've made a mistake in your config file at path "<yellow>${path}</yellow>" with the value "<cyan>${value}</cyan>"`);
                }
            });
            if (this.constructor._registeredPreprocesses[this.id]) {
                for (let k = 0; k <
                    Object.keys(this.constructor._registeredPreprocesses[this.id])
                        .length; k++) {
                    const configKey = Object.keys(this.constructor._registeredPreprocesses[this.id])[k];
                    config[configKey] =
                        yield this.constructor._registeredPreprocesses[this.id][configKey](config[configKey], config);
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
            if (this.constructor._registeredPostprocess[this.id]) {
                for (let k = 0; k <
                    Object.keys(this.constructor._registeredPostprocess[this.id])
                        .length; k++) {
                    const configKey = Object.keys(this.constructor._registeredPostprocess[this.id])[k];
                    config[configKey] =
                        yield this.constructor._registeredPostprocess[this.id][configKey](config[configKey], config);
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
        return __applyScope(config, __SEnv.get('env') === 'production'
            ? ['prod', 'production']
            : ['dev', 'development']);
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
                originalValue[key] = this._resolveInternalReferences(originalValue[key], config, resolverObj, [...path, key]);
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
                // if (path.indexOf('fontsDir') !== -1)
                //     console.log(path, matches, resolvedValue);
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
        if (settings.throwErrorOnUndefinedConfig &&
            originalValue === undefined) {
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
 * @name        registerPostprocess
 * @type        Function
 * @static
 *
 * This method allows you to register a postprocess function that will be fired once the config is ready so you can make updates as needed
 *
 * @param     {String}      configId        The configuration id you want to proxy
 * @param     {String}      configKey       The root config key you want to prepare with that function. This has to be one of the root config property
 * @param     {ISConfigPostprocessFn}     postprocessFn         The post process function that MUST return the new current config and that take as parameters the current config object and the whole config object
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SConfig._registeredPostprocess = {};
/**
 * @name        registerPreprocess
 * @type        Function
 * @static
 *
 * This method allows you to register a preprocess function that will be fired once the config is ready so you can make updates as needed
 *
 * @param     {String}      configId        The configuration id you want to proxy
 * @param     {String}      configKey       The root config key you want to preprocess with that function. This has to be one of the root config property
 * @param     {ISConfigPreprocessFn}     preprocessFn         The preprocess function that MUST return the new current config and that take as parameters the current config object and the whole config object
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SConfig._registeredPreprocesses = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDLE9BQU8sS0FBSyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3pELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sZ0JBQWdCLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxTQUFTLE1BQU0sNkNBQTZDLENBQUM7QUFDcEUsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUEyRTFELE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBTztJQW9GeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxZQUFZLElBQUksRUFBRSxXQUE2QixFQUFFOztRQTFHakQ7Ozs7Ozs7O1dBUUc7UUFDSCxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWI7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBb2dCZixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBeGJaLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQ1gsZ0ZBQWdGLENBQ25GLENBQUM7U0FDTDtRQUVELHlCQUF5QjtRQUN6QixJ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