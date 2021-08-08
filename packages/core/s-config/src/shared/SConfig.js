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
import __packageJson from '@coffeekraken/sugar/node/package/json';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __applyScope from '@coffeekraken/sugar/shared/object/applyScope';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __get from '@coffeekraken/sugar/shared/object/get';
import __set from '@coffeekraken/sugar/shared/object/set';
import __SConfigAdapter from './adapters/SConfigAdapter';
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
                const value = __get(config, match.replace('[config.', '').replace(']', ''));
                if (value === undefined) {
                    throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" config value does not exiats...`);
                }
                return value;
            }
        });
        // register the default resolver "[extends...]"
        this._settings.resolvers.unshift({
            match: /\[extends.[a-zA-Z0-9.\-_]+\]/gm,
            resolve(match, config, path) {
                const ext = __get(config, path.slice(0, 1)[0] + '.extends');
                const res = __get(config, `${ext}.${match.replace('[extends.', '').replace(']', '')}`);
                if (res === undefined) {
                    throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" extends config value does not exiats...`);
                }
                return res;
            }
        });
        // register the default resolver "[packageJson...]"
        const packageJson = __packageJson();
        this._settings.resolvers.unshift({
            match: /\[packageJson.[a-zA-Z0-9.\-_]+\]/gm,
            resolve(match, config) {
                const value = __get(packageJson, match.replace('[packageJson.', '').replace(']', ''));
                if (value === undefined) {
                    throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" package.json value does not exiats...`);
                }
                return value;
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
        return __awaiter(this, void 0, void 0, function* () {
            console.log('start load');
            const duration = new __SDuration();
            if (!this._adapters[adapter]) {
                throw new Error(`You try to load the config from the adapter "${adapter}" but this adapter does not exists...`);
            }
            if (!isUpdate && Object.keys(this._adapters[adapter].config).length !== 0) {
                return this._adapters[adapter].config;
            }
            let config = yield this._adapters[adapter].instance.load(isUpdate);
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
            Object.keys(config).forEach(configName => {
                config[configName] = extendsConfigIfNeeded(config[configName]);
            });
            // resolve environment properties like @dev
            config = this._resolveEnvironments(config);
            this._settings.resolvers.forEach((resolverObj) => {
                config = this._resolveInternalReferences(config, config, resolverObj);
            });
            let count = 0;
            // const remap = [];
            // __deepMap(config, ({path, value}) => {
            //   count++;
            //   if (path.includes('...')) {
            //     const parts = path.split('.....');
            //     if (parts.length !== 2) return value;
            //     // console.log(parts);
            //     remap.push({
            //       src: parts[0],
            //       prop: parts[1].split('.')[0]
            //     });
            //   }
            // });
            // remap.forEach(remapObj => {
            //   const obj = __get(config, remapObj.src);
            //   obj[remapObj.prop] = obj['...'][remapObj.prop];
            // });
            let called = 1;
            function restProps(obj, level = 1, path = []) {
                if (!__isPlainObject(obj))
                    return {};
                if (!obj)
                    return {};
                called++;
                let newObj = {};
                Object.keys(obj).forEach(key => {
                    let newValue = obj[key];
                    if (__isPlainObject(newValue)) {
                        const newPath = path.join('.').split('.');
                        newPath.push(key);
                        newValue = restProps(newValue, level + 1, newPath);
                    }
                    if (key === '...') {
                        newObj = Object.assign(Object.assign({}, newObj), newValue);
                        // const order = Object.keys(obj);
                        // const newObj = Object.assign({}, obj);
                        // order.forEach(keyName => {
                        //   delete obj[keyName];
                        // });
                        // order.forEach(keyName => {
                        //   if (keyName === '...') {
                        //     Object.keys(newObj[keyName]).forEach(kn => {
                        //       obj[kn] = newObj[keyName][kn];
                        //     });
                        //   } else {
                        //     obj[keyName] = newObj[keyName];
                        //   }
                        // });
                    }
                    else {
                        newObj[key] = newValue;
                    }
                });
                return newObj;
            }
            // const flatten = __flatten(config);
            // // console.log(Object.keys(flatten));
            // Object.keys(flatten).forEach(key => {
            //   if (key.includes('...')) {
            //     const value = flatten[key].$ref;
            //     console.log(key, flatten[key], typeof value);
            //   }
            // })
            config = restProps(Object.assign({}, config));
            if (this.constructor._registeredPrepares[this.id]) {
                for (let k = 0; k < Object.keys(this.constructor._registeredPrepares[this.id]).length; k++) {
                    const configKey = Object.keys(this.constructor._registeredPrepares[this.id])[k];
                    config[configKey] = yield this.constructor._registeredPrepares[this.id][configKey](config[configKey], config);
                }
            }
            console.log('end load');
            console.log(duration.end().formatedDuration);
            if (config instanceof Promise) {
                throw new Error('Promise based SConfig is not already implemented...');
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
        if (__isPlainObject(originalValue)) {
            Object.keys(originalValue).forEach((key) => {
                originalValue[key] = this._resolveInternalReferences(originalValue[key], config, resolverObj, [...path, key]);
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
                    if (typeof resolvedValue === 'function') {
                        // console.log(path.slice(0,-1).join('.'), path.slice(-1)[0]);
                        Object.defineProperty(__get(config, path.slice(0, -1).join('.')), path.slice(-1)[0], {
                            get: resolvedValue,
                            set(value) { }
                        });
                        originalValue = __get(config, path.join('.'));
                        // console.log('SETTER', originalValue, path);
                        // originalValue = resolvedValue;
                        // return originalValue;
                    }
                    else {
                        originalValue = this._resolveInternalReferences(resolvedValue, config, resolverObj, path);
                    }
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
            throw new Error(`<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async instance function`);
        }
        // console.log('get', path, this._adapters[adapter].config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sYUFBYSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2xFLE9BQU8sS0FBSyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3pELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sZ0JBQWdCLE1BQU0sMkJBQTJCLENBQUM7QUFrRHpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBTztJQW9GMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxZQUFZLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtRQTFHL0I7Ozs7Ozs7O1dBUUc7UUFDSCxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWI7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBNEViLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQ2IsZ0ZBQWdGLENBQ2pGLENBQUM7U0FDSDtRQUVELHlCQUF5QjtRQUN6QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUVmLG9CQUFvQjtRQUNwQixJQUFJLENBQUMs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