// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import type { ISConfigSettings } from '@coffeekraken/s-config';
import __SConfig, { ISConfigEnvObj } from '@coffeekraken/s-config';
import __SConfigFolderAdapter from '@coffeekraken/s-config-folder-adapter';
import __SDocblock from '@coffeekraken/s-docblock';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import { __dirname, __readJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge, __objectHash } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __replaceTokens from '@coffeekraken/sugar/shared/token/replaceTokens';
import __fs from 'fs';
import __path from 'path';

/**
 * @name                  SSugarConfig
 * @namespace           node
 * @type                  Class
 * @extends             SClass
 * @status              beta
 *
 * This function allows you to access easily the configurations stored in the ```sugar.config.js```.
 * The returned configuration is the result of the default sugar config stored in the toolkit and the
 * app defined config stored in current application root folder
 *
 * @param         {String}        dotPath         The dot path to the config wanted
 * @return        {Mixed}                         Return the value if exists, undefined if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Enhancement}       Find a way to specify the "userConfigPath" dynamically without having circular dependencies
 * @todo      Add multi level extends support
 *
 * @example             js
 * import __SSugarConfig from '@coffeekraken/s-sugar-config';
 * __SSugarConfig.get('scss.unit'); // => rem
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISSugarConfigLoadedObj {
    id: string;
    config: any;
    instance: SSugarConfig;
}

export interface ISugarConfigToDocblocksResult {
    path: string;
    docblocks: any[];
}

export interface ISSugarConfigSettings {
    id: string;
    env: 'development' | 'production' | 'test';
    platform: 'node' | 'browser';
    cache: boolean;
    clean: boolean;
}

export default class SSugarConfig extends __SClass {
    static _sSugarConfigInstances: Record<string, __SConfig> = {};
    static _sugarJson = undefined;
    static _rootSugarJson = undefined;
    static _registeredConfigFolderPaths = [];
    static _registeredConfigFilesPaths = [];

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
    static registerFolder(
        path: string,
        scope?: 'default' | 'module' | 'repo' | 'package' | 'user' = 'default',
        packageName?: string,
    ): void {
        // handle tokens
        path = __replaceTokens(path);

        this._registeredConfigFolderPaths.push({
            path,
            scope,
            packageName,
        });

        // protect against readding none existing folders
        if (!__fs.existsSync(path)) return;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get filesRealPaths(): string[] {
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
    static get filesPaths(): string[] {
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
    static get foldersRealPaths(): string[] {
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
    static get foldersPaths(): string[] {
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
     * @param           {String}            [id=null]           A special id for your loaded configuration like "browser", "somethingElse", etc... If not provided, this will be generated depending on the passed ```env``` object
     * @return          {ISSugarConfigLoadedObj}                An object containing your configuration, the SSugarConfig instance used behind and the assigned id
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static _loadPromises = {};
    static load(
        settings?: Partial<ISSugarConfigSettings>,
    ): ISSugarConfigLoadedObj {
        const finalSettings: ISSugarConfigSettings = __deepMerge(
            {
                id: 'default',
                env: process.env.NODE_ENV,
                platform: 'node',
                cache: true,
                clean: false,
            },
            settings ?? {},
        );

        // singleton promise
        if (SSugarConfig._loadPromises[finalSettings.id]) {
            return SSugarConfig._loadPromises[finalSettings.id];
        }

        SSugarConfig._loadPromises[finalSettings.id] = new Promise(
            async (resolve, reject) => {
                if (SSugarConfig._sSugarConfigInstances[finalSettings.id]) {
                    return resolve({
                        id: finalSettings.id,
                        config: SSugarConfig._sSugarConfigInstances[
                            finalSettings.id
                        ].get('.'),
                        instance:
                            SSugarConfig._sSugarConfigInstances[
                                finalSettings.id
                            ],
                    });
                }

                SSugarConfig._sSugarConfigInstances[finalSettings.id] =
                    new SSugarConfig({
                        metas: {
                            id: finalSettings.id,
                        },
                        sugarConfig: finalSettings ?? {},
                    });
                const config = await SSugarConfig._sSugarConfigInstances[
                    finalSettings.id
                ]._load(finalSettings);
                resolve({
                    id: finalSettings.id,
                    config,
                    instance:
                        SSugarConfig._sSugarConfigInstances[finalSettings.id],
                });
            },
        );

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
    static toJson(settings?: Partial<ISSugarConfigSettings>): any {
        return new Promise(async (resolve) => {
            const config = await SSugarConfig.load(settings);
            resolve(config.instance.toJson());
        });
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
    static toObject(settings?: Partial<ISSugarConfigSettings>): any {
        return new Promise(async (resolve) => {
            const config = await SSugarConfig.load(settings);
            resolve(config.instance.toObject());
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isLoaded(id = 'default'): boolean {
        if (!this._sSugarConfigInstances[id]) return false;
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
    static async toDocblocks(configIdOrPath: string): any[] {
        // get the file path(s) for this config id
        configIdOrPath = configIdOrPath.replace('.config.js', '');
        const paths = this.filesPaths.filter((path) => {
            return path.includes(`${configIdOrPath}.config.js`);
        });

        const results = [];
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const docblock = new __SDocblock(path);
            await docblock.parse();
            results.push({
                path,
                docblocks: docblock.toObject(),
            });
        }

        return results;
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
    static hash(dotPath: string = ''): string {
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
    static get(dotPath: string, id = 'default'): any {
        if (!this._sSugarConfigInstances[id]) {
            throw new Error(
                `<red>[${this.name}]</red> You MUST load the configuration before accessing them by calling the SSugarConfig.load() async static method`,
            );
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
    static getSafe(dotPath: string, id = 'default'): any {
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
    static set(dotPath: string, value: any, id = 'default'): any {
        if (!this._sSugarConfigInstances[id]) {
            throw new Error(
                `<red>[${this.name}]</red> You MUST load the configuration before accessing them by calling the SSugarConfig.load() async static method`,
            );
        }

        // get the config
        return this._sSugarConfigInstances[id].set(dotPath, value);
    }

    static async _searchConfigFiles() {
        const sugarJson = new __SSugarJson();

        if (!this._rootSugarJson) {
            const rootSugarJsonPath = `${__packageRootDir()}/sugar.json`;
            if (__fs.existsSync(rootSugarJsonPath)) {
                const json = __readJsonSync(rootSugarJsonPath);
                this._rootSugarJson = sugarJson.sanitizeJson(json.default);
                if (
                    this._rootSugarJson.extends &&
                    !Array.isArray(this._rootSugarJson.extends)
                )
                    this._rootSugarJson.extends = [this._rootSugarJson.extends];
            }
        }

        if (!this._sugarJson) {
            this._sugarJson = await sugarJson.read();

            Object.keys(this._sugarJson).forEach((packageName) => {
                // @ts-ignore
                const jsonObj = this._sugarJson[packageName];
                if (jsonObj.config && jsonObj.config.folders) {
                    jsonObj.config.folders.forEach((folderObj) => {
                        this.registerFolder(
                            __path.resolve(
                                jsonObj.metas.folderPath,
                                folderObj.path,
                            ),
                            folderObj.scope,
                            packageName,
                        );
                    });
                }
            });
        }
    }

    /**
     * @name            _configInstance
     * @type            SConfig
     * @private
     *
     * Store the SConfig instance used by this SSugarConfig instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _configInstance;

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
    constructor(settings?: Partial<ISSugarConfigSettings>) {
        super(__deepMerge({}, settings ?? {}));
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
    hash(dotPath: string = ''): string {
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
    get(dotpath: string, settings?: Partial<ISConfigSettings>): any {
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
    set(dotpath: string, value: any): any {
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
    toDocblocks(configId: string): any[] {
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
    toJson(): any[] {
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
    toObject(): any[] {
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
    cache(): any[] {
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
    async _load(settings: ISSugarConfigSettings) {
        if (this._configInstance) return this._configInstance.get('.');

        if (!this.constructor._rootSugarJson || !this.constructor._sugarJson) {
            await this.constructor._searchConfigFiles();
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
                            if (obj.scope === 'module') return true;
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
            cache: settings.cache ?? true,
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

        const res = await this._configInstance.load({
            clean: settings.clean,
        });

        return res;
    }
}
