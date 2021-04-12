"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_config_1 = __importDefault(require("@coffeekraken/s-config"));
const node_1 = __importDefault(require("../is/node"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const registerFolder_1 = __importDefault(require("./registerFolder"));
const fs_1 = __importDefault(require("fs"));
const sanitizeSugarJson_1 = __importDefault(require("../sugar/sanitizeSugarJson"));
/**
 * @name                  sugar
 * @namespace           sugar.shared.config
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
 * import sugar from '@coffeekraken/sugar/shared/config/sugar';
 * sugar('scss.unit'); // => rem
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
(global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths = [];
let sugarConfigInstance;
let _sugarJsons, _rootSugarJson;
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
            const sugarJson = require('../../node/sugar/sugarJson').default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUErQztBQUMvQyxzREFBa0M7QUFDbEMsc0VBQWdEO0FBQ2hELHNFQUFnRDtBQUNoRCw0Q0FBc0I7QUFDdEIsbUZBQTZEO0FBRTdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsYUFBYTtBQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksTUFBTSxDQUFDLENBQUMsNEJBQTRCLEdBQUcsRUFBRSxDQUFDO0FBQ3JELElBQUksbUJBQW1CLENBQUM7QUFDeEIsSUFBSSxXQUFXLEVBQUUsY0FBYyxDQUFDO0FBQ2hDLFNBQXdCLEtBQUssQ0FBQyxPQUFPO0lBQ25DLElBQUksY0FBUSxFQUFFLEVBQUU7UUFDZCxJQUFJLGFBQWEsQ0FBQztRQUVsQixJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ25CLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxxQkFBYSxFQUFFLGFBQWEsQ0FBQztZQUMxRCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDdEMsYUFBYSxHQUFHLDJCQUFtQixDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLElBQUksYUFBYSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztvQkFDaEUsYUFBYSxDQUFDLE9BQU8sR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNuRDtTQUNGO2FBQU07WUFDTCxhQUFhLEdBQUcsY0FBYyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDaEUsTUFBTSxNQUFNLEdBQUcsT0FBTyxD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