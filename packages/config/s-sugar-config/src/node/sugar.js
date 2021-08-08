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
            packageName
        });
        this._registeredConfigFilesPaths = [...this._registeredConfigFilesPaths, ...__fs.readdirSync(path).filter(p => p.match(/\.config\.js$/)).map(p => {
                return `${path}/${p}`;
            })];
    }
    static get filesRealPaths() {
        return this._registeredConfigFilesPaths.map(f => __fs.realpathSync(f));
    }
    static get filesPaths() {
        return this._registeredConfigFilesPaths;
    }
    static get foldersRealPaths() {
        return this._registeredConfigFolderPaths.map(f => __fs.realpathSync(f.path));
    }
    static get foldersPaths() {
        return this._registeredConfigFolderPaths.map(f => f.path);
    }
    static resolve(dotPath) {
        if (!this._isLoaded)
            return undefined;
        return this.get(dotPath);
    }
    static load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._rootSugarJson || !this._sugarJson) {
                yield this._searchConfigFiles();
            }
            this._sConfigInstance = new __SConfig('sugar', {
                adapters: [
                    new SConfigFolderAdapter({
                        configAdapter: {
                            name: 'sugar'
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
                                        .map((obj) => obj.path)
                                ],
                                module: [
                                    // @ts-ignore
                                    ...this._registeredConfigFolderPaths
                                        .filter((obj) => {
                                        if (obj.scope === 'module')
                                            return true;
                                        return false;
                                    })
                                        .map((obj) => obj.path)
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
                                        .map((obj) => obj.path)
                                ],
                                package: [
                                    `${__packageRoot(process.cwd())}/[folderName]`,
                                    // @ts-ignore
                                    ...this._registeredConfigFolderPaths
                                        .filter((obj) => obj.scope === 'package')
                                        .map((obj) => obj.path)
                                ],
                                user: [
                                    `${__packageRoot(process.cwd())}/.local/[folderName]`,
                                    // @ts-ignore
                                    ...this._registeredConfigFolderPaths
                                        .filter((obj) => obj.scope === 'user')
                                        .map((obj) => obj.path)
                                ]
                            }
                        }
                    })
                ],
                resolvers: [
                    {
                        match: /\[theme.[a-zA-Z0-9.\-_:]+\]/gm,
                        resolve(match, config, path) {
                            const valuePath = match
                                .replace('[theme.', '')
                                .replace(']', '');
                            return function () {
                                // console.log('GET', `theme.themes.${config.theme.theme}.${valuePath}`);
                                // console.log(__get(config, `theme.current.${valuePath}`));
                                return __get(config, `theme.themes.${config.theme.theme}.${valuePath}`);
                            };
                            //
                            // 
                            // const value = __get(config, valuePath);
                            // if (value === undefined) {
                            //   console.log(match, path, valuePath);
                            //   throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" theme value does not exiats...`);
                            // }
                            // return value;
                        }
                    }
                ]
            });
            const res = yield this._sConfigInstance.load();
            this._isLoaded = true;
            return res;
        });
    }
    static safeGet(dotPath) {
        if (!this._sConfigInstance || !this._isLoaded)
            return undefined;
        // get the config
        return this._sConfigInstance.get(dotPath, undefined, {
            throwErrorOnUndefinedConfig: false
        });
    }
    static get(dotPath) {
        if (!this._sConfigInstance) {
            throw new Error(`<red>[${this.name}]</red> You MUST load the configuration before accessing them by calling the SSugarConfig.load() async instance function`);
        }
        // get the config
        return this._sConfigInstance.get(dotPath, undefined, {
            throwErrorOnUndefinedConfig: false
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
SSugarConfig._sConfigInstance = undefined;
SSugarConfig._sugarJson = undefined;
SSugarConfig._rootSugarJson = undefined;
SSugarConfig._registeredConfigFolderPaths = [];
SSugarConfig._registeredConfigFilesPaths = [];
SSugarConfig._isLoaded = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxTQUFTLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pFLE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFHSCxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQVk7SUFRL0I7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FDbkIsSUFBWSxFQUNaLEtBQTBELEVBQzFELFdBQW9CO1FBR3BCLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUM7WUFDckMsSUFBSTtZQUNKLEtBQUssRUFBRSxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxTQUFTO1lBQ3pCLFdBQVc7U0FDWixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsMkJBQTJCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQywyQkFBMkIsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDL0ksT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04s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