"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_config_1 = __importDefault(require("@coffeekraken/s-config"));
const s_config_folder_adapter_1 = __importDefault(require("@coffeekraken/s-config-folder-adapter"));
const s_docblock_1 = __importDefault(require("@coffeekraken/s-docblock"));
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const replaceTokens_1 = __importDefault(require("@coffeekraken/sugar/shared/token/replaceTokens"));
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
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
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
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
        if (!fs_2.default.existsSync(path))
            return;
        // adding folders
        this._registeredConfigFilesPaths = [
            ...this._registeredConfigFilesPaths,
            ...fs_2.default
                .readdirSync(path)
                .filter((p) => p.match(/\.config\.js$/))
                .map((p) => {
                return `${path}/${p}`;
            }),
        ];
    }
    /**
     * @name        config
     * @type        ISSugarConfig
     * @get
     *
     * Simple config accessor to access directly the config object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get config() {
        return this.get('.');
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
            return fs_2.default.existsSync(f);
        })
            .map((f) => fs_2.default.realpathSync(f));
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
            return fs_2.default.existsSync(f.path);
        })
            .map((f) => fs_2.default.realpathSync(f.path));
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
        const finalSettings = (0, object_1.__deepMerge)({
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
        return (0, object_1.__objectHash)(config);
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
                const rootSugarJsonPath = `${(0, path_1.__packageRootDir)()}/sugar.json`;
                if (fs_2.default.existsSync(rootSugarJsonPath)) {
                    const json = (0, fs_1.__readJsonSync)(rootSugarJsonPath);
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
                            this.registerFolder(path_2.default.resolve(jsonObj.metas.folderPath, folderObj.path), folderObj.scope, packageName);
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
        return (0, object_1.__objectHash)(config);
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
                        path_2.default.resolve((0, fs_1.__dirname)(), '../config'),
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
                        `${(0, path_1.__packageRootDir)(process.cwd(), {
                            highest: true,
                        })}/%folderName`,
                        // @ts-ignore
                        ...this.constructor._registeredConfigFolderPaths
                            .filter((obj) => obj.scope === 'repo')
                            .map((obj) => obj.path),
                    ],
                    package: [
                        `${(0, path_1.__packageRootDir)(process.cwd())}/%folderName`,
                        // @ts-ignore
                        ...this.constructor._registeredConfigFolderPaths
                            .filter((obj) => obj.scope === 'package')
                            .map((obj) => obj.path),
                    ],
                    user: [
                        `${(0, path_1.__packageRootDir)(process.cwd())}/.local/%folderName`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE2QztBQUU3QyxzRUFBbUU7QUFDbkUsb0dBQTJFO0FBQzNFLDBFQUFtRDtBQUNuRCw4RUFBc0Q7QUFDdEQsK0NBQW1FO0FBQ25FLHVEQUF1RTtBQUN2RSxtREFBNEQ7QUFDNUQsbUdBQTZFO0FBQzdFLDRDQUFzQjtBQUN0QixnREFBMEI7QUFtRDFCLE1BQXFCLFlBQWEsU0FBUSxpQkFBUTtJQW9jOUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF5QztRQUNqRCxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUF6Y0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FDakIsSUFBWSxFQUNaLFFBQTZELFNBQVMsRUFDdEUsV0FBb0I7UUFFcEIsZ0JBQWdCO1FBQ2hCLElBQUksR0FBRyxJQUFBLHVCQUFlLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQztZQUNuQyxJQUFJO1lBQ0osS0FBSztZQUNMLFdBQVc7U0FDZCxDQUFDLENBQUM7UUFFSCxpREFBaUQ7UUFDakQsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTztRQUNuQyxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLDJCQUEyQixHQUFHO1lBQy9CLEdBQUcsSUFBSSxDQUFDLDJCQUEyQjtZQUNuQyxHQUFHLFlBQUk7aUJBQ0YsV0FBVyxDQUFDLElBQUksQ0FBQztpQkFDakIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFD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