var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-config", "@coffeekraken/sugar/shared/is/node", "@coffeekraken/sugar/shared/path/packageRoot", "./registerFolder", "fs", "@coffeekraken/sugar/shared/sugar/sanitizeSugarJson"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLHNFQUErQztJQUMvQyw4RUFBMEQ7SUFDMUQsOEZBQXdFO0lBQ3hFLHNFQUFnRDtJQUNoRCw0Q0FBc0I7SUFDdEIsMkdBQXFGO0lBRXJGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsYUFBYTtJQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksTUFBTSxDQUFDLENBQUMsNEJBQTRCLEdBQUcsRUFBRSxDQUFDO0lBQ3JELElBQUksbUJBQW1CLENBQUM7SUFDeEIsSUFBSSxXQUFXLEVBQUUsY0FBYyxDQUFDO0lBRWhDLGtDQUFrQztJQUNsQywrQ0FBK0M7SUFDL0MsVUFBVTtJQUNWLElBQUk7SUFFSixTQUF3QixLQUFLLENBQUMsT0FBTztRQUNuQyxJQUFJLGNBQVEsRUFBRSxFQUFFO1lBQ2QsSUFBSSxhQUFhLENBQUM7WUFFbEIsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDbkIsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLHFCQUFhLEVBQUUsYUFBYSxDQUFDO2dCQUMxRCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsRUFBRTtvQkFDdEMsYUFBYSxHQUFHLDJCQUFtQixDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBQ2hFLElBQUksYUFBYSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQzt3QkFDaEUsYUFBYSxDQUFDLE9BQU8sR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbkQ7YUFDRjtpQkFBTTtnQkFDTCxhQUFhLEdBQUcsY0FBYyxDQUFDO2FBQ2hDO1lBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsTUFBTSxTQUFTLEdBQUcsT0FB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