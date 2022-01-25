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
import __isNode from '@coffeekraken/sugar/shared/is/node';
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
        /**
         * @name             config
         * @type            Object
         *
         * Store the loaded config obect
         *
         * @since   2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this.config = {};
        this._restPaths = {};
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
            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];
                const value = __get(config, this.resolveDotPath(match, config, path));
                if (value === undefined) {
                    throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" config value does not exiats...`);
                }
                if (string === match)
                    return value;
                string = string.replace(match, value);
            }
            return string;
        }
        // register the default resolver "[config...]"
        this._settings.resolvers.unshift({
            match: /\[config.[a-zA-Z0-9.\-_]+\]/gm,
            resolveDotPath(match, config, path) {
                if (!match.match(/^\[config\./))
                    return;
                const dotPath = match.replace('[config.', '').replace(']', '');
                return dotPath;
            },
            resolve: resolveConfig,
        });
        // register the default resolver "[extends...]"
        this._settings.resolvers.unshift({
            name: 'extends',
            match: /\[extends.[a-zA-Z0-9\.\-_]+\]/gm,
            resolveDotPath(match, config, path) {
                const ext = __get(config, path[0] + '._extends');
                if (!ext)
                    return;
                const dotPath = `${ext}.${match
                    .replace('[extends.', '')
                    .replace(']', '')}`;
                return dotPath;
            },
            resolve(string, matches, config, path) {
                for (let i = 0; i < matches.length; i++) {
                    const match = matches[i];
                    const dotPath = this.resolveDotPath(match, config, path);
                    let value = __get(config, dotPath);
                    if (value === undefined) {
                        throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" extends config value does not exiats...`);
                    }
                    if (string === match) {
                        return value;
                    }
                    string = string.replace(match, value);
                }
                return string;
            },
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
            const loadedConfig = yield this._adapters[adapter].instance.load(isUpdate, this._settings.env, this.config);
            Object.keys(loadedConfig).forEach((configId) => {
                if (!loadedConfig[configId])
                    return;
                this.config[configId] = loadedConfig[configId];
            });
            // filter depending on platform
            Object.keys(this.config).forEach((configId) => {
                var _a;
                const configObj = this.config[configId];
                if (((_a = configObj.metas) === null || _a === void 0 ? void 0 : _a.platform) &&
                    configObj.metas.platform.indexOf(__SEnv.get('platform')) === -1) {
                    delete this.config[configId];
                }
            });
            const extendsConfigIfNeeded = (configToExtends, configName) => {
                if (configToExtends.extends &&
                    typeof configToExtends.extends === 'string') {
                    const extend = configToExtends.extends;
                    if (!this.config[extend]) {
                        throw new Error(`<red>[SConfig]</red> You have set an "<yellow>extends</yellow>" property to "<magenta>${extend}</magenta>" inside the "<cyan>${configName}</cyan>" config but this configuration you want to extends does not exists...`);
                    }
                    const extendsConfig = extendsConfigIfNeeded(Object.assign({}, this.config[extend]), extend);
                    const newExtendedConfig = __deepMerge(extendsConfig, configToExtends);
                    Object.defineProperty(newExtendedConfig, '_extends', {
                        enumerable: false,
                        value: newExtendedConfig.extends,
                    });
                    delete newExtendedConfig.extends;
                    return newExtendedConfig;
                }
                else {
                    return configToExtends;
                }
            };
            // console.log(
            //     'AAA',
            //     this.config.theme.themes['default-dark']?.color?.main,
            //     this.config.theme.themes,
            // );
            // make a simple [] correspondance check
            __deepMap(this.config, ({ prop, value, path }) => {
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
                    this.config[configKey] =
                        yield this.constructor._registeredPreprocesses[this.id][configKey](this._settings.env, this.config[configKey], this.config);
                }
            }
            // console.log('AA', this.config.theme.themes);
            // handle the "extends" global property
            Object.keys(this.config).forEach((configName) => {
                this.config[configName] = extendsConfigIfNeeded(this.config[configName], configName);
            });
            // console.log('A', this.config.theme.themes['default-dark']?.color?.main);
            // resolve environment properties like @dev
            this._resolveEnvironments();
            // console.log(
            //     'BBB',
            //     this.config.theme.themes['default-dark']?.color?.main,
            //     this.config.theme.themes,
            // );
            this._settings.resolvers.forEach((resolverObj) => {
                // console.log(resolverObj.match);
                this._resolveInternalReferences(resolverObj);
            });
            // this._resolveInternalReferences();
            // console.log(
            //     'BB',
            //     this.config.theme.themes['default-dark']?.color?.main,
            // );
            // console.log(__get(this.config, 'theme.themes'), 'DD');
            // console.log(this._restPaths);
            // console.log(this._restPaths);
            Object.keys(this._restPaths).forEach((dotPath) => {
                const actualConfig = __get(this.config, dotPath), extendsConfig = __get(this.config, this._restPaths[dotPath]);
                __set(this.config, dotPath, __deepMerge(Object.assign({}, extendsConfig), Object.assign({}, actualConfig)));
            });
            // this._restPaths
            //     // .sort((first, second) => {
            //     //     if (first.split('.').length < second.split('.').length) return -1;
            //     // })
            //     .forEach((path) => {
            //         let obj = __get(this.config, path);
            //         let newObj = {};
            //         Object.keys(obj).forEach((key) => {
            //             if (key === '...') {
            //                 // console.log('FF', obj['...']);
            //                 const value = obj['...'];
            //                 if (!__isPlainObject(value)) {
            //                     newObj['...'] = value;
            //                     return;
            //                 }
            //                 newObj = {
            //                     ...newObj,
            //                     ...obj['...'],
            //                 };
            //                 delete obj['...'];
            //             } else {
            //                 newObj[key] = obj[key];
            //             }
            //         });
            //         __set(this.config, path, newObj);
            //     });
            // console.log(this.config.themeLightBase.colorSchemas);
            // console.log(this.config.themeDefaultLight.color.main);
            // console.log(__flatten(this.config));
            if (this.constructor._registeredPostprocess[this.id]) {
                for (let k = 0; k <
                    Object.keys(this.constructor._registeredPostprocess[this.id])
                        .length; k++) {
                    const configKey = Object.keys(this.constructor._registeredPostprocess[this.id])[k];
                    this.config[configKey] =
                        yield this.constructor._registeredPostprocess[this.id][configKey](this._settings.env, this.config[configKey], this.config);
                }
            }
            if (this.config instanceof Promise) {
                throw new Error('Promise based SConfig is not already implemented...');
            }
            else if (__isPlainObject(this.config)) {
                this._adapters[adapter].config = this.config;
                this._adapters[adapter].config.$ = {
                    hash: __md5.encrypt(this.config),
                    loadedAt: Date.now(),
                };
                return this.config;
            }
            else if (this.config !== null && this.config !== undefined) {
                throw new Error(`SConfig: Your "load" method of the "${adapter}" adapter has to return either a plain object, or a Promise resolved with a plain object. The returned value is "${this.config}" which is of type "${typeof this.config}"...`);
            }
        });
    }
    _resolveEnvironments() {
        __applyScope(this.config, __SEnv.get('env') === 'production'
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
    _resolveInternalReferences(resolverObj, path = [], iteration = 0) {
        let originalValue = __get(this.config, path.join('.'));
        iteration++;
        if (path.includes('...')) {
            const p = path.slice(0, path.indexOf('...'));
            const parentObj = __get(this.config, p.join('.'));
            for (let i = 0; i < this._settings.resolvers.length; i++) {
                const resolver = this._settings.resolvers[i];
                if (!resolver.resolveDotPath)
                    continue;
                const dotPath = resolver.resolveDotPath(parentObj['...'], this.config, path);
                if (dotPath) {
                    if (!this._restPaths[p.join('.')]) {
                        this._restPaths[p.join('.')] = dotPath;
                    }
                    break;
                }
            }
            return;
            // console.log(path);
        }
        if (__isPlainObject(originalValue)) {
            // if (originalValue['...']) {
            //     originalValue._extend = originalValue['...'];
            //     delete originalValue['...'];
            //     this._resolveInternalReferences(
            //         resolverObj,
            //         [...path, '_extend'],
            //         iteration,
            //     );
            //     if (path.includes('complementary')) {
            //         console.log(originalValue);
            //     }
            //     Object.keys(originalValue._extend).forEach((key) => {
            //         if (__isPlainObject(originalValue._extend)) {
            //             console.log('efef', key);
            //         }
            //     });
            //     // originalValue = __deepMerge(
            //     //     originalValue._extends,
            //     //     originalValue,
            //     // );
            // }
            Object.keys(originalValue).forEach((key) => {
                this._resolveInternalReferences(resolverObj, [...path, key], iteration);
            });
        }
        else if (Array.isArray(originalValue)) {
            originalValue.forEach((v, i) => {
                this._resolveInternalReferences(resolverObj, [...path, i], iteration);
            });
        }
        else if (typeof originalValue === 'string') {
            const matches = originalValue.match(resolverObj.match);
            if (matches && matches.length) {
                let resolvedValue = resolverObj.resolve(originalValue, matches, this.config, path);
                if (resolvedValue !== originalValue) {
                    let parentObj = __get(this.config, path.slice(0, -1).join('.'));
                    if (path.slice(-1)[0] === '...') {
                        __deepMap(Object.assign({}, resolvedValue), ({ object, prop, value, path: localPath }) => {
                            const fullPath = `${path
                                .slice(0, -1)
                                .join('.')}.${localPath}`;
                            __set(this.config, fullPath, value);
                        });
                        delete parentObj['...'];
                    }
                    else {
                        __set(this.config, path.join('.'), resolvedValue);
                        this._resolveInternalReferences(resolverObj, path, iteration);
                    }
                }
            }
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sS0FBSyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3pELE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sZ0JBQWdCLE1BQU0sMkJBQTJCLENBQUM7QUEyRXpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBTztJQStGeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxZQUFZLElBQUksRUFBRSxXQUE2QixFQUFFOztRQXJIakQ7Ozs7Ozs7O1dBUUc7UUFDSCxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWI7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQVEsRUFBRSxDQUFDO1FBc2dCakIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQTFiWixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUNYLGdGQUFnRixDQUNuRixDQUFDO1NBQ0w7UUFFRCx5QkFB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