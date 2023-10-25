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
import { __isNode, __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepMerge, __filterObject, __get, __set, } from '@coffeekraken/sugar/object';
export default class SConfig {
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
        var _a, _b, _c;
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
                target: (_c = __SEnv.get('target')) !== null && _c !== void 0 ? _c : 'development',
                devsCut: __SEnv.get('devsCut'),
            },
            cache: true,
            updateTimeout: 500,
            loadTimeout: 5000,
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
            // wait until the adapter is ready
            yield this.adapter.readyPromise;
            const duration = new __SDuration();
            console.log('LOAD');
            const finalSettings = Object.assign({ isUpdate: false, clean: false }, (settings !== null && settings !== void 0 ? settings : {}));
            const loadTimeout = setTimeout(() => {
                throw new Error(`[SConfig.load] It seem's that your configuration take too long to load. Either do something about that or increase the SConfig "<yellow>loadTimeout</yellow>" setting...`);
            }, this.settings.loadTimeout);
            // get the config integrity from the adapter
            this.integrity = yield this.adapter.integrity();
            // check for cache first
            // if (this.settings.cache && !finalSettings.isUpdate) {
            //     const cachedConfigObj = await this.fromCache();
            //     if (cachedConfigObj?.integrity === this.integrity) {
            //         console.log(
            //             'FROM C',
            //             cachedConfigObj.integrity,
            //             this.integrity,
            //         );
            //         // clear the load timeout
            //         clearTimeout(loadTimeout);
            //         this.config = cachedConfigObj.config;
            //         return this.config;
            //     }
            // }
            // normal loading otherwise
            const loadedConfig = yield this.adapter.load({
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
            // cache for later
            yield this.cache();
            // filter the empty config
            if (finalSettings.clean) {
                this.config = __filterObject(this.config, (key, value) => {
                    if (__isPlainObject(value) && !Object.keys(value).length)
                        return false;
                    return true;
                });
            }
            // Serialize the config just to be sure all is ok
            try {
                JSON.stringify(this.config);
            }
            catch (e) {
                console.error(`[SConfig] Your configuration seems to be invalid... This is usually cause of one of these issue:

        - One of your configuration try to access another one that is not available in your current "api.env" which is
            - Platform: ${this.settings.env.platform}
            - Environment: ${this.settings.env.env}
        - One of your configuration does create a cyclic structure...

        Make sure to check these before anything else...
                    `);
                throw e;
            }
            // clear the load timeout
            clearTimeout(loadTimeout);
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
                const { __packageRootDir } = yield import('@coffeekraken/sugar/path');
                const folderPath = `${__packageRootDir()}/.local/cache/config`, filePath = `${folderPath}/${this.id}.${this.settings.env.env}.${this.settings.env.platform}.json`;
                if (!__fs.existsSync(folderPath) || !__fs.existsSync(filePath))
                    return resolve({});
                const jsonStr = __fs.readFileSync(filePath).toString();
                if (!jsonStr)
                    return resolve({});
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
                const { __packageRootDir } = yield import('@coffeekraken/sugar/path');
                // console.log('CACHE', this.integrity);
                const folderPath = `${__packageRootDir()}/.local/cache/config`;
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
        return JSON.parse(JSON.stringify(this.get('.')));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGdCQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkUsT0FBTyxFQUNILFdBQVcsRUFDWCxjQUFjLEVBQ2QsS0FBSyxFQUNMLEtBQUssR0FDUixNQUFNLDRCQUE0QixDQUFDO0FBMkVwQyxNQUFNLENBQUMsT0FBTyxPQUFPLE9BQU87SUF1RXhCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FDdEIsUUFBZ0IsRUFDaEIsU0FBaUIsRUFDakIsYUFBb0M7UUFFcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUM7WUFDdEMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsYUFBYSxDQUFDO0lBQ3JFLENBQUM7SUFpQkQsTUFBTSxDQUFDLGtCQUFrQixDQUNyQixRQUFnQixFQUNoQixTQUFpQixFQUNqQixZQUFrQztRQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQztZQUN2QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxZQUFZLENBQUM7SUFDckUsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILFlBQ0ksSUFBSSxFQUNKLE9BQXlC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