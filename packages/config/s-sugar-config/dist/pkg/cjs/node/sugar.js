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
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_config_1 = __importDefault(require("@coffeekraken/s-config"));
const s_config_folder_adapter_1 = __importDefault(require("@coffeekraken/s-config-folder-adapter"));
const s_docblock_1 = __importDefault(require("@coffeekraken/s-docblock"));
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const objectHash_1 = __importDefault(require("@coffeekraken/sugar/shared/object/objectHash"));
const replaceTokens_1 = __importDefault(require("@coffeekraken/sugar/shared/token/replaceTokens"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class SSugarConfig extends s_class_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super((0, deepMerge_1.default)({}, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name            registerFolder
     * @namespace       shared
     * @type            Function
     * @static
     *
     * This function allows you to register some folders to be taken in consideration
     * when accessing the config using the ```sugar``` function
     *
     * @param       {String}        folderPath          The folder path in which to check for .config.js files
     *
     * @example         js
     * import registerFolder from '@coffeekraken/sugar/shared/config/registerFolder';
     * registerFolder('/something/cool');
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerFolder(path, scope = 'default', packageName) {
        // handle tokens
        path = (0, replaceTokens_1.default)(path);
        this._registeredConfigFolderPaths.push({
            path,
            scope,
            packageName,
        });
        // protect against readding none existing folders
        if (!fs_1.default.existsSync(path))
            return;
        // adding folders
        this._registeredConfigFilesPaths = [
            ...this._registeredConfigFilesPaths,
            ...fs_1.default
                .readdirSync(path)
                .filter((p) => p.match(/\.config\.js$/))
                .map((p) => {
                return `${path}/${p}`;
            }),
        ];
    }
    /**
     * @name            filesRealPaths
     * @type            String[]
     * @static
     * @get
     *
     * Access the config files real paths
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get filesRealPaths() {
        return this._registeredConfigFilesPaths
            .filter((f) => {
            return fs_1.default.existsSync(f);
        })
            .map((f) => fs_1.default.realpathSync(f));
    }
    /**
     * @name            filesPaths
     * @type            String[]
     * @static
     * @get
     *
     * Access the config files paths
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get filesPaths() {
        return this._registeredConfigFilesPaths;
    }
    /**
     * @name            foldersRealPaths
     * @type            String[]
     * @static
     * @get
     *
     * Access the config registered folders real pathes
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get foldersRealPaths() {
        return this._registeredConfigFolderPaths
            .filter((f) => {
            return fs_1.default.existsSync(f.path);
        })
            .map((f) => fs_1.default.realpathSync(f.path));
    }
    /**
     * @name            foldersPaths
     * @type            String[]
     * @static
     * @get
     *
     * Access the config folders pathes
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get foldersPaths() {
        return this._registeredConfigFolderPaths.map((f) => f.path);
    }
    static load(settings) {
        const finalSettings = (0, deepMerge_1.default)({
            id: 'default',
            env: process.env.NODE_ENV,
            platform: 'node',
            cache: true,
            clean: false,
        }, settings !== null && settings !== void 0 ? settings : {});
        // singleton promise
        if (SSugarConfig._loadPromises[finalSettings.id]) {
            return SSugarConfig._loadPromises[finalSettings.id];
        }
        SSugarConfig._loadPromises[finalSettings.id] = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (SSugarConfig._sSugarConfigInstances[finalSettings.id]) {
                return resolve({
                    id: finalSettings.id,
                    config: SSugarConfig._sSugarConfigInstances[finalSettings.id].get('.'),
                    instance: SSugarConfig._sSugarConfigInstances[finalSettings.id],
                });
            }
            SSugarConfig._sSugarConfigInstances[finalSettings.id] =
                new SSugarConfig({
                    metas: {
                        id: finalSettings.id,
                    },
                    sugarConfig: finalSettings !== null && finalSettings !== void 0 ? finalSettings : {},
                });
            const config = yield SSugarConfig._sSugarConfigInstances[finalSettings.id]._load(finalSettings);
            resolve({
                id: finalSettings.id,
                config,
                instance: SSugarConfig._sSugarConfigInstances[finalSettings.id],
            });
        }));
        return SSugarConfig._loadPromises[finalSettings.id];
    }
    /**
     * @name            toJson
     * @type            Function
     * @async
     *
     * This static method allows you to get the config as a json object to store it easily
     *
     * @param           {ISConfigEnvObj}        [env={}]        Some environment settings you want to load. By default it takes the environment on which the script is loaded
     * @param           {String}            [id=null]           A special id for your loaded configuration like "browser", "somethingElse", etc... If not provided, this will be generated depending on the passed ```env``` object
     * @return          {Any}                A json object representing the config
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static toJson(settings) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const config = yield SSugarConfig.load(settings);
            resolve(config.instance.toJson());
        }));
    }
    /**
     * @name            toObject
     * @type            Function
     * @async
     *
     * This static method allows you to get the config as an object to store it easily
     *
     * @param           {ISConfigEnvObj}        [env={}]        Some environment settings you want to load. By default it takes the environment on which the script is loaded
     * @param           {String}            [id=null]           A special id for your loaded configuration like "browser", "somethingElse", etc... If not provided, this will be generated depending on the passed ```env``` object
     * @return          {Any}                A json object representing the config
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static toObject(settings) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const config = yield SSugarConfig.load(settings);
            resolve(config.instance.toObject());
        }));
    }
    /**
     * @name            isLoaded
     * @type            Function
     *
     * This static method allows you to test if the default or a particular configuration
     * is loaded or not
     *
     * @param       {String}        [id="default"]      The configuration id you want to get the config from
     * @return      {Boolean}                           true if is loaded, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isLoaded(id = 'default') {
        if (!this._sSugarConfigInstances[id])
            return false;
        return true;
    }
    /**
     * @name            toDocblocks
     * @type            Function
     * @static
     * @async
     *
     * This function take a config id as parameter and returns an array of docblocks parsed objects
     *
     * @param       {String}        configIdOrPath            The configuration id or path you want to get docblocks back for
     * @return      {ISugarConfigToDocblocksResult[]}                         An array containing ISugarConfigToDocblocksResult objects
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static toDocblocks(configIdOrPath) {
        return __awaiter(this, void 0, void 0, function* () {
            // get the file path(s) for this config id
            configIdOrPath = configIdOrPath.replace('.config.js', '');
            const paths = this.filesPaths.filter((path) => {
                return path.includes(`${configIdOrPath}.config.js`);
            });
            const results = [];
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i];
                const docblock = new s_docblock_1.default(path);
                yield docblock.parse();
                results.push({
                    path,
                    docblocks: docblock.toObject(),
                });
            }
            return results;
        });
    }
    /**
     * @name            hash
     * @type            String
     * @static
     *
     * This hash accessor gives you access to the actual configuration hash.
     * You can specify a dot path to get the hash of a sub configuration
     *
     * @param           {String}            [dotPath='']            The dot path of the config you want to hash
     * @return          {String}                                    The generated hash for this config
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static hash(dotPath = '') {
        const config = this.get(dotPath);
        return (0, objectHash_1.default)(config);
    }
    /**
     * @name            get
     * @type            Function
     *
     * This static method allows you to access a configuration
     * by passing a dotpath like "something.cool" and (optional) a configuration "id"
     * that is assigned to your configuration by passing it through the static ```load``` method
     * or assigned automatically depending on the ```env``` parameter passed to the static ```load``` method.
     *
     * @param       {String}        dotpath         The dotpath that specify the configuration you want to get
     * @param       {String}        [id="default"]      The configuration id you want to get the config from
     * @return      {any}                           The getted configuration
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get(dotPath, id = 'default') {
        if (!this._sSugarConfigInstances[id]) {
            throw new Error(`<red>[${this.name}]</red> You MUST load the configuration before accessing them by calling the SSugarConfig.load() async static method`);
        }
        // get the config
        return this._sSugarConfigInstances[id].get(dotPath, {
            throwErrorOnUndefinedConfig: true,
        });
    }
    /**
     * @name            getSafe
     * @type            Function
     *
     * Same as the "get" method but does not throw error if the config is not accessible...
     *
     * @param       {String}        dotpath         The dotpath that specify the configuration you want to get
     * @param       {String}        [id="default"]      The configuration id you want to get the config from
     * @return      {any}                           The getted configuration
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getSafe(dotPath, id = 'default') {
        if (!this._sSugarConfigInstances[id]) {
            return;
        }
        // get the config
        return this._sSugarConfigInstances[id].get(dotPath, {
            throwErrorOnUndefinedConfig: false,
        });
    }
    /**
     * @name            set
     * @type            Function
     *
     * This static method allows you to set  a configuration
     * by passing a dotpath like "something.cool" and (optional) a configuration "id"
     *
     * @param       {String}        dotpath         The dotpath that specify the configuration you want to get
     * @param       {Any}           value       The configuration value you want to set
     * @param       {String}        [id="default"]      The configuration id you want to get the config from
     * @return      {any}                           The setted configuration
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static set(dotPath, value, id = 'default') {
        if (!this._sSugarConfigInstances[id]) {
            throw new Error(`<red>[${this.name}]</red> You MUST load the configuration before accessing them by calling the SSugarConfig.load() async static method`);
        }
        // get the config
        return this._sSugarConfigInstances[id].set(dotPath, value);
    }
    static _searchConfigFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const sugarJson = new s_sugar_json_1.default();
            if (!this._rootSugarJson) {
                const rootSugarJsonPath = `${(0, packageRoot_1.default)()}/sugar.json`;
                if (fs_1.default.existsSync(rootSugarJsonPath)) {
                    const json = yield Promise.resolve().then(() => __importStar(require(rootSugarJsonPath)));
                    this._rootSugarJson = sugarJson.sanitizeJson(json.default);
                    if (this._rootSugarJson.extends &&
                        !Array.isArray(this._rootSugarJson.extends))
                        this._rootSugarJson.extends = [this._rootSugarJson.extends];
                }
            }
            if (!this._sugarJson) {
                this._sugarJson = yield sugarJson.read();
                Object.keys(this._sugarJson).forEach((packageName) => {
                    // @ts-ignore
                    const jsonObj = this._sugarJson[packageName];
                    if (jsonObj.config && jsonObj.config.folders) {
                        jsonObj.config.folders.forEach((folderObj) => {
                            this.registerFolder(path_1.default.resolve(jsonObj.metas.folderPath, folderObj.path), folderObj.scope, packageName);
                        });
                    }
                });
            }
        });
    }
    /**
     * @name            hash
     * @type            String
     *
     * This hash function gives you access to the actual configuration hash.
     * You can specify a dot path to get the hash of a sub configuration
     *
     * @param           {String}            [dotPath='']            The dot path of the config you want to hash
     * @return          {String}                                    The generated hash for this config
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    hash(dotPath = '') {
        const config = this.get(dotPath);
        return (0, objectHash_1.default)(config);
    }
    /**
     * @name            get
     * @type            Function
     *
     * This method allows you to get a configuration back by passing a dotpath like "something.else"
     *
     * @param       {String}        dotpath         The dotpath that specify the config you want to get back
     * @return      {any}                           The getted configuration
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get(dotpath, settings) {
        return this._configInstance.get(dotpath, settings);
    }
    /**
     * @name            set
     * @type            Function
     *
     * This method allows you to set a configuration back by passing a dotpath like "something.else"
     *
     * @param       {String}        dotpath         The dotpath that specify the config you want to get back
     * @param       {any}           value           The value you want to set
     * @return      {any}                           The getted configuration
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    set(dotpath, value) {
        return this._configInstance.set(dotpath, value);
    }
    /**
     * @name            toDocblocks
     * @type            Function
     * @async
     *
     * This function take a config id as parameter and returns an array of docblocks parsed objects
     *
     * @param       {String}        configId            The configuration if you want to get docblocks back for
     * @return      {Any[]}                         An array of docblocks objects
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toDocblocks(configId) {
        return this.constructor.toDocblocks(configId);
    }
    /**
     * @name            toJson
     * @type            Function
     * @async
     *
     * This function returns you the configuration as a json object
     *
     * @return      {Any[]}                         An array of docblocks objects
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toJson() {
        return this._configInstance.toJson();
    }
    /**
     * @name            toObject
     * @type            Function
     * @async
     *
     * This function returns you the configuration as an object
     *
     * @return      {Any[]}                         An array of docblocks objects
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toObject() {
        return this._configInstance.toObject();
    }
    /**
     * @name                          cache
     * @type                          Function
     * @async
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
        return this._configInstance.cache();
    }
    /**
     * @name            load
     * @type            Function
     * @async
     *
     * This method is responsible to load the config depending on the passed ```sugarConfig.env``` setting
     *
     * @return          {Promise<any>}          Return a promise resolved once the configuration has been loaded
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _load(settings) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this._configInstance)
                return this._configInstance.get('.');
            if (!this.constructor._rootSugarJson || !this.constructor._sugarJson) {
                yield this.constructor._searchConfigFiles();
            }
            const configFolderAdapter = new s_config_folder_adapter_1.default({
                name: 'sugar',
                folderName: '.sugar',
                fileName: '%name.config.js',
                scopes: {
                    default: [
                        path_1.default.resolve((0, dirname_1.default)(), '../config'),
                        // @ts-ignore
                        ...this.constructor._registeredConfigFolderPaths
                            .filter((obj) => obj.scope === 'default')
                            .map((obj) => obj.path),
                    ],
                    module: [
                        // @ts-ignore
                        ...this.constructor._registeredConfigFolderPaths
                            .filter((obj) => {
                            if (obj.scope === 'module')
                                return true;
                            return false;
                        })
                            .map((obj) => obj.path),
                    ],
                    repo: [
                        `${(0, packageRoot_1.default)(process.cwd(), {
                            highest: true,
                        })}/%folderName`,
                        // @ts-ignore
                        ...this.constructor._registeredConfigFolderPaths
                            .filter((obj) => obj.scope === 'repo')
                            .map((obj) => obj.path),
                    ],
                    package: [
                        `${(0, packageRoot_1.default)(process.cwd())}/%folderName`,
                        // @ts-ignore
                        ...this.constructor._registeredConfigFolderPaths
                            .filter((obj) => obj.scope === 'package')
                            .map((obj) => obj.path),
                    ],
                    user: [
                        `${(0, packageRoot_1.default)(process.cwd())}/.local/%folderName`,
                        // @ts-ignore
                        ...this.constructor._registeredConfigFolderPaths
                            .filter((obj) => obj.scope === 'user')
                            .map((obj) => obj.path),
                    ],
                },
            });
            this._configInstance = new s_config_1.default('sugar', configFolderAdapter, {
                env: {
                    env: settings.env,
                    platform: settings.platform,
                },
                cache: (_a = settings.cache) !== null && _a !== void 0 ? _a : true,
                // resolvers: [
                //     {
                //         match: /\[theme.[a-zA-Z0-9.\-_:]+\]/gm,
                //         resolve(string, matches, config, path) {
                //             for (let i = 0; i < matches.length; i++) {
                //                 const match = matches[i];
                //                 const valuePath = match
                //                     .replace('[theme.', '')
                //                     .replace(']', '');
                //                 const value = __get(
                //                     config,
                //                     `theme.themes.${config.theme.theme}-${config.theme.variant}.${valuePath}`,
                //                 );
                //                 if (string === match) return value;
                //                 string = string.replace(match, value);
                //             }
                //             return string;
                //         },
                //     },
                // ],
            });
            const res = yield this._configInstance.load({
                clean: settings.clean,
            });
            return res;
        });
    }
}
exports.default = SSugarConfig;
SSugarConfig._sSugarConfigInstances = {};
SSugarConfig._sugarJson = undefined;
SSugarConfig._rootSugarJson = undefined;
SSugarConfig._registeredConfigFolderPaths = [];
SSugarConfig._registeredConfigFilesPaths = [];
/**
 * @name            load
 * @type            Function
 * @static
 *
 * This static method allows you to ask the SSugarConfig class to load (if needed) some configs
 * depending on the passed ```env: ISConfigEnvObj``` object and returns you an ISSugarConfigLoadedObj
 * with the loaded configuration, the SSugarConfig instance and the SSugarConfig id assigned to your particular env
 * configs.
 *
 * @param           {ISConfigEnvObj}        [env={}]        Some environment settings you want to load. By default it takes the environment on which the script is loaded
 * @param           {String}            [id=null]           A special id for your loaded configuration like "browser", "somethingElse", etc... If not provided, this will be generated depending on the passed ```env``` object
 * @return          {ISSugarConfigLoadedObj}                An object containing your configuration, the SSugarConfig instance used behind and the assigned id
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SSugarConfig._loadPromises = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsb0VBQTZDO0FBRTdDLHNFQUFtRTtBQUNuRSxvR0FBMkU7QUFDM0UsMEVBQW1EO0FBQ25ELDhFQUFzRDtBQUN0RCxrRkFBNEQ7QUFDNUQsNEZBQXNFO0FBQ3RFLDRGQUFzRTtBQUN0RSw4RkFBd0U7QUFDeEUsbUdBQTZFO0FBQzdFLDRDQUFzQjtBQUN0QixnREFBMEI7QUFpRDFCLE1BQXFCLFlBQWEsU0FBUSxpQkFBUTtJQXliOUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF5QztRQUNqRCxLQUFLLENBQUMsSUFBQSxtQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUE5YkQ7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FDakIsSUFBWSxFQUNaLFFBQTZELFNBQVMsRUFDdEUsV0FBb0I7UUFFcEIsZ0JBQWdCO1FBQ2hCLElBQUksR0FBRyxJQUFBLHVCQUFlLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQztZQUNuQyxJQUFJO1lBQ0osS0FBSztZQUNMLFdBQVc7U0FDZCxDQUFDLENBQUM7UUFFSCxpREFBaUQ7UUFDakQsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTztRQUNuQyxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLDJCQUEyQixHQUFHO1lBQy9CLEdBQUcsSUFBSSxDQUFDLDJCQUEyQjtZQUNuQyxHQUFHLFlBQUk7aUJBQ0YsV0FBVyxDQUFDLElBQUksQ0FBQztpQkFDakIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUN2QyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDUCxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzFCLENBQUMsQ0FBQztTQUNULENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sS0FBSyxjQUFjO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLDJCQUEyQjthQUNsQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNWLE9BQU8sWUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUM7YUFDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFlBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxLQUFLLGdCQUFnQjtRQUN2QixPQUFPLElBQUksQ0FBQyw0QkFBNEI7YUFDbkMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDVixPQUFPLFlBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsWUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sS0FBSyxZQUFZO1FBQ25CLE9BQU8sSUFBSSxDQUFDLDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFvQkQsTUFBTSxDQUFDLElBQUksQ0FDUCxRQUF5QztRQUV6QyxNQUFNLGFBQWEsR0FBMEIsSUFBQSxtQkFBVyxFQUNwRDtZQUNJLEVBQUUsRUFBRSxTQUFTO1lBQ2IsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUTtZQUN6QixRQUFRLEVBQUUsTUFBTTtZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLEtBQUssRUFBRSxLQUFLO1NBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7UUFFRixvQkFBb0I7UUFDcEIsSUFBSSxZQUFZLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM5QyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsWUFBWSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQ3RELENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RCLElBQUksWUFBWSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDdkQsT0FBTyxPQUFPLENBQUM7b0JBQ1gsRUFBRSxFQUFFLGFBQWEsQ0FBQyxFQUFFO29CQUNwQixNQUFNLEVBQUUsWUFBWSxDQUFDLHNCQUFzQixDQUN2QyxhQUFhLENBQUMsRUFBRSxDQUNuQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7b0JBQ1YsUUFBUSxFQUNKLFlBQVksQ0FBQyxzQkFBc0IsQ0FDL0IsYUFBYSxDQUFDLEVBQUUsQ0FDbkI7aUJBQ1IsQ0FBQyxDQUFDO2FBQ047WUFFRCxZQUFZLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztnQkFDakQsSUFBSSxZQUFZLENBQUM7b0JBQ2IsS0FBSyxFQUFFO3dCQUNILEVBQUUsRUFBRSxhQUFhLENBQUMsRUFBRTtxQkFDdkI7b0JBQ0QsV0FBVyxFQUFFLGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLEVBQUU7aUJBQ25DLENBQUMsQ0FBQztZQUNQLE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLHNCQUFzQixDQUNwRCxhQUFhLENBQUMsRUFBRSxDQUNuQixDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2QixPQUFPLENBQUM7Z0JBQ0osRUFBRSxFQUFFLGFBQWEsQ0FBQyxFQUFFO2dCQUNwQixNQUFNO2dCQUNOLFFBQVEsRUFDSixZQUFZLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQzthQUM1RCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUEsQ0FDSixDQUFDO1FBRUYsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBeUM7UUFDbkQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRCxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBeUM7UUFDckQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRCxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsU0FBUztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ25ELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFPLFdBQVcsQ0FBQyxjQUFzQjs7WUFDM0MsMENBQTBDO1lBQzFDLGNBQWMsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMxRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMxQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxjQUFjLFlBQVksQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ1QsSUFBSTtvQkFDSixTQUFTLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtpQkFDakMsQ0FBQyxDQUFDO2FBQ047WUFFRCxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO0tBQUE7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFrQixFQUFFO1FBQzVCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsT0FBTyxJQUFBLG9CQUFZLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUUsR0FBRyxTQUFTO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FDWCxTQUFTLElBQUksQ0FBQyxJQUFJLHNIQUFzSCxDQUMzSSxDQUFDO1NBQ0w7UUFFRCxpQkFBaUI7UUFDakIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNoRCwyQkFBMkIsRUFBRSxJQUFJO1NBQ3BDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQWUsRUFBRSxFQUFFLEdBQUcsU0FBUztRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLE9BQU87U0FDVjtRQUVELGlCQUFpQjtRQUNqQixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2hELDJCQUEyQixFQUFFLEtBQUs7U0FDckMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFlLEVBQUUsS0FBVSxFQUFFLEVBQUUsR0FBRyxTQUFTO1FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FDWCxTQUFTLElBQUksQ0FBQyxJQUFJLHNIQUFzSCxDQUMzSSxDQUFDO1NBQ0w7UUFFRCxpQkFBaUI7UUFDakIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsTUFBTSxDQUFPLGtCQUFrQjs7WUFDM0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxzQkFBWSxFQUFFLENBQUM7WUFFckMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3RCLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxJQUFBLHFCQUFhLEdBQUUsYUFBYSxDQUFDO2dCQUMxRCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsRUFBRTtvQkFDcEMsTUFBTSxJQUFJLEdBQUcsd0RBQWEsaUJBQWlCLEdBRXpDLENBQUM7b0JBRUgsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDM0QsSUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU87d0JBQzNCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQzt3QkFFM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNuRTthQUNKO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRXpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO29CQUNqRCxhQUFhO29CQUNiLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzdDLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTt3QkFDMUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7NEJBQ3pDLElBQUksQ0FBQyxjQUFjLENBQ2YsY0FBTSxDQUFDLE9BQU8sQ0FDVixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFDeEIsU0FBUyxDQUFDLElBQUksQ0FDakIsRUFDRCxTQUFTLENBQUMsS0FBSyxFQUNmLFdBQVcsQ0FDZCxDQUFDO3dCQUNOLENBQUMsQ0FBQyxDQUFDO3FCQUNOO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDO0tBQUE7SUE0QkQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsSUFBSSxDQUFDLFVBQWtCLEVBQUU7UUFDckIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxPQUFPLElBQUEsb0JBQVksRUFBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxHQUFHLENBQUMsT0FBZSxFQUFFLFFBQW9DO1FBQ3JELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxHQUFHLENBQUMsT0FBZSxFQUFFLEtBQVU7UUFDM0IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFdBQVcsQ0FBQyxRQUFnQjtRQUN4QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU07UUFDRixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEtBQUs7UUFDRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0csS0FBSyxDQUFDLFFBQStCOzs7WUFDdkMsSUFBSSxJQUFJLENBQUMsZUFBZTtnQkFBRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRS9ELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFO2dCQUNsRSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUMvQztZQUVELE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxpQ0FBc0IsQ0FBQztnQkFDbkQsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLE1BQU0sRUFBRTtvQkFDSixPQUFPLEVBQUU7d0JBQ0wsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFBLGlCQUFTLEdBQUUsRUFBRSxXQUFXLENBQUM7d0JBQ3hDLGFBQWE7d0JBQ2IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLDRCQUE0Qjs2QkFDM0MsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQzs2QkFDeEMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO3FCQUM5QjtvQkFDRCxNQUFNLEVBQUU7d0JBQ0osYUFBYTt3QkFDYixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsNEJBQTRCOzZCQUMzQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs0QkFDWixJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssUUFBUTtnQ0FBRSxPQUFPLElBQUksQ0FBQzs0QkFDeEMsT0FBTyxLQUFLLENBQUM7d0JBQ2pCLENBQUMsQ0FBQzs2QkFDRCxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7cUJBQzlCO29CQUNELElBQUksRUFBRTt3QkFDRixHQUFHLElBQUEscUJBQWEsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7NEJBQzVCLE9BQU8sRUFBRSxJQUFJO3lCQUNoQixDQUFDLGNBQWM7d0JBQ2hCLGFBQWE7d0JBQ2IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLDRCQUE0Qjs2QkFDM0MsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQzs2QkFDckMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO3FCQUM5QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsR0FBRyxJQUFBLHFCQUFhLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWM7d0JBQzdDLGFBQWE7d0JBQ2IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLDRCQUE0Qjs2QkFDM0MsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQzs2QkFDeEMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO3FCQUM5QjtvQkFDRCxJQUFJLEVBQUU7d0JBQ0YsR0FBRyxJQUFBLHFCQUFhLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQjt3QkFDcEQsYUFBYTt3QkFDYixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsNEJBQTRCOzZCQUMzQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDOzZCQUNyQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7cUJBQzlCO2lCQUNKO2FBQ0osQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGtCQUFTLENBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFO2dCQUMvRCxHQUFHLEVBQUU7b0JBQ0QsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHO29CQUNqQixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7aUJBQzlCO2dCQUNELEtBQUssRUFBRSxNQUFBLFFBQVEsQ0FBQyxLQUFLLG1DQUFJLElBQUk7Z0JBQzdCLGVBQWU7Z0JBQ2YsUUFBUTtnQkFDUixrREFBa0Q7Z0JBQ2xELG1EQUFtRDtnQkFDbkQseURBQXlEO2dCQUN6RCw0Q0FBNEM7Z0JBQzVDLDBDQUEwQztnQkFDMUMsOENBQThDO2dCQUM5Qyx5Q0FBeUM7Z0JBQ3pDLHVDQUF1QztnQkFDdkMsOEJBQThCO2dCQUM5QixpR0FBaUc7Z0JBQ2pHLHFCQUFxQjtnQkFDckIsc0RBQXNEO2dCQUN0RCx5REFBeUQ7Z0JBQ3pELGdCQUFnQjtnQkFDaEIsNkJBQTZCO2dCQUM3QixhQUFhO2dCQUNiLFNBQVM7Z0JBQ1QsS0FBSzthQUNSLENBQUMsQ0FBQztZQUVILE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSzthQUN4QixDQUFDLENBQUM7WUFFSCxPQUFPLEdBQUcsQ0FBQzs7S0FDZDs7QUFocUJMLCtCQWlxQkM7QUFocUJVLG1DQUFzQixHQUE4QixFQUFFLENBQUM7QUFDdkQsdUJBQVUsR0FBRyxTQUFTLENBQUM7QUFDdkIsMkJBQWMsR0FBRyxTQUFTLENBQUM7QUFDM0IseUNBQTRCLEdBQUcsRUFBRSxDQUFDO0FBQ2xDLHdDQUEyQixHQUFHLEVBQUUsQ0FBQztBQW9IeEM7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSSwwQkFBYSxHQUFHLEVBQUUsQ0FBQyJ9