"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_config_adapter_1 = __importDefault(require("@coffeekraken/s-config-adapter"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
class SConfig {
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
        this.settings = (0, object_1.__deepMerge)({
            env: {
                env: (_a = s_env_1.default.get('env')) !== null && _a !== void 0 ? _a : 'development',
                platform: ((_b = s_env_1.default.get('platform')) !== null && _b !== void 0 ? _b : (0, is_1.__isNode)())
                    ? 'node'
                    : 'browser',
                target: (_c = s_env_1.default.get('target')) !== null && _c !== void 0 ? _c : 'development',
                devsCut: s_env_1.default.get('devsCut'),
            },
            cache: true,
            updateTimeout: 500,
            loadTimeout: 5000,
            throwErrorOnUndefinedConfig: true,
        }, settings);
        if (!this.adapter instanceof s_config_adapter_1.default) {
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
            const duration = new s_duration_1.default();
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
                    configObj.metas.platform.indexOf(s_env_1.default.get('platform')) === -1) {
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
            else if ((0, is_1.__isPlainObject)(this.config)) {
            }
            else if (this.config !== null && this.config !== undefined) {
                throw new Error(`SConfig: Your "load" method of the "${adapter}" adapter has to return either a plain object, or a Promise resolved with a plain object. The returned value is "${this.config}" which is of type "${typeof this.config}"...`);
            }
            // cache for later
            this.cache();
            // filter the empty config
            if (finalSettings.clean) {
                this.config = (0, object_1.__filterObject)(this.config, (key, value) => {
                    if ((0, is_1.__isPlainObject)(value) && !Object.keys(value).length)
                        return false;
                    return true;
                });
            }
            // Serialize the config just to be sure all is ok
            try {
                //     // make sure we don't have any cyclic references inside our config
                // const cyclic = __isCyclic(this.config);
                // if (cyclic) {
                //     throw new Error(cyclic);
                // }
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
            if ((0, is_1.__isNode)()) {
                const __fs = yield Promise.resolve().then(() => __importStar(require('fs')));
                const { __packageRootDir } = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/sugar/path')));
                const folderPath = `${__packageRootDir()}/.local/cache/config`;
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
            if ((0, is_1.__isNode)()) {
                const __fs = yield Promise.resolve().then(() => __importStar(require('fs')));
                const { __packageRootDir } = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/sugar/path')));
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
        settings = (0, object_1.__deepMerge)(this.settings, settings);
        if (Object.keys(this.config).length === 0) {
            throw new Error(`<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async static method`);
        }
        let finalValue = (0, object_1.__get)(this.config, path);
        if ((0, is_1.__isPlainObject)(finalValue)) {
            // finalValue = JSON.parse(JSON.stringify(finalValue));
            // finalValue = __toPlainObject(finalValue);
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
        settings = (0, object_1.__deepMerge)(this.settings, settings);
        if (Object.keys(this.config).length === 0) {
            throw new Error(`<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async static method`);
        }
        (0, object_1.__set)(this.config, path, value);
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
exports.default = SConfig;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsc0ZBQThEO0FBQzlELDBFQUFtRDtBQUNuRCxnRUFBeUM7QUFDekMsK0NBQW1FO0FBQ25FLHVEQUtvQztBQTJFcEMsTUFBcUIsT0FBTztJQXVFeEIsTUFBTSxDQUFDLG1CQUFtQixDQUN0QixRQUFnQixFQUNoQixTQUFpQixFQUNqQixhQUFvQztRQUVwQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQztZQUN0QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxhQUFhLENBQUM7SUFDckUsQ0FBQztJQWlCRCxNQUFNLENBQUMsa0JBQWtCLENBQ3JCLFFBQWdCLEVBQ2hCLFNBQWlCLEVBQ2pCLFlBQWtDO1FBRWxDLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFlBQVksQ0FBQztJQUNyRSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsWUFDSSxJQUFJLEVBQ0osT0FBeUIsRUFDekIsV0FBNkIsRUFBRTs7UUE1SG5DOzs7Ozs7OztXQVFHO1FBQ0gsVUFBSyxHQUFHLElBQUksQ0FBQztRQWFiOzs7Ozs7OztXQVFHO1FBQ0gsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVkOzs7Ozs7OztXQVFHO1FBQ0gsV0FBTSxHQUFRLEVBQUUsQ0FBQztR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