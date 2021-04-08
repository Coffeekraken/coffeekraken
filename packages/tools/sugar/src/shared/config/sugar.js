var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-config", "../is/node", "../path/packageRoot", "./registerFolder"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_config_1 = __importDefault(require("@coffeekraken/s-config"));
    const node_1 = __importDefault(require("../is/node"));
    const packageRoot_1 = __importDefault(require("../path/packageRoot"));
    const registerFolder_1 = __importDefault(require("./registerFolder"));
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
    let _sugarJsons;
    function sugar(dotPath) {
        if (node_1.default()) {
            if (!_sugarJsons) {
                const sugarJson = require('../../node/sugar/sugarJson').default;
                const __path = require('path');
                _sugarJsons = sugarJson('*');
                Object.keys(_sugarJsons).forEach((packageName) => {
                    const jsonObj = _sugarJsons[packageName];
                    if (jsonObj.config && jsonObj.config.folders) {
                        jsonObj.config.folders.forEach((folderObj) => {
                            registerFolder_1.default(__path.resolve(jsonObj.metas.folderPath, folderObj.path), folderObj.level);
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
                                defaultConfigPath: [
                                    __path.resolve(__dirname, '../../config'),
                                    // @ts-ignore
                                    ...(global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths
                                        .filter((obj) => obj.level === 'default')
                                        .map((obj) => obj.path)
                                ],
                                appConfigPath: [
                                    `${packageRoot_1.default(process.cwd())}/[folderName]`,
                                    // @ts-ignore
                                    ...(global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths
                                        .filter((obj) => obj.level === 'app')
                                        .map((obj) => obj.path)
                                ],
                                userConfigPath: [
                                    `${packageRoot_1.default(process.cwd())}/.local/[folderName]`,
                                    // @ts-ignore
                                    ...(global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths
                                        .filter((obj) => obj.level === 'user')
                                        .map((obj) => obj.path)
                                ]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLHNFQUErQztJQUMvQyxzREFBa0M7SUFDbEMsc0VBQWdEO0lBQ2hELHNFQUFnRDtJQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsYUFBYTtJQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksTUFBTSxDQUFDLENBQUMsNEJBQTRCLEdBQUcsRUFBRSxDQUFDO0lBQ3JELElBQUksbUJBQW1CLENBQUM7SUFDeEIsSUFBSSxXQUFXLENBQUM7SUFDaEIsU0FBd0IsS0FBSyxDQUFDLE9BQU87UUFDbkMsSUFBSSxjQUFRLEVBQUUsRUFBRTtZQUNkLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDaEUsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixXQUFXLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO29CQUMvQyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3pDLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTt3QkFDNUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7NEJBQzNDLHdCQUFnQixDQUNkLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUN4RCxTQUFTLENBQUMsS0FBSyxDQUNoQixDQUFDO3dCQUNKLENBQUMsQ0FBQyxDQUFDO3FCQUNKO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQ3hCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtnQkFDdEQsTUFBTSxFQUFFLG9CQUFvQixFQUFFLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxzQkFBc0I7Z0JBQzFGLG1CQUFtQixHQUFHLElBQUksa0JBQVMsQ0FBQyxPQUFPLEVBQUU7b0JBQzNDLFFBQVEsRUFBRTt3QkFDUixJQUFJLG9CQUFvQixDQUFDOzRCQUN2QixhQUFhLEVBQUU7Z0NBQ2IsSUFBSSxFQUFFLE9BQU87NkJBQ2Q7NEJBQ0QsbUJBQW1CLEVBQUU7Z0NBQ25CLFVBQVUsRUFBRSxRQUFRO2dDQUNwQixRQUFRLEVBQUUsa0JBQWtCO2dDQUM1QixpQkFBaUIsRUFBRTtvQ0FDakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDO29DQUN6QyxhQUFhO29DQUNiLEdBQUcsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxNQUFNLENBQUMsQ0FBQyw0QkFBNEI7eUNBQy9DLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7eUNBQ3hDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztpQ0FDMUI7Z0NBQ0QsYUFBYSxFQUFFO29DQUNiLEdBQUcscUJBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZTtvQ0FDOUMsYUFBYTtvQ0FDYixHQUFHLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksTUFBTSxDQUFDLENBQUMsNEJBQTRCO3lDQUMvQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO3lDQUNwQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7aUNBQzFCO2dDQUNELGNBQWMsRUFBRTtvQ0FDZCxHQUFHLHFCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFzQjtvQ0FDckQsYUFBYTtvQ0FDYixHQUFHLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksTUFBTSxDQUFDLENBQUMsNEJBQTRCO3lDQUMvQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDO3lDQUNyQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7aUNBQzFCOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7WUFDRCxpQkFBaUI7WUFDakIsT0FBTyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtnQkFDakQsMkJBQTJCLEVBQUUsS0FBSzthQUNuQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUE5REQsd0JBOERDIn0=