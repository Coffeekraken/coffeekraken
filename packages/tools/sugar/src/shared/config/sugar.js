"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUErQztBQUMvQyxzREFBa0M7QUFDbEMsc0VBQWdEO0FBQ2hELHNFQUFnRDtBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsYUFBYTtBQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksTUFBTSxDQUFDLENBQUMsNEJBQTRCLEdBQUcsRUFBRSxDQUFDO0FBQ3JELElBQUksbUJBQW1CLENBQUM7QUFDeEIsSUFBSSxXQUFXLENBQUM7QUFDaEIsU0FBd0IsS0FBSyxDQUFDLE9BQU87SUFDbkMsSUFBSSxjQUFRLEVBQUUsRUFBRTtRQUNkLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ2hFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQixXQUFXLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQy9DLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDekMsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO29CQUM1QyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTt3QkFDM0Msd0JBQWdCLENBQ2QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQ3hELFNBQVMsQ0FBQyxLQUFLLENBQ2hCLENBQUM7b0JBQ0osQ0FBQyxDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQ3hCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtZQUN0RCxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtZQUMxRixtQkFBbUIsR0FBRyxJQUFJLGtCQUFTLENBQUMsT0FBTyxFQUFFO2dCQUMzQyxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxvQkFBb0IsQ0FBQzt3QkFDdkIsYUFBYSxFQUFFOzRCQUNiLElBQUksRUFBRSxPQUFPO3lCQUNkO3dCQUNELG1CQUFtQixFQUFFOzRCQUNuQixVQUFVLEVBQUUsUUFBUTs0QkFDcEIsUUFBUSxFQUFFLGtCQUFrQjs0QkFDNUIsaUJBQWlCLEVBQUU7Z0NBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQztnQ0FDekMsYUFBYTtnQ0FDYixHQUFHLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksTUFBTSxDQUFDLENBQUMsNEJBQTRCO3FDQUMvQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO3FDQUN4QyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7NkJBQzFCOzRCQUNELGFBQWEsRUFBRTtnQ0FDYixHQUFHLHFCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWU7Z0NBQzlDLGFBQWE7Z0NBQ2IsR0FBRyxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLE1BQU0sQ0FBQyxDQUFDLDRCQUE0QjtxQ0FDL0MsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztxQ0FDcEMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDOzZCQUMxQjs0QkFDRCxjQUFjLEVBQUU7Z0NBQ2QsR0FBRyxxQkFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0I7Z0NBQ3JELGFBQWE7Z0NBQ2IsR0FBRyxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLE1BQU0sQ0FBQyxDQUFDLDRCQUE0QjtxQ0FDL0MsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQztxQ0FDckMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDOzZCQUMxQjt5QkFDRjtxQkFDRixDQUFDO2lCQUNIO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxpQkFBaUI7UUFDakIsT0FBTyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtZQUNqRCwyQkFBMkIsRUFBRSxLQUFLO1NBQ25DLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQztBQTlERCx3QkE4REMifQ==