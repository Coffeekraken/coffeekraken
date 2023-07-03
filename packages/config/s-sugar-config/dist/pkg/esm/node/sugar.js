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
import { __replaceTokens } from '@coffeekraken/sugar/token';
import __fs from 'fs';
import __path from 'path';
import __SSugarConfigReadParamsInterface from './interfaces/SSugarConfigReadParamsInterface';
export default class SSugarConfig extends __SClass {
    /**
     * @name            registerFolder
     * @type            Function
     * @static
     *
     * This function allows you to register some folders to be taken in consideration
     * when accessing the config using the ```sugar``` function
     *
     * @param       {String}        folderPath          The folder path in which to check for .config.js files
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
     * @param       {String}        [dotpath='.']         The dotpath that specify the configuration you want to get
     * @param       {String}        [id="default"]      The configuration id you want to get the config from
     * @return      {any}                           The getted configuration
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get(dotPath = '.', id = 'default') {
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
     * @name            hash
     * @type            String
     *
     * This hash function gives you access to the actual configuration hash.
     * You can specify a dot path to get the hash of a sub configuration
     *
     * @param           {String}            [dotPath='.']            The dot path of the config you want to hash
     * @return          {String}                                    The generated hash for this config
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    hash(dotPath = '.') {
        const config = this.get(dotPath);
        return __objectHash(config);
    }
    /**
     * @name            read
     * @type            Function
     *
     * This method allows you to get a configuration back by passing a dotpath like "something.else"
     *
     * @param       {__SSugarConfigReadParamsInterface}         [params=null]           Some params to configure your read process
     * @return      {any}                           The getted configuration
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    read(params) {
        const finalParams = (__SSugarConfigReadParamsInterface.apply(params));
        return this._configInstance.get(finalParams.path);
    }
    /**
     * @name            get
     * @type            Function
     *
     * This method allows you to get a configuration back by passing a dotpath like "something.else"
     *
     * @param       {String}        [dotpath='.']         The dotpath that specify the config you want to get back
     * @return      {any}                           The getted configuration
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get(dotpath = '.', settings) {
        var _a;
        return (_a = this._configInstance) === null || _a === void 0 ? void 0 : _a.get(dotpath, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxPQUFPLFNBQTZCLE1BQU0sd0JBQXdCLENBQUM7QUFDbkUsT0FBTyxzQkFBc0IsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsT0FBTyxpQ0FBaUMsTUFBTSw4Q0FBOEMsQ0FBQztBQTBEN0YsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsUUFBUTtJQU85Qzs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUNqQixJQUFZLEVBQ1osUUFBNkQsU0FBUyxFQUN0RSxXQUFvQjtRQUVwQixnQkFBZ0I7UUFDaEIsSUFBSSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QixJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDO1lBQ25DLElBQUk7WUFDSixLQUFLO1lBQ0wsV0FBVztTQUNkLENBQUMsQ0FBQztRQUVILGlEQUFpRDtRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFP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