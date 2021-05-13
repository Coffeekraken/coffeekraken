import __SConfig from '@coffeekraken/s-config';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __registerFolder from './registerFolder';
import __fs from 'fs';
import __path from 'path';
import { SConfigFolderAdapter } from '@coffeekraken/s-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
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
// @ts-ignore
(global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths = [];
let sugarConfigInstance;
let _sugarJsons, _rootSugarJson;
export default function sugar(dotPath) {
    let rootSugarJson;
    const sugarJson = new __SSugarJson();
    if (!_rootSugarJson) {
        const rootSugarJsonPath = `${__packageRoot()}/sugar.json`;
        if (__fs.existsSync(rootSugarJsonPath)) {
            rootSugarJson = sugarJson.sanitizeJson(require(rootSugarJsonPath));
            if (rootSugarJson.extends && !Array.isArray(rootSugarJson.extends))
                rootSugarJson.extends = [rootSugarJson.extends];
        }
    }
    else {
        rootSugarJson = _rootSugarJson;
    }
    if (!_sugarJsons) {
        _sugarJsons = sugarJson.read();
        Object.keys(_sugarJsons).forEach((packageName) => {
            const jsonObj = _sugarJsons[packageName];
            if (jsonObj.config && jsonObj.config.folders) {
                jsonObj.config.folders.forEach((folderObj) => {
                    __registerFolder(__path.resolve(jsonObj.metas.folderPath, folderObj.path), folderObj.scope, packageName);
                });
            }
        });
    }
    if (!sugarConfigInstance) {
        sugarConfigInstance = new __SConfig('sugar', {
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
                                __path.resolve(__dirname, '../../config'),
                                // @ts-ignore
                                ...(global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths
                                    .filter((obj) => obj.scope === 'default')
                                    .map((obj) => obj.path)
                            ],
                            module: [
                                // @ts-ignore
                                ...(global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths
                                    .filter((obj) => {
                                    if (obj.scope === 'module')
                                        return true;
                                    return false;
                                })
                                    .map((obj) => obj.path)
                            ],
                            extends: [
                                // @ts-ignore
                                ...(global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths
                                    .filter((obj) => {
                                    if (rootSugarJson &&
                                        obj.scope === 'extends' &&
                                        rootSugarJson.extends.indexOf(obj.packageName) !== -1) {
                                        return true;
                                    }
                                    return false;
                                })
                                    .map((obj) => obj.path)
                            ],
                            repo: [
                                `${__packageRoot(process.cwd(), true)}/[folderName]`,
                                // @ts-ignore
                                ...(global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths
                                    .filter((obj) => obj.scope === 'repo')
                                    .map((obj) => obj.path)
                            ],
                            package: [
                                `${__packageRoot(process.cwd())}/[folderName]`,
                                // @ts-ignore
                                ...(global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths
                                    .filter((obj) => obj.scope === 'package')
                                    .map((obj) => obj.path)
                            ],
                            user: [
                                `${__packageRoot(process.cwd())}/.local/[folderName]`,
                                // @ts-ignore
                                ...(global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths
                                    .filter((obj) => obj.scope === 'user')
                                    .map((obj) => obj.path)
                            ]
                        }
                    }
                })
            ]
        });
    }
    // get the config
    return sugarConfigInstance.get(dotPath, undefined, {
        throwErrorOnUndefinedConfig: false
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUUvQyxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLGdCQUFnQixNQUFNLGtCQUFrQixDQUFDO0FBRWhELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxZQUFZLE1BQU0sNEJBQTRCLENBQUM7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxhQUFhO0FBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxNQUFNLENBQUMsQ0FBQyw0QkFBNEIsR0FBRyxFQUFFLENBQUM7QUFDckQsSUFBSSxtQkFBbUIsQ0FBQztBQUN4QixJQUFJLFdBQVcsRUFBRSxjQUFjLENBQUM7QUFFaEMsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsT0FBZTtJQUMzQyxJQUFJLGFBQWEsQ0FBQztJQUVsQixNQUFNLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRXJDLElBQUksQ0FBQyxjQUFjLEVBQUU7UUFDbkIsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLGFBQWEsRUFBRSxhQUFhLENBQUM7UUFDMUQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDdEMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUNuRSxJQUFJLGFBQWEsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7Z0JBQ2hFLGFBQWEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkQ7S0FDRjtTQUFNO1FBQ0wsYUFBYSxHQUFHLGNBQWMsQ0FBQztLQUNoQztJQUNELElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDaEIsV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQy9DLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQzVDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO29CQUMzQyxnQkFBZ0IsQ0FDZCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFDeEQsU0FBUyxDQUFDLEtBQUssRUFDZixXQUFXLENBQ1osQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksQ0FBQyxtQkFBbUIsRUFBRTtRQUN4QixtQkFBbUIsR0FBRyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDM0MsUUFBUSxFQUFFO2dCQUNSLElBQUksb0JBQW9CLENBQUM7b0JBQ3ZCLGFBQWEsRUFBRTt3QkFDYixJQUFJLEVBQUUsT0FBTztxQkFDZDtvQkFDRCxtQkFBbUIsRUFBRTt3QkFDbkIsVUFBVSxFQUFFLFFBQVE7d0JBQ3BCLFFBQVEsRUFBRSxrQkFBa0I7d0JBQzVCLE1BQU0sRUFBRTs0QkFDTixPQUFPLEVBQUU7Z0NBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDO2dDQUN6QyxhQUFhO2dDQUNiLEdBQUcsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxNQUFNLENBQUMsQ0FBQyw0QkFBNEI7cUNBQy9DLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7cUNBQ3hDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQzs2QkFDMUI7NEJBQ0QsTUFBTSxFQUFFO2dDQUNOLGFBQWE7Z0NBQ2IsR0FBRyxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLE1BQU0sQ0FBQyxDQUFDLDRCQUE0QjtxQ0FDL0MsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0NBQ2QsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLFFBQVE7d0NBQUUsT0FBTyxJQUFJLENBQUM7b0NBQ3hDLE9BQU8sS0FBSyxDQUFDO2dDQUNmLENBQUMsQ0FBQztxQ0FDRCxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7NkJBQzFCOzRCQUNELE9BQU8sRUFBRTtnQ0FDUCxhQUFhO2dDQUNiLEdBQUcsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxNQUFNLENBQUMsQ0FBQyw0QkFBNEI7cUNBQy9DLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29DQUNkLElBQ0UsYUFBYTt3Q0FDYixHQUFHLENBQUMsS0FBSyxLQUFLLFNBQVM7d0NBQ3ZCLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDckQ7d0NBQ0EsT0FBTyxJQUFJLENBQUM7cUNBQ2I7b0NBQ0QsT0FBTyxLQUFLLENBQUM7Z0NBQ2YsQ0FBQyxDQUFDO3FDQUNELEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQzs2QkFDMUI7NEJBQ0QsSUFBSSxFQUFFO2dDQUNKLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZTtnQ0FDcEQsYUFBYTtnQ0FDYixHQUFHLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksTUFBTSxDQUFDLENBQUMsNEJBQTRCO3FDQUMvQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDO3FDQUNyQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7NkJBQzFCOzRCQUNELE9BQU8sRUFBRTtnQ0FDUCxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZTtnQ0FDOUMsYUFBYTtnQ0FDYixHQUFHLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksTUFBTSxDQUFDLENBQUMsNEJBQTRCO3FDQUMvQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO3FDQUN4QyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7NkJBQzFCOzRCQUNELElBQUksRUFBRTtnQ0FDSixHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCO2dDQUNyRCxhQUFhO2dDQUNiLEdBQUcsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxNQUFNLENBQUMsQ0FBQyw0QkFBNEI7cUNBQy9DLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUM7cUNBQ3JDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQzs2QkFDMUI7eUJBQ0Y7cUJBQ0Y7aUJBQ0YsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxpQkFBaUI7SUFDakIsT0FBTyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtRQUNqRCwyQkFBMkIsRUFBRSxLQUFLO0tBQ25DLENBQUMsQ0FBQztBQUNMLENBQUMifQ==