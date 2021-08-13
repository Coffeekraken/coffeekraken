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
import __SConfig, { SConfigFolderAdapter } from '@coffeekraken/s-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __get from '@coffeekraken/sugar/shared/object/get';
import __fs from 'fs';
import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __memoize from '@coffeekraken/sugar/shared/function/memoize';
/**
 * @name                  sugar
 * @namespace           shared
 * @type                  Function
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
export default class SSugarConfig {
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
    static get filesRealPaths() {
        return this._registeredConfigFilesPaths.map((f) => __fs.realpathSync(f));
    }
    static get filesPaths() {
        return this._registeredConfigFilesPaths;
    }
    static get foldersRealPaths() {
        return this._registeredConfigFolderPaths.map((f) => __fs.realpathSync(f.path));
    }
    static get foldersPaths() {
        return this._registeredConfigFolderPaths.map((f) => f.path);
    }
    static resolve(dotPath) {
        if (!this._isLoaded)
            return undefined;
        return this.get(dotPath);
    }
    static load(id = 'default', env) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._rootSugarJson || !this._sugarJson) {
                yield this._searchConfigFiles();
            }
            this._sConfigInstances[id] = new __SConfig('sugar', {
                env: env !== null && env !== void 0 ? env : {},
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
                                    ...this._registeredConfigFolderPaths
                                        .filter((obj) => obj.scope === 'default')
                                        .map((obj) => obj.path),
                                ],
                                module: [
                                    // @ts-ignore
                                    ...this._registeredConfigFolderPaths
                                        .filter((obj) => {
                                        if (obj.scope === 'module')
                                            return true;
                                        return false;
                                    })
                                        .map((obj) => obj.path),
                                ],
                                // extends: [
                                //   // @ts-ignore
                                //   ...this._registeredConfigFolderPaths
                                //     .filter((obj) => {
                                //       if (
                                //         this._rootSugarJson &&
                                //         obj.scope === 'extends' &&
                                //         this._rootSugarJson.extends.indexOf(obj.packageName) !== -1
                                //       ) {
                                //         return true;
                                //       }
                                //       return false;
                                //     })
                                //     .map((obj) => obj.path)
                                // ],
                                repo: [
                                    `${__packageRoot(process.cwd(), true)}/[folderName]`,
                                    // @ts-ignore
                                    ...this._registeredConfigFolderPaths
                                        .filter((obj) => obj.scope === 'repo')
                                        .map((obj) => obj.path),
                                ],
                                package: [
                                    `${__packageRoot(process.cwd())}/[folderName]`,
                                    // @ts-ignore
                                    ...this._registeredConfigFolderPaths
                                        .filter((obj) => obj.scope === 'package')
                                        .map((obj) => obj.path),
                                ],
                                user: [
                                    `${__packageRoot(process.cwd())}/.local/[folderName]`,
                                    // @ts-ignore
                                    ...this._registeredConfigFolderPaths
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
                            return __memoize(() => {
                                for (let i = 0; i < matches.length; i++) {
                                    const match = matches[i];
                                    const valuePath = match.replace('[theme.', '').replace(']', '');
                                    const value = __get(config, `theme.themes.${config.theme.theme}.${valuePath}`);
                                    // if (value === undefined) {
                                    //   throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" theme config value does not exiats...`);
                                    // }
                                    if (string === match)
                                        return value;
                                    string = string.replace(match, value);
                                }
                                return string;
                            });
                        },
                    },
                ],
            });
            const res = yield this._sConfigInstances[id].load();
            return res;
        });
    }
    static safeGet(dotPath, id = 'default') {
        if (!this._sConfigInstances[id])
            return undefined;
        // get the config
        return this._sConfigInstances[id].get(dotPath, undefined, {
            throwErrorOnUndefinedConfig: false,
        });
    }
    static get(dotPath, id = 'default') {
        if (!this._sConfigInstances[id]) {
            throw new Error(`<red>[${this.name}]</red> You MUSTFFF load the configuration before accessing them by calling the SSugarConfig.load() async instance function`);
        }
        // get the config
        return this._sConfigInstances[id].get(dotPath, undefined, {
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
                    if (this._rootSugarJson.extends && !Array.isArray(this._rootSugarJson.extends))
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
}
SSugarConfig._sConfigInstances = {};
SSugarConfig._sugarJson = undefined;
SSugarConfig._rootSugarJson = undefined;
SSugarConfig._registeredConfigFolderPaths = [];
SSugarConfig._registeredConfigFilesPaths = [];
SSugarConfig._isLoaded = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxTQUFTLEVBQUUsRUFBRSxvQkFBb0IsRUFBa0IsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RixPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sU0FBUyxNQUFNLDZDQUE2QyxDQUFDO0FBR3BFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFZO0lBTzdCOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNILE1BQU0sQ0FBQyxjQUFjLENBQ2pCLElBQVksRUFDWixLQUEwRCxFQUMxRCxXQUFvQjtRQUVwQixJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDO1lBQ25DLElBQUk7WUFDSixLQUFLLEVBQUUsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksU0FBUztZQUN6QixXQUFXO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLDJCQUEyQixHQUFHO1lBQy9CLEdBQUcsSUFBSSxDQUFDLDJCQUEyQjtZQUNuQyxHQUFHLElBQUk7aUJBQ0YsV0FBVyxDQUFDLElBQUksQ0FBQztpQkFDakIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUN2QyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDUCxPQUFPLEdBQUcsSUFBSSxJ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