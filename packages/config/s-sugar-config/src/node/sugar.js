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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxTQUFTLEVBQUUsRUFFZCxvQkFBb0IsR0FDdkIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBeUMxQixNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxRQUFRO0lBbVE5Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTZDO1FBQ3JELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxXQUFXLEVBQUUsRUFBRTtTQUNsQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQS9RRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUNqQixJQUFZLEVBQ1osS0FBMEQsRUFDMUQsV0FBb0I7UUFFcEIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQztZQUNuQyxJQUFJO1lBQ0osS0FBSyxFQUFFLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLFNBQVM7WUFDekIsV0FBVztTQUNkLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQywyQkFBMkIsR0FBRztZQUMvQixHQUFHLElBQUksQ0FBQywyQkFBMkI7WUFDbkMsR0FBRyxJQUFJO2lCQUNGLFdBQVcsQ0FBQyxJQUFJLENBQUM7aUJBQ2pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDdkMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1AsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUMxQixDQUFDLENBQUM7U0FDVCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLEtBQUssY0FBYztRQUNyQixPQUFPLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUN2QixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQywyQkFBMkIsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sS0FBSyxnQkFBZ0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsNEJBQTRCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQzVCLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sS0FBSyxZQUFZO1FBQ25CLE9BQU8sSUFBSSxDQUFDLDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILE1BQU0sQ0FBTyxJQUFJLENBQ2IsT0FBaUMsRUFDakMsRUFBVzs7WUFFWCxFQUFFLEdBQUcsRUFBRSxhQUFGLEVBQUUsY0FBRixFQUFFLEdBQUksQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDTCxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDMUIsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQy9CO3FCQUFNO29CQUNILEVBQUUsR0FBRyxTQUFTLENBQUM7aUJBQ2xCO2FBQ0o7WUFDRCxJQUFJLEdBQUcsQ0FBQztZQUNSLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQztnQkFBRSxHQUFHLEdBQUcsT0FBTyxDQUFDO1lBRTVDLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNqQyxPQUFPO29CQUNILEVBQUU7b0JBQ0YsTUFBTSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO29CQUNoRCxRQUFRLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQztpQkFDNUMsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO2dCQUN2QyxLQUFLLEVBQUU7b0JBQ0gsRUFBRTtpQkFDTDtnQkFDRCxXQUFXLEVBQUU7b0JBQ1QsR0FBRztpQkFDTjthQUNKLENBQUMsQ0FBQztZQUNILE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzdELE9BQU87Z0JBQ0gsRUFBRTtnQkFDRixNQUFNO2dCQUNOLFFBQVEsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDO2FBQzVDLENBQUM7UUFDTixDQUFDO0tBQUE7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFLEdBQUcsU0FBUztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQ1gsU0FBUyxJQUFJLENBQUMsSUFBSSwwSEFBMEgsQ0FDL0ksQ0FBQztTQUNMO1FBRUQsaUJBQWlCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO1lBQzNELDJCQUEyQixFQUFFLEtBQUs7U0FDckMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU0sQ0FBTyxrQkFBa0I7O1lBQzNCLE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFFckMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3RCLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxhQUFhLEVBQUUsYUFBYSxDQUFDO2dCQUMxRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsRUFBRTtvQkFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUN4QyxNQUFNLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUNsQyxDQUFDO29CQUNGLElBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPO3dCQUMzQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7d0JBRTNDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbkU7YUFDSjtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7b0JBQ2pELGFBQWE7b0JBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO3dCQUMxQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTs0QkFDekMsSUFBSSxDQUFDLGNBQWMsQ0FDZixNQUFNLENBQUMsT0FBTyxDQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUN4QixTQUFTLENBQUMsSUFBSSxDQUNqQixFQUNELFNBQVMsQ0FBQyxLQUFLLEVBQ2YsV0FBVyxDQUNkLENBQUM7d0JBQ04sQ0FBQyxDQUFDLENBQUM7cUJBQ047Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUM7S0FBQTtJQWNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksbUJBQW1CO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7SUFDdEMsQ0FBQztJQXVCRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEdBQUcsQ0FBQyxPQUFlO1FBQ2YsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDRyxLQUFLOzs7WUFDUCxJQUFJLElBQUksQ0FBQyxlQUFlO2dCQUFFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ2xFLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQy9DO1lBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQzFDLEdBQUcsRUFBRSxNQUFBLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLG1DQUFJLEVBQUU7Z0JBQ3ZDLFFBQVEsRUFBRTtvQkFDTixJQUFJLG9CQUFvQixDQUFDO3dCQUNyQixhQUFhLEVBQUU7NEJBQ1gsSUFBSSxFQUFFLE9BQU87eUJBQ2hCO3dCQUNELG1CQUFtQixFQUFFOzRCQUNqQixVQUFVLEVBQUUsUUFBUTs0QkFDcEIsUUFBUSxFQUFFLGtCQUFrQjs0QkFDNUIsTUFBTSxFQUFFO2dDQUNKLE9BQU8sRUFBRTtvQ0FDTCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLGtCQUFrQixDQUFDO29DQUMvQyxhQUFhO29DQUNiLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyw0QkFBNEI7eUNBQzNDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7eUNBQ3hDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztpQ0FDOUI7Z0NBQ0QsTUFBTSxFQUFFO29DQUNKLGFBQWE7b0NBQ2IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLDRCQUE0Qjt5Q0FDM0MsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7d0NBQ1osSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLFFBQVE7NENBQUUsT0FBTyxJQUFJLENBQUM7d0NBQ3hDLE9BQU8sS0FBSyxDQUFDO29DQUNqQixDQUFDLENBQUM7eUNBQ0QsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO2lDQUM5QjtnQ0FDRCxJQUFJLEVBQUU7b0NBQ0YsR0FBRyxhQUFhLENBQ1osT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiLElBQUksQ0FDUCxlQUFlO29DQUNoQixhQUFhO29DQUNiLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyw0QkFBNEI7eUNBQzNDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUM7eUNBQ3JDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztpQ0FDOUI7Z0NBQ0QsT0FBTyxFQUFFO29DQUNMLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlO29DQUM5QyxhQUFhO29DQUNiLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyw0QkFBNEI7eUNBQzNDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7eUNBQ3hDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztpQ0FDOUI7Z0NBQ0QsSUFBSSxFQUFFO29DQUNGLEdBQUcsYUFBYSxDQUNaLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FDaEIsc0JBQXNCO29DQUN2QixhQUFhO29DQUNiLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyw0QkFBNEI7eUNBQzNDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUM7eUNBQ3JDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztpQ0FDOUI7NkJBQ0o7eUJBQ0o7cUJBQ0osQ0FBQztpQkFDTDtnQkFDRCxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksS0FBSyxFQUFFLCtCQUErQjt3QkFDdEMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUk7NEJBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dDQUNyQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3pCLE1BQU0sU0FBUyxHQUFHLEtBQUs7cUNBQ2xCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDO3FDQUN0QixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dDQUN0QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQ2YsTUFBTSxFQUNOLGdCQUFnQixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxTQUFTLEVBQUUsQ0FDNUUsQ0FBQztnQ0FDRixJQUFJLE1BQU0sS0FBSyxLQUFLO29DQUFFLE9BQU8sS0FBSyxDQUFDO2dDQUNuQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7NkJBQ3pDOzRCQUNELE9BQU8sTUFBTSxDQUFDO3dCQUNsQixDQUFDO3FCQUNKO2lCQUNKO2FBQ0osQ0FBQyxDQUFDO1lBRUgsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlDLE9BQU8sR0FBRyxDQUFDOztLQUNkOztBQTNZTSxtQ0FBc0IsR0FBOEIsRUFBRSxDQUFDO0FBQ3ZELHVCQUFVLEdBQUcsU0FBUyxDQUFDO0FBQ3ZCLDJCQUFjLEdBQUcsU0FBUyxDQUFDO0FBQzNCLHlDQUE0QixHQUFHLEVBQUUsQ0FBQztBQUNsQyx3Q0FBMkIsR0FBRyxFQUFFLENBQUMifQ==