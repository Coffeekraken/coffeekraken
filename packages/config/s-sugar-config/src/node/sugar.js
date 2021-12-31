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
import __SConfig, { SConfigFolderAdapter, } from '@coffeekraken/s-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __get from '@coffeekraken/sugar/shared/object/get';
import __fs from 'fs';
import __path from 'path';
import __SDocblock from '@coffeekraken/s-docblock';
import __objectHash from '@coffeekraken/sugar/shared/object/objectHash';
export default class SSugarConfig extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(__deepMerge({
            sugarConfig: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerFolder(path, scope, packageName) {
        this._registeredConfigFolderPaths.push({
            path,
            scope: scope !== null && scope !== void 0 ? scope : 'default',
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
     * @name            filesRealPaths
     * @type            String[]
     * @static
     * @get
     *
     * Access the config files real paths
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static get foldersPaths() {
        return this._registeredConfigFolderPaths.map((f) => f.path);
    }
    static load(envOrId, id) {
        // singleton promise
        if (this._loadPromise) {
            return this._loadPromise;
        }
        this._loadPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            id = id !== null && id !== void 0 ? id : (typeof envOrId === 'string' ? envOrId : undefined);
            if (!id) {
                if (__isPlainObject(envOrId)) {
                    id = __md5.encrypt(envOrId);
                }
                else {
                    id = 'default';
                }
            }
            let env;
            if (__isPlainObject(envOrId))
                env = envOrId;
            if (this._sSugarConfigInstances[id]) {
                return resolve({
                    id,
                    config: this._sSugarConfigInstances[id].get('.'),
                    instance: this._sSugarConfigInstances[id],
                });
            }
            this._sSugarConfigInstances[id] = new this({
                metas: {
                    id,
                },
                sugarConfig: {
                    env,
                },
            });
            const config = yield this._sSugarConfigInstances[id]._load();
            resolve({
                id,
                config,
                instance: this._sSugarConfigInstances[id],
            });
        }));
        return this._loadPromise;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @param       {String}        configId            The configuration if you want to get docblocks back for
     * @return      {ISugarConfigToDocblocksResult[]}                         An array containing ISugarConfigToDocblocksResult objects
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static toDocblocks(configId) {
        return __awaiter(this, void 0, void 0, function* () {
            // get the file path(s) for this config id
            configId = configId.replace('.config.js', '');
            const paths = this.filesPaths.filter((path) => {
                return path.includes(`${configId}.config.js`);
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
     * @param           {String}            [dotPath='']            The dot path of the config you want to hash
     * @return          {String}                                    The generated hash for this config
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static hash(dotPath = '') {
        const config = this.get(dotPath);
        return __objectHash(config);
    }
    /**
     * @name            toObject
     * @type            function
     * @static
     *
     * This static method allows you to get back the config in a simple object format.
     * Some configurations can be excluded using the config.config.browser.exclude configuration
     *
     * @param       {String}            [target="node"]         Specify the target of the config. Can be "node" or "browser"
     * @returns     {Any}                                       The configuration object filtered and ready for the asked target
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static toObject(target = 'node') {
        // get the configuration
        const config = this.get('');
        const newConfig = {};
        // include some config
        const include = this.get(`config.${target}.include`);
        if (!include || !include.length)
            return config;
        include.forEach((configId) => {
            newConfig[configId] = config[configId];
        });
        // return the filtered config
        return newConfig;
    }
    /**
     * @name            toJson
     * @type            function
     * @static
     *
     * This static method allows you to get back the config in a JSON format.
     * Some configurations can be included using the config.config.browser.include configuration
     *
     * @param       {String}            [target="node"]         Specify the target of the config. Can be "node" or "browser"
     * @return      {String}                                    The json string
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static toJson(target = 'node') {
        return JSON.stringify(this.toObject(target));
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static get(dotPath, id = 'default') {
        if (!this._sSugarConfigInstances[id]) {
            throw new Error(`<red>[${this.name}]</red> You MUST load the configuration before accessing them by calling the SSugarConfig.load() async instance function`);
        }
        // get the config
        return this._sSugarConfigInstances[id].get(dotPath, undefined, {
            throwErrorOnUndefinedConfig: false,
        });
    }
    static _searchConfigFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const sugarJson = new __SSugarJson();
            if (!this._rootSugarJson) {
                const rootSugarJsonPath = `${__packageRoot()}/sugar.json`;
                if (__fs.existsSync(rootSugarJsonPath)) {
                    this._rootSugarJson = sugarJson.sanitizeJson(yield import(rootSugarJsonPath));
                    if (this._rootSugarJson.extends &&
                        !Array.isArray(this._rootSugarJson.extends))
                        this._rootSugarJson.extends = [this._rootSugarJson.extends];
                }
            }
            if (!this._sugarJson) {
                this._sugarJson = sugarJson.read();
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
     * @name            sugarConfigSettings
     * @type            ISSugarConfigSettings
     * @get
     *
     * Access the sugar config settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get sugarConfigSettings() {
        return this._settings.sugarConfig;
    }
    /**
     * @name            hash
     * @type            String
     *
     * This hash function gives you access to the actual configuration hash.
     * You can specify a dot path to get the hash of a sub configuration
     *
     * @param           {String}            [dotPath='']            The dot path of the config you want to hash
     * @return          {String}                                    The generated hash for this config
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @return      {any}                           The getted configuration
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get(dotpath) {
        return this._configInstance.get(dotpath);
    }
    /**
     * @name            toDocblocks
     * @type            Function
     * @async
     *
     * This function take a config id as parameter and returns an array of docblocks parsed objects
     *
     * @param       {String}        configId            The configuration if you want to get docblocks back for
     * @return      {Any[]}                         An array of docblocks objects
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toDocblocks(configId) {
        return this.constructor.toDocblocks(configId);
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _load() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this._configInstance)
                return this._configInstance.get('.');
            if (!this.constructor._rootSugarJson || !this.constructor._sugarJson) {
                yield this.constructor._searchConfigFiles();
            }
            this._configInstance = new __SConfig('sugar', {
                env: (_a = this.sugarConfigSettings.env) !== null && _a !== void 0 ? _a : {},
                adapters: [
                    new SConfigFolderAdapter({
                        configAdapter: {
                            name: 'sugar',
                        },
                        configFolderAdapter: {
                            folderName: '.sugar',
                            fileName: '[name].config.js',
                            scopes: {
                                default: [
                                    __path.resolve(__dirname(), '../../src/config'),
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
                                    `${__packageRoot(process.cwd(), true)}/[folderName]`,
                                    // @ts-ignore
                                    ...this.constructor._registeredConfigFolderPaths
                                        .filter((obj) => obj.scope === 'repo')
                                        .map((obj) => obj.path),
                                ],
                                package: [
                                    `${__packageRoot(process.cwd())}/[folderName]`,
                                    // @ts-ignore
                                    ...this.constructor._registeredConfigFolderPaths
                                        .filter((obj) => obj.scope === 'package')
                                        .map((obj) => obj.path),
                                ],
                                user: [
                                    `${__packageRoot(process.cwd())}/.local/[folderName]`,
                                    // @ts-ignore
                                    ...this.constructor._registeredConfigFolderPaths
                                        .filter((obj) => obj.scope === 'user')
                                        .map((obj) => obj.path),
                                ],
                            },
                        },
                    }),
                ],
                resolvers: [
                    {
                        match: /\[theme.[a-zA-Z0-9.\-_:]+\]/gm,
                        resolve(string, matches, config, path) {
                            for (let i = 0; i < matches.length; i++) {
                                const match = matches[i];
                                const valuePath = match
                                    .replace('[theme.', '')
                                    .replace(']', '');
                                const value = __get(config, `theme.themes.${config.theme.theme}-${config.theme.variant}.${valuePath}`);
                                if (string === match)
                                    return value;
                                string = string.replace(match, value);
                            }
                            return string;
                        },
                    },
                ],
            });
            const res = yield this._configInstance.load();
            return res;
        });
    }
}
SSugarConfig._sSugarConfigInstances = {};
SSugarConfig._sugarJson = undefined;
SSugarConfig._rootSugarJson = undefined;
SSugarConfig._registeredConfigFolderPaths = [];
SSugarConfig._registeredConfigFilesPaths = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxTQUFTLEVBQUUsRUFFZCxvQkFBb0IsR0FDdkIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBOEN4RSxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxRQUFRO0lBMFk5Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTZDO1FBQ3JELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxXQUFXLEVBQUUsRUFBRTtTQUNsQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQXRaRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUNqQixJQUFZLEVBQ1osS0FBMEQsRUFDMUQsV0FBb0I7UUFFcEIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQztZQUNuQyxJQUFJO1lBQ0osS0FBSyxFQUFF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