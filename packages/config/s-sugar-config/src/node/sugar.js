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
        return this._registeredConfigFilesPaths.map((f) => __fs.realpathSync(f));
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
        return this._registeredConfigFolderPaths.map((f) => __fs.realpathSync(f.path));
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
     * @param           {String}            [id=null]           A special id for your loaded configuration like "browser", "somethingElse", etc... If not provided, this will be generated depending on the passed ```env``` object
     * @return          {ISSugarConfigLoadedObj}                An object containing your configuration, the SSugarConfig instance used behind and the assigned id
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static load(envOrId, id) {
        return __awaiter(this, void 0, void 0, function* () {
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
                return {
                    id,
                    config: this._sSugarConfigInstances[id].get('.'),
                    instance: this._sSugarConfigInstances[id],
                };
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
            return {
                id,
                config,
                instance: this._sSugarConfigInstances[id],
            };
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxTQUFTLEVBQUUsRUFFZCxvQkFBb0IsR0FDdkIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBOEN4RSxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxRQUFRO0lBMFU5Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTZDO1FBQ3JELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxXQUFXLEVBQUUsRUFBRTtTQUNsQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQXRWRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUNqQixJQUFZLEVBQ1osS0FBMEQsRUFDMUQsV0FBb0I7UUFFcEIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQztZQUNuQyxJQUFJO1lBQ0osS0FBSyxFQUFF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