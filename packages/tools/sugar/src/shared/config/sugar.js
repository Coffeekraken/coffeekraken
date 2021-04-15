var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-config", "../is/node", "../path/packageRoot", "./registerFolder", "fs", "../sugar/sanitizeSugarJson"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLHNFQUErQztJQUMvQyxzREFBa0M7SUFDbEMsc0VBQWdEO0lBQ2hELHNFQUFnRDtJQUNoRCw0Q0FBc0I7SUFDdEIsbUZBQTZEO0lBRTdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsYUFBYTtJQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksTUFBTSxDQUFDLENBQUMsNEJBQTRCLEdBQUcsRUFBRSxDQUFDO0lBQ3JELElBQUksbUJBQW1CLENBQUM7SUFDeEIsSUFBSSxXQUFXLEVBQUUsY0FBYyxDQUFDO0lBRWhDLGtDQUFrQztJQUNsQywrQ0FBK0M7SUFDL0MsVUFBVTtJQUNWLElBQUk7SUFFSixTQUF3QixLQUFLLENBQUMsT0FBTztRQUNuQyxJQUFJLGNBQVEsRUFBRSxFQUFFO1lBQ2QsSUFBSSxhQUFhLENBQUM7WUFFbEIsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDbkIsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLHFCQUFhLEVBQUUsYUFBYSxDQUFDO2dCQUMxRCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsRUFBRTtvQkFDdEMsYUFBYSxHQUFHLDJCQUFtQixDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBQ2hFLElBQUksYUFBYSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQzt3QkFDaEUsYUFBYSxDQUFDLE9BQU8sR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbkQ7YUFDRjtpQkFBTTtnQkFDTCxhQUFhLEdBQUcsY0FBYyxDQUFDO2FBQ2hDO1lBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsTUFBTSxTQUFTLEdBQUcsT0FB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