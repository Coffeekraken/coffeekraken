// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import __SConfig, {
    ISConfigEnvObj,
    SConfigFolderAdapter,
} from '@coffeekraken/s-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __get from '@coffeekraken/sugar/shared/object/get';
import __fs from 'fs';
import __path from 'path';

/**
 * @name                  sugar
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
 * import sugar from '@coffeekraken/s-sugar-config';
 * sugar('scss.unit'); // => rem
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISSugarConfigLoadedObj {
    id: string;
    config: any;
    instance: SSugarConfig;
}

export interface ISSugarConfigCtorSettings {
    sugarConfig: Partial<ISSugarConfigCtorSettings>;
}
export interface ISSugarConfigCtorSettings {}

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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerFolder(
        path: string,
        scope?: 'default' | 'module' | 'repo' | 'package' | 'user',
        packageName?: string,
    ): void {
        this._registeredConfigFolderPaths.push({
            path,
            scope: scope ?? 'default',
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
    static get filesRealPaths(): string[] {
        return this._registeredConfigFilesPaths.map((f) =>
            __fs.realpathSync(f),
        );
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static get foldersRealPaths(): string[] {
        return this._registeredConfigFolderPaths.map((f) =>
            __fs.realpathSync(f.path),
        );
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
     * @param           {String}            [id=null]           A special id for your loaded configuration like "browser", "somethingElse", etc... If not provided, this will be generated depending on the passed ```env``` object
     * @return          {ISSugarConfigLoadedObj}                An object containing your configuration, the SSugarConfig instance used behind and the assigned id
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static async load(
        envOrId?: ISConfigEnvObj | string,
        id?: string,
    ): ISSugarConfigLoadedObj {
        id = id ?? (typeof envOrId === 'string' ? envOrId : undefined);
        if (!id) {
            if (__isPlainObject(envOrId)) {
                id = __md5.encrypt(envOrId);
            } else {
                id = 'default';
            }
        }
        let env;
        if (__isPlainObject(envOrId)) env = envOrId;

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
        const config = await this._sSugarConfigInstances[id]._load();
        return {
            id,
            config,
            instance: this._sSugarConfigInstances[id],
        };
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
    static get(dotPath: string, id = 'default'): any {
        if (!this._sSugarConfigInstances[id]) {
            throw new Error(
                `<red>[${this.name}]</red> You MUST load the configuration before accessing them by calling the SSugarConfig.load() async instance function`,
            );
        }

        // get the config
        return this._sSugarConfigInstances[id].get(dotPath, undefined, {
            throwErrorOnUndefinedConfig: false,
        });
    }

    static async _searchConfigFiles() {
        const sugarJson = new __SSugarJson();

        if (!this._rootSugarJson) {
            const rootSugarJsonPath = `${__packageRoot()}/sugar.json`;
            if (__fs.existsSync(rootSugarJsonPath)) {
                this._rootSugarJson = sugarJson.sanitizeJson(
                    await import(rootSugarJsonPath),
                );
                if (
                    this._rootSugarJson.extends &&
                    !Array.isArray(this._rootSugarJson.extends)
                )
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    private _configInstance;

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
    get sugarConfigSettings(): ISSugarConfigSettings {
        return this._settings.sugarConfig;
    }

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
    constructor(settings?: Partial<ISSugarConfigCtorSettings>) {
        super(
            __deepMerge(
                {
                    sugarConfig: {},
                },
                settings ?? {},
            ),
        );
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
    get(dotpath: string): any {
        return this._configInstance.get(dotpath);
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
    async _load() {
        if (this._configInstance) return this._configInstance.get('.');

        if (!this.constructor._rootSugarJson || !this.constructor._sugarJson) {
            await this.constructor._searchConfigFiles();
        }

        this._configInstance = new __SConfig('sugar', {
            env: this.sugarConfigSettings.env ?? {},
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
                                        if (obj.scope === 'module') return true;
                                        return false;
                                    })
                                    .map((obj) => obj.path),
                            ],
                            repo: [
                                `${__packageRoot(
                                    process.cwd(),
                                    true,
                                )}/[folderName]`,
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
                                `${__packageRoot(
                                    process.cwd(),
                                )}/.local/[folderName]`,
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
                            const value = __get(
                                config,
                                `theme.themes.${config.theme.theme}-${config.theme.variant}.${valuePath}`,
                            );
                            if (string === match) return value;
                            string = string.replace(match, value);
                        }
                        return string;
                    },
                },
            ],
        });

        const res = await this._configInstance.load();
        return res;
    }
}
