"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_config_1 = __importDefault(require("@coffeekraken/s-config"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/shared/path/packageRoot"));
const registerFolder_1 = __importDefault(require("./registerFolder"));
const sanitizeSugarJson_1 = __importDefault(require("@coffeekraken/sugar/shared/sugar/sanitizeSugarJson"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const s_config_2 = require("@coffeekraken/s-config");
const sugarJson_1 = __importDefault(require("@coffeekraken/sugar/node/sugar/sugarJson"));
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
        _sugarJsons = sugarJson_1.default('*');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUErQztBQUUvQyw4RkFBd0U7QUFDeEUsc0VBQWdEO0FBQ2hELDJHQUFxRjtBQUNyRiw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLHFEQUE4RDtBQUM5RCx5RkFBaUU7QUFFakU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxhQUFhO0FBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxNQUFNLENBQUMsQ0FBQyw0QkFBNEIsR0FBRyxFQUFFLENBQUM7QUFDckQsSUFBSSxtQkFBbUIsQ0FBQztBQUN4QixJQUFJLFdBQVcsRUFBRSxjQUFjLENBQUM7QUFFaEMsU0FBd0IsS0FBSyxDQUFDLE9BQU87SUFDbkMsSUFBSSxhQUFhLENBQUM7SUFFbEIsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNuQixNQUFNLGlCQUFpQixHQUFHLEdBQUcscUJBQWEsRUFBRSxhQUFhLENBQUM7UUFDMUQsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDdEMsYUFBYSxHQUFHLDJCQUFtQixDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxhQUFhLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO2dCQUNoRSxhQUFhLENBQUMsT0FBTyxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25EO0tBQ0Y7U0FBTTtRQUNMLGFBQWEsR0FBRyxjQUFjLENBQUM7S0FDaEM7SUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2hCLFdBQVcsR0FBRyxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FB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