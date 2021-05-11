"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_config_1 = __importDefault(require("@coffeekraken/s-config"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const registerFolder_1 = __importDefault(require("./registerFolder"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const s_config_2 = require("@coffeekraken/s-config");
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
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
function sugar(dotPath) {
    let rootSugarJson;
    const sugarJson = new s_sugar_json_1.default();
    if (!_rootSugarJson) {
        const rootSugarJsonPath = `${packageRoot_1.default()}/sugar.json`;
        if (fs_1.default.existsSync(rootSugarJsonPath)) {
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
                    registerFolder_1.default(path_1.default.resolve(jsonObj.metas.folderPath, folderObj.path), folderObj.scope, packageName);
                });
            }
        });
    }
    if (!sugarConfigInstance) {
        sugarConfigInstance = new s_config_1.default('sugar', {
            adapters: [
                new s_config_2.SConfigFolderAdapter({
                    configAdapter: {
                        name: 'sugar'
                    },
                    configFolderAdapter: {
                        folderName: '.sugar',
                        fileName: '[name].config.js',
                        scopes: {
                            default: [
                                path_1.default.resolve(__dirname, '../../config'),
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
exports.default = sugar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUErQztBQUUvQyw0RkFBc0U7QUFDdEUsc0VBQWdEO0FBRWhELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIscURBQThEO0FBQzlELDhFQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILGFBQWE7QUFDYixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLE1BQU0sQ0FBQyxDQUFDLDRCQUE0QixHQUFHLEVBQUUsQ0FBQztBQUNyRCxJQUFJLG1CQUFtQixDQUFDO0FBQ3hCLElBQUksV0FBVyxFQUFFLGNBQWMsQ0FBQztBQUVoQyxTQUF3QixLQUFLLENBQUMsT0FBZTtJQUMzQyxJQUFJLGFBQWEsQ0FBQztJQUVsQixNQUFNLFNBQVMsR0FBRyxJQUFJLHNCQUFZLEVBQUUsQ0FBQztJQUVyQyxJQUFJLENBQUMsY0FBYyxFQUFFO1FBQ25CLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxxQkFBYSxFQUFFLGFBQWEsQ0FBQztRQUMxRCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUN0QyxhQUFhLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ25FLElBQUksYUFBYSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztnQkFDaEUsYUFBYSxDQUFDLE9BQU8sR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNuRDtLQUNGO1NBQU07UUFDTCxhQUFhLEdBQUcsY0FBYyxDQUFDO0tBQ2hDO0lBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNoQixXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLE1B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