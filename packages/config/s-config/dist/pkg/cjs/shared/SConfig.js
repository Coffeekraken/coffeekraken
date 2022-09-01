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
const cyclic_1 = __importDefault(require("@coffeekraken/sugar/shared/is/cyclic"));
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
const decycle_1 = __importDefault(require("@coffeekraken/sugar/shared/object/decycle"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const filter_1 = __importDefault(require("@coffeekraken/sugar/shared/object/filter"));
const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
const set_1 = __importDefault(require("@coffeekraken/sugar/shared/object/set"));
const toPlainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/object/toPlainObject"));
class SConfig {
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
        this.settings = (0, deepMerge_1.default)({
            env: {
                env: (_a = s_env_1.default.get('env')) !== null && _a !== void 0 ? _a : 'development',
                platform: ((_b = s_env_1.default.get('platform')) !== null && _b !== void 0 ? _b : (0, node_1.default)())
                    ? 'node'
                    : 'browser',
                devsCut: s_env_1.default.get('devsCut'),
            },
            cache: true,
            updateTimeout: 500,
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
            const duration = new s_duration_1.default();
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
            else if ((0, plainObject_1.default)(this.config)) {
            }
            else if (this.config !== null && this.config !== undefined) {
                throw new Error(`SConfig: Your "load" method of the "${adapter}" adapter has to return either a plain object, or a Promise resolved with a plain object. The returned value is "${this.config}" which is of type "${typeof this.config}"...`);
            }
            // make sure we don't have any cyclic references inside our config
            const cyclic = (0, cyclic_1.default)(this.config);
            if (cyclic) {
                throw new Error(cyclic);
            }
            // cache for later
            // this.cache();
            // filter the empty config
            if (finalSettings.clean) {
                this.config = (0, filter_1.default)(this.config, (key, value) => {
                    if ((0, plainObject_1.default)(value) && !Object.keys(value).length)
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
            if ((0, node_1.default)()) {
                const __fs = yield Promise.resolve().then(() => __importStar(require('fs')));
                const __packageRoot = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/sugar/node/path/packageRoot')));
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
            if ((0, node_1.default)()) {
                const __fs = yield Promise.resolve().then(() => __importStar(require('fs')));
                const __packageRoot = yield Promise.resolve().then(() => __importStar(require('@coffeekraken/sugar/node/path/packageRoot')));
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
        settings = (0, deepMerge_1.default)(this.settings, settings);
        if (Object.keys(this.config).length === 0) {
            throw new Error(`<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async static method`);
        }
        let finalValue = (0, get_1.default)(this.config, path);
        if ((0, plainObject_1.default)(finalValue)) {
            // finalValue = JSON.parse(JSON.stringify(finalValue));
            finalValue = (0, toPlainObject_1.default)(finalValue);
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
        settings = (0, deepMerge_1.default)(this.settings, settings);
        if (Object.keys(this.config).length === 0) {
            throw new Error(`<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async static method`);
        }
        (0, set_1.default)(this.config, path, value);
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
        const decycledObj = Object.assign({}, (0, decycle_1.default)(this.get('.')));
        return JSON.parse(JSON.stringify(decycledObj));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsc0ZBQThEO0FBQzlELDBFQUFtRDtBQUNuRCxnRUFBeUM7QUFDekMsa0ZBQThEO0FBQzlELDhFQUEwRDtBQUMxRCw0RkFBd0U7QUFDeEUsd0ZBQWtFO0FBQ2xFLDRGQUFzRTtBQUN0RSxzRkFBZ0U7QUFDaEUsZ0ZBQTBEO0FBQzFELGdGQUEwRDtBQUMxRCxvR0FBOEU7QUFxRTlFLE1BQXFCLE9BQU87SUEwR3hCOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILFlBQ0ksSUFBSSxFQUNKLE9BQXlCLEVBQ3pCLFdBQTZCLEVBQUU7O1FBNUhuQzs7Ozs7Ozs7V0FRRztRQUNILFVBQUssR0FBRyxJQUFJLENBQUM7UUFhYjs7Ozs7Ozs7V0FRRztRQUNILGFBQVEsR0FBRyxFQUFFLENBQUM7UUFFZDs7Ozs7Ozs7V0FRRztRQUNILFdBQU0sR0FBUSxFQUFFLENBQUM7UUFFakI7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQVcsUUFBUSxDQUFDO1FBeUV6QixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUNYLGdGQUFnRixDQUNuRixDQUFDO1NBQ0w7UUFFRCx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFZixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUV2QixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ3ZCO1lBQ0ksR0FBRyxFQUFFO2dCQUNELEdBQUcsRUFBRSxNQUFBLGVBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG1DQUFJLGFBQWE7Z0JBQ3ZDLFFBQVEs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