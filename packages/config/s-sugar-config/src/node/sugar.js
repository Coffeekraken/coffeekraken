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
                                extends: [
                                    // @ts-ignore
                                    ...this._registeredConfigFolderPaths
                                        .filter((obj) => {
                                        if (this._rootSugarJson &&
                                            obj.scope === 'extends' &&
                                            this._rootSugarJson.extends.indexOf(obj.packageName) !== -1) {
                                            return true;
                                        }
                                        return false;
                                    })
                                        .map((obj) => obj.path)
                                ],
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
                            const themePath = path.slice(0, 3).join('.');
                            const valuePath = match
                                .replace('[theme.', themePath + '.')
                                .replace(']', '');
                            const value = __get(config, valuePath);
                            return value;
                        }
                    }
                ]
            });
            return yield this._sConfigInstance.load();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxTQUFTLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pFLE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFHSCxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQVk7SUFRL0I7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FDbkIsSUFBWSxFQUNaLEtBQXNFLEVBQ3RFLFdBQW9CO1FBR3BCLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUM7WUFDckMsSUFBSTtZQUNKLEtBQUssRUFBRSxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxTQUFTO1lBQ3pCLFdBQVc7U0FDWixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsMkJBQTJCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQywyQkFBMkIsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDL0ksT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUdELE1BQU0sS0FBSyxjQUFjO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsTUFBTSxLQUFLLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUM7SUFDMUMsQ0FBQztJQUVELE1BQU0sS0FBSyxnQkFBZ0I7UUFDekIsT0FBTyxJQUFJLENBQUMsNEJBQTRCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsTUFBTSxLQUFLLFlBQVk7UUFDckIsT0FBTyxJQUFJLENBQUMsNEJBQTRCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxNQUFNLENBQU8sSUFBSTs7WUFFZixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQzVDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDakM7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO2dCQUM3QyxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxvQkFBb0IsQ0FBQzt3QkFDdkIsYUFBYSxFQUFFOzRCQUNiLElBQUksRUFBRSxPQUFPO3lCQUNkO3dCQUNELG1CQUFtQixFQUFFOzRCQUNuQixVQUFVLEVBQUUsUUFBUTs0QkFDcEIsUUFBUSxFQUFFLGtCQUFrQjs0QkFDNUIsTUFBTSxFQUFFO2dDQUNOLE9BQU8sRUFBRTtvQ0FDUCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLGtCQUFrQixDQUFDO29DQUMvQyxhQUFhO29DQUNiLEdBQUcsSUFBSSxDQUFDLDRCQUE0Qjt5Q0FDakMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQzt5Q0FDeEMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO2lDQUMxQjtnQ0FDRCxNQUFNLEVBQUU7b0NBQ04sYUFBYTtvQ0FDYixHQUFHLElBQUksQ0FBQyw0QkFBNEI7eUNBQ2pDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dDQUNkLElBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxRQUFROzRDQUFFLE9BQU8sSUFBSSxDQUFDO3dDQUN4QyxPQUFPLEtBQUssQ0FBQztvQ0FDZixDQUFDLENBQUM7eUNBQ0QsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO2lDQUMxQjtnQ0FDRCxPQUFPLEVBQUU7b0NBQ1AsYUFBYTtvQ0FDYixHQUFHLElBQUksQ0FBQyw0QkFBNEI7eUNBQ2pDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dDQUNkLElBQ0UsSUFBSSxDQUFDLGNBQWM7NENBQ25CLEdBQUcsQ0FBQyxLQUFLLEtBQUssU0FBUzs0Q0FDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDM0Q7NENBQ0EsT0FBTyxJQUFJLENBQUM7eUNBQ2I7d0NBQ0QsT0FBTyxLQUFLLENBQUM7b0NBQ2YsQ0FBQyxDQUFDO3lDQUNELEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztpQ0FDMUI7Z0NBQ0QsSUFBSSxFQUFFO29DQUNKLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZTtvQ0FDcEQsYUFBYTtvQ0FDYixHQUFHLElBQUksQ0FBQyw0QkFBNEI7eUNBQ2pDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUM7eUNBQ3JDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztpQ0FDMUI7Z0NBQ0QsT0FBTyxFQUFFO29DQUNQLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlO29DQUM5QyxhQUFhO29DQUNiLEdBQUcsSUFBSSxDQUFDLDRCQUE0Qjt5Q0FDakMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQzt5Q0FDeEMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO2lDQUMxQjtnQ0FDRCxJQUFJLEVBQUU7b0NBQ0osR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQjtvQ0FDckQsYUFBYTtvQ0FDYixHQUFHLElBQUksQ0FBQyw0QkFBNEI7eUNBQ2pDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUM7eUNBQ3JDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztpQ0FDMUI7NkJBQ0Y7eUJBQ0Y7cUJBQ0YsQ0FBQztpQkFDSDtnQkFDRCxTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsS0FBSyxFQUFFLCtCQUErQjt3QkFDdEMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSTs0QkFDekIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUM3QyxNQUFNLFNBQVMsR0FBRyxLQUFLO2lDQUNwQixPQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsR0FBRyxHQUFHLENBQUM7aUNBQ25DLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBRXBCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7NEJBQ3ZDLE9BQU8sS0FBSyxDQUFDO3dCQUNmLENBQUM7cUJBQ0Y7aUJBQ0Y7YUFDRixDQUFDLENBQUM7WUFFSCxPQUFPLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1FBRTVDLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBZTtRQUV4QixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSwwSEFBMEgsQ0FBQyxDQUFDO1NBQy9KO1FBRUQsaUJBQWlCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO1lBQ25ELDJCQUEyQixFQUFFLEtBQUs7U0FDbkMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBTyxrQkFBa0I7O1lBRTdCLE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFFckMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3hCLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxhQUFhLEVBQUUsYUFBYSxDQUFDO2dCQUMxRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsRUFBRTtvQkFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztvQkFDOUUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7d0JBQzVFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDL0Q7YUFDRjtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7b0JBQ25ELGFBQWE7b0JBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO3dCQUM1QyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTs0QkFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQ3hELFNBQVMsQ0FBQyxLQUFLLEVBQ2YsV0FBVyxDQUNaLENBQUM7d0JBQ0osQ0FBQyxDQUFDLENBQUM7cUJBQ0o7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FBQTs7QUE5TE0sNkJBQWdCLEdBQUcsU0FBUyxDQUFDO0FBQzdCLHVCQUFVLEdBQUcsU0FBUyxDQUFDO0FBQ3ZCLDJCQUFjLEdBQUcsU0FBUyxDQUFDO0FBQzNCLHlDQUE0QixHQUFHLEVBQUUsQ0FBQztBQUNsQyx3Q0FBMkIsR0FBRyxFQUFFLENBQUMifQ==