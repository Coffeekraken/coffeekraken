import __SConfig from '@coffeekraken/s-config';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __packageRoot from '@coffeekraken/sugar/shared/path/packageRoot';
import __registerFolder from './registerFolder';
import __fs from 'fs';
import __sanitizeSugarJson from '@coffeekraken/sugar/shared/sugar/sanitizeSugarJson';
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
// export function resolve(data) {
//   if (typeof data !== 'string') return data;
//   if ()
// }
export default function sugar(dotPath) {
    if (__isNode()) {
        let rootSugarJson;
        if (!_rootSugarJson) {
            const rootSugarJsonPath = `${__packageRoot()}/sugar.json`;
            if (__fs.existsSync(rootSugarJsonPath)) {
                rootSugarJson = __sanitizeSugarJson(require(rootSugarJsonPath));
                if (rootSugarJson.extends && !Array.isArray(rootSugarJson.extends))
                    rootSugarJson.extends = [rootSugarJson.extends];
            }
        }
        else {
            rootSugarJson = _rootSugarJson;
        }
        if (!_sugarJsons) {
            const sugarJson = require('@coffeekraken/sugar/node/sugar/sugarJson')
                .default;
            const __path = require('path');
            _sugarJsons = sugarJson('*');
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
            const __path = require('path'); // eslint-disable-line
            const { SConfigFolderAdapter } = require('@coffeekraken/s-config'); // eslint-disable-line
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb25maWcvcy1zdWdhci1jb25maWcvc3JjL3NoYXJlZC9zdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRCxPQUFPLGFBQWEsTUFBTSw2Q0FBNkMsQ0FBQztBQUN4RSxPQUFPLGdCQUFnQixNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLG1CQUFtQixNQUFNLG9EQUFvRCxDQUFDO0FBRXJGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsYUFBYTtBQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksTUFBTSxDQUFDLENBQUMsNEJBQTRCLEdBQUcsRUFBRSxDQUFDO0FBQ3JELElBQUksbUJBQW1CLENBQUM7QUFDeEIsSUFBSSxXQUFXLEVBQUUsY0FBYyxDQUFDO0FBRWhDLGtDQUFrQztBQUNsQywrQ0FBK0M7QUFDL0MsVUFBVTtBQUNWLElBQUk7QUFFSixNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxPQUFPO0lBQ25DLElBQUksUUFBUSxFQUFFLEVBQUU7UUFDZCxJQUFJLGFBQWEsQ0FBQztRQUVsQixJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ25CLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxhQUFhLEVBQUUsYUFBYSxDQUFDO1lBQzFELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUN0QyxhQUFhLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxhQUFhLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFD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