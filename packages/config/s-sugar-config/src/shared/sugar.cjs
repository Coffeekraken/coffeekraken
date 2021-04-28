"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_config_1 = __importDefault(require("@coffeekraken/s-config"));
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/shared/path/packageRoot"));
const registerFolder_1 = __importDefault(require("./registerFolder"));
const fs_1 = __importDefault(require("fs"));
const sanitizeSugarJson_1 = __importDefault(require("@coffeekraken/sugar/shared/sugar/sanitizeSugarJson"));
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
function sugar(dotPath) {
    if (node_1.default()) {
        let rootSugarJson;
        if (!_rootSugarJson) {
            const rootSugarJsonPath = `${packageRoot_1.default()}/sugar.json`;
            if (fs_1.default.existsSync(rootSugarJsonPath)) {
                rootSugarJson = sanitizeSugarJson_1.default(require(rootSugarJsonPath));
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
                        registerFolder_1.default(__path.resolve(jsonObj.metas.folderPath, folderObj.path), folderObj.scope, packageName);
                    });
                }
            });
        }
        if (!sugarConfigInstance) {
            const __path = require('path'); // eslint-disable-line
            const { SConfigFolderAdapter } = require('@coffeekraken/s-config'); // eslint-disable-line
            sugarConfigInstance = new s_config_1.default('sugar', {
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
                                    `${packageRoot_1.default(process.cwd(), true)}/[folderName]`,
                                    // @ts-ignore
                                    ...(global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths
                                        .filter((obj) => obj.scope === 'repo')
                                        .map((obj) => obj.path)
                                ],
                                package: [
                                    `${packageRoot_1.default(process.cwd())}/[folderName]`,
                                    // @ts-ignore
                                    ...(global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths
                                        .filter((obj) => obj.scope === 'package')
                                        .map((obj) => obj.path)
                                ],
                                user: [
                                    `${packageRoot_1.default(process.cwd())}/.local/[folderName]`,
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
exports.default = sugar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb25maWcvcy1zdWdhci1jb25maWcvc3JjL3NoYXJlZC9zdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUErQztBQUMvQyw4RUFBMEQ7QUFDMUQsOEZBQXdFO0FBQ3hFLHNFQUFnRDtBQUNoRCw0Q0FBc0I7QUFDdEIsMkdBQXFGO0FBRXJGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsYUFBYTtBQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksTUFBTSxDQUFDLENBQUMsNEJBQTRCLEdBQUcsRUFBRSxDQUFDO0FBQ3JELElBQUksbUJBQW1CLENBQUM7QUFDeEIsSUFBSSxXQUFXLEVBQUUsY0FBYyxDQUFDO0FBRWhDLGtDQUFrQztBQUNsQywrQ0FBK0M7QUFDL0MsVUFBVTtBQUNWLElBQUk7QUFFSixTQUF3QixLQUFLLENBQUMsT0FBTztJQUNuQyxJQUFJLGNBQVEsRUFBRSxFQUFFO1FBQ2QsSUFBSSxhQUFhLENBQUM7UUFFbEIsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNuQixNQUFNLGlCQUFpQixHQUFHLEdBQUcscUJBQWEsRUFBRSxhQUFhLENBQUM7WUFDMUQsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBQ3RDLGFBQWEsR0FBRywyQkFBbUIsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLGFBQWEsQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7b0JBQ2hFLGFBQWEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbkQ7U0FDRjthQUFNO1lBQ0wsYUFBYSxHQUFHLGNBQWMsQ0FBQztT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