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
import __SClass from '@coffeekraken/s-class';
import __SConfig from '@coffeekraken/s-config';
import __SConfigFolderAdapter from '@coffeekraken/s-config-folder-adapter';
import __SDocblock from '@coffeekraken/s-docblock';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import { __dirname, __readJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge, __objectHash } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __replaceTokens from '@coffeekraken/sugar/shared/token/replaceTokens';
import __fs from 'fs';
import __path from 'path';
export default class SSugarConfig extends __SClass {
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
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
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
        path = __replaceTokens(path);
        this._registeredConfigFolderPaths.push({
            path,
            scope,
            packageName,
        });
        // protect against readding none existing folders
        if (!__fs.existsSync(path))
            return;
        // adding folders
        this._registeredConfigFilesPaths = [
            ...this._registeredConfigFilesPaths,
            ...__fs
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
            return __fs.existsSync(f);
        })
            .map((f) => __fs.realpathSync(f));
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
            return __fs.existsSync(f.path);
        })
            .map((f) => __fs.realpathSync(f.path));
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
        const finalSettings = __deepMerge({
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
                const docblock = new __SDocblock(path);
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
        return __objectHash(config);
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
            const sugarJson = new __SSugarJson();
            if (!this._rootSugarJson) {
                const rootSugarJsonPath = `${__packageRootDir()}/sugar.json`;
                if (__fs.existsSync(rootSugarJsonPath)) {
                    const json = __readJsonSync(rootSugarJsonPath);
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
                            this.registerFolder(__path.resolve(jsonObj.metas.folderPath, folderObj.path), folderObj.scope, packageName);
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
        return __objectHash(config);
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
            const configFolderAdapter = new __SConfigFolderAdapter({
                name: 'sugar',
                folderName: '.sugar',
                fileName: '%name.config.js',
                scopes: {
                    default: [
                        __path.resolve(__dirname(), '../config'),
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
                        `${__packageRootDir(process.cwd(), {
                            highest: true,
                        })}/%folderName`,
                        // @ts-ignore
                        ...this.constructor._registeredConfigFolderPaths
                            .filter((obj) => obj.scope === 'repo')
                            .map((obj) => obj.path),
                    ],
                    package: [
                        `${__packageRootDir(process.cwd())}/%folderName`,
                        // @ts-ignore
                        ...this.constructor._registeredConfigFolderPaths
                            .filter((obj) => obj.scope === 'package')
                            .map((obj) => obj.path),
                    ],
                    user: [
                        `${__packageRootDir(process.cwd())}/.local/%folderName`,
                        // @ts-ignore
                        ...this.constructor._registeredConfigFolderPaths
                            .filter((obj) => obj.scope === 'user')
                            .map((obj) => obj.path),
                    ],
                },
            });
            this._configInstance = new __SConfig('sugar', configFolderAdapter, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxPQUFPLFNBQTZCLE1BQU0sd0JBQXdCLENBQUM7QUFDbkUsT0FBTyxzQkFBc0IsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxlQUFlLE1BQU0sZ0RBQWdELENBQUM7QUFDN0UsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQW1EMUIsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsUUFBUTtJQW9jOUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF5QztRQUNqRCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUF6Y0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FDakIsSUFBWSxFQUNaLFFBQTZELFNBQVMsRUFDdEUsV0FBb0I7UUFFcEIsZ0JBQWdCO1FBQ2hCLElBQUksR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQztZQUNuQyxJQUFJO1lBQ0osS0FB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