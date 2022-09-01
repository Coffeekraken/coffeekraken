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
import __SConfigAdapter from '@coffeekraken/s-config-adapter';
import __SDuration from '@coffeekraken/s-duration';
import __SEnv from '@coffeekraken/s-env';
import __isCyclic from '@coffeekraken/sugar/shared/is/cyclic';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __decycle from '@coffeekraken/sugar/shared/object/decycle';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __filter from '@coffeekraken/sugar/shared/object/filter';
import __get from '@coffeekraken/sugar/shared/object/get';
import __set from '@coffeekraken/sugar/shared/object/set';
import __toPlainObject from '@coffeekraken/sugar/shared/object/toPlainObject';
export default class SConfig {
    /**
     * @name                  constructor
     * @type                  Function
     *
     * Init the config instance by passing a name and a settings object to configure your instance
     *
     * @param                 {String}                   name                  The name of the config
     * @param                   {SConfigAdapter}        adapter                 An SConfigAdapter instance to use
     * @param                {Object}                    [settings={}]
     * An object to configure your SConfig instance. See the list above
     * The available settings are:
     * - throwErrorOnUndefinedConfig (true) {Boolean}: Specify if you want the class to throw some errors when get undefined configs
     * - resolvers ([]) {ISConfigResolverObj[]}: Specify some resolvers function to handle special values like "[theme.something....]"
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(name, adapter, settings = {}) {
        var _a, _b;
        /**
         * @name              _name
         * @type              {String}
         * @private
         *
         * The name of the config
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._name = null;
        /**
         * @name             settings
         * @type              {Object}
         * @private
         *
         * Store the actual settings object
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.settings = {};
        /**
         * @name             config
         * @type            Object
         *
         * Store the loaded config obect
         *
         * @since   2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.config = {};
        /**
         * @name             integrity
         * @type            Object
         *
         * Store the config integrity
         *
         * @since   2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.integrity = 'unkown';
        // store the name
        if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
            throw new Error(`The name of an SConfig instance can contain only letters like [a-zA-Z0-9_-]...`);
        }
        // save the settings name
        this.id = name;
        this.adapter = adapter;
        // save the settings
        this.settings = __deepMerge({
            env: {
                env: (_a = __SEnv.get('env')) !== null && _a !== void 0 ? _a : 'development',
                platform: ((_b = __SEnv.get('platform')) !== null && _b !== void 0 ? _b : __isNode())
                    ? 'node'
                    : 'browser',
                devsCut: __SEnv.get('devsCut'),
            },
            cache: true,
            updateTimeout: 500,
            throwErrorOnUndefinedConfig: true,
        }, settings);
        if (!this.adapter instanceof __SConfigAdapter) {
            throw new Error(`You have to pass a valid SConfigAdapter instance to use with this SConfig instance`);
        }
        let timeout;
        if (!this.adapter.settings.onUpdate) {
            this.adapter.settings.onUpdate = () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    // load the updated config
                    this.load({
                        isUpdate: true,
                    });
                }, this.settings.updateTimeout);
            };
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
     * @param           {String}            [adapter=this.settings.defaultAdapter]         The adapter to use to load the config
     * @return          {Promise}                                                           A promise that will be resolved with the loaded config
     *
     * @example           js
     * const config = await config.load();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    load(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const duration = new __SDuration();
            const finalSettings = Object.assign({ isUpdate: false, clean: false }, (settings !== null && settings !== void 0 ? settings : {}));
            // get the config integrity from the adapter
            this.integrity = yield this.adapter.integrity();
            // check for cache first
            // if (this.settings.cache && !finalSettings.isUpdate) {
            //     const cachedConfigObj = await this.fromCache();
            //     if (cachedConfigObj?.integrity === this.integrity) {
            //         this.config = cachedConfigObj.config;
            //         return this.config;
            //     }
            // }
            // normal loading otherwise
            const loadedConfig = yield this.adapter.load({
                clearCache: finalSettings.isUpdate,
                env: this.settings.env,
                config: this.config,
            });
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
            if (this.constructor._registeredPreprocesses[this.id]) {
                for (let k = 0; k <
                    Object.keys(this.constructor._registeredPreprocesses[this.id])
                        .length; k++) {
                    const configKey = Object.keys(this.constructor._registeredPreprocesses[this.id])[k];
                    this.config[configKey] =
                        yield this.constructor._registeredPreprocesses[this.id][configKey]({
                            env: this.settings.env,
                            config: this.config,
                            get this() {
                                return this.config[configKey];
                            },
                            get theme() {
                                const themeId = `${this.config.theme.theme}-${this.config.theme.variant}`;
                                return this.config.theme.themes[themeId];
                            },
                        });
                }
            }
            if (this.constructor._registeredPostprocess[this.id]) {
                for (let k = 0; k <
                    Object.keys(this.constructor._registeredPostprocess[this.id])
                        .length; k++) {
                    const configKey = Object.keys(this.constructor._registeredPostprocess[this.id])[k];
                    this.config[configKey] =
                        yield this.constructor._registeredPostprocess[this.id][configKey]({
                            env: this.settings.env,
                            config: this.config,
                            get this() {
                                return this.config[configKey];
                            },
                            get theme() {
                                const themeId = `${this.config.theme.theme}-${this.config.theme.variant}`;
                                return this.config.theme.themes[themeId];
                            },
                        });
                }
            }
            if (this.config instanceof Promise) {
                throw new Error('Promise based SConfig is not already implemented...');
            }
            else if (__isPlainObject(this.config)) {
            }
            else if (this.config !== null && this.config !== undefined) {
                throw new Error(`SConfig: Your "load" method of the "${adapter}" adapter has to return either a plain object, or a Promise resolved with a plain object. The returned value is "${this.config}" which is of type "${typeof this.config}"...`);
            }
            // make sure we don't have any cyclic references inside our config
            const cyclic = __isCyclic(this.config);
            if (cyclic) {
                throw new Error(cyclic);
            }
            // cache for later
            // this.cache();
            // filter the empty config
            if (finalSettings.clean) {
                this.config = __filter(this.config, (key, value) => {
                    if (__isPlainObject(value) && !Object.keys(value).length)
                        return false;
                    return true;
                });
            }
            // return the config
            return this.config;
        });
    }
    /**
     * @name                          fromCache
     * @type                          Function
     *
     * Get the config from cache if possible. Otherwise it will resolve to undefined
     *
     * @return          {Promise}                                                             A promise resolved once the caching process has been done
     *
     * @example           js
     * await config.fromCache();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    fromCache() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // different caching method for node or browser
            if (__isNode()) {
                const __fs = yield import('fs');
                const __packageRoot = yield import('@coffeekraken/sugar/node/path/packageRoot');
                const folderPath = `${__packageRoot.default()}/.local/cache/config`;
                if (!__fs.existsSync(folderPath))
                    return resolve();
                const jsonStr = __fs
                    .readFileSync(`${folderPath}/${this.id}.${this.settings.env.env}.${this.settings.env.platform}.json`)
                    .toString();
                if (!jsonStr)
                    return resolve();
                resolve(JSON.parse(jsonStr));
            }
            else {
                // @TODO            implement browser cache
                throw new Error('Cache is not implemented in the browser for now...');
            }
        }));
    }
    /**
     * @name                          cache
     * @type                          Function
     *
     * Save the config in the cache to load it faster next time
     *
     * @return          {Promise}                                                             A promise resolved once the caching process has been done
     *
     * @example           js
     * await config.cache();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    cache() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            // different caching method for node or browser
            if (__isNode()) {
                const __fs = yield import('fs');
                const __packageRoot = yield import('@coffeekraken/sugar/node/path/packageRoot');
                const folderPath = `${__packageRoot.default()}/.local/cache/config`;
                __fs.mkdirSync(folderPath, { recursive: true });
                __fs.writeFileSync(`${folderPath}/${this.id}.${this.settings.env.env}.${this.settings.env.platform}.json`, JSON.stringify({
                    integrity: (_d = (_a = this.integrity) !== null && _a !== void 0 ? _a : (_c = (_b = this.adapter).integrity) === null || _c === void 0 ? void 0 : _c.call(_b)) !== null && _d !== void 0 ? _d : 'unknown',
                    config: this.toJson(),
                }, null, 4));
                resolve(`${folderPath}/${this.id}.${this.settings.env.env}.${this.settings.env.platform}.json`);
            }
            else {
            }
        }));
    }
    /**
     * @name                                get
     * @type                                Function
     *
     * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
     *
     * @param                 {String}                     path                 The dotted object path for the value wanted
     * @param                 {Object}                      [settings={}]         The same object settings that you can pass in the constructor but just for this get process
     * @return                {Mixed}                                            The value getted
     *
     * @example               js
     * await config.get('log.frontend.mail.host'); // => gmail.google.com
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get(path, settings = {}) {
        settings = __deepMerge(this.settings, settings);
        if (Object.keys(this.config).length === 0) {
            throw new Error(`<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async static method`);
        }
        let finalValue = __get(this.config, path);
        if (__isPlainObject(finalValue)) {
            // finalValue = JSON.parse(JSON.stringify(finalValue));
            finalValue = __toPlainObject(finalValue);
            // finalValue = __derefSync(finalValue);
        }
        if (settings.throwErrorOnUndefinedConfig && finalValue === undefined) {
            throw new Error(`You try to get the config "${path}" on the "${this.id}" SConfig instance but this config does not exists...`);
        }
        return finalValue;
    }
    /**
     * @name                                set
     * @type                                Function
     *
     * Set a config depending on the dotted object path passed and the value to set
     *
     * @param                 {String}                     path                 The dotted object path for the value wanted
     * @param               {Any}                       value          The value to set
     * @param                 {Object}                      [settings={}]         The same object settings that you can pass in the constructor but just for this get process
     * @return                {Mixed}                                            The value setted
     *
     * @example               js
     * await config.get('log.frontend.mail.host'); // => gmail.google.com
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    set(path, value, settings = {}) {
        settings = __deepMerge(this.settings, settings);
        if (Object.keys(this.config).length === 0) {
            throw new Error(`<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async static method`);
        }
        __set(this.config, path, value);
        return value;
    }
    /**
     * @name                                toObject
     * @type                    Function
     *
     * This method allows you to get the config in a simple object format
     *
     * @return      {Any}               The configuration in object format
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toObject() {
        return this.get('.');
    }
    /**
     * @name                                toJson
     * @type                    Function
     *
     * This method allows you to get the config in a simple json object format
     *
     * @return      {Any}               The configuration in object format
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toJson() {
        const decycledObj = Object.assign({}, __decycle(this.get('.')));
        return JSON.parse(JSON.stringify(decycledObj));
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SConfig._registeredPreprocesses = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGdCQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sZUFBZSxNQUFNLGlEQUFpRCxDQUFDO0FBcUU5RSxNQUFNLENBQUMsT0FBTyxPQUFPLE9BQU87SUEwR3hCOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILFlBQ0ksSUFBSSxFQUNKLE9BQXlCLEVBQ3pCLFdBQTZCLEVBQUU7O1FBNUhuQzs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBRyxJQUFJLENBQUM7UUFhYjs7Ozs7Ozs7V0FRRztRQUNILGFBQVEsR0FBRyxFQUFFLENBQUM7UUFFZDs7Ozs7Ozs7V0FRRztRQUNILFdBQU0sR0FBUSxFQUFFLENBQUM7UUFFakI7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQVcsUUFBUSxDQUFDO1FBeUV6QixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUNYLGdGQUFnRixDQUNuRixDQUFDO1NBQ0w7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