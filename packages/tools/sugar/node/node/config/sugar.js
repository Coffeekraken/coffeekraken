"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SConfig_1 = __importDefault(require("./SConfig"));
const SConfigFolderAdapter_1 = __importDefault(require("./adapters/SConfigFolderAdapter"));
const path_1 = __importDefault(require("path"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
/**
 * @name                  sugar
 * @namespace           sugar.node.config
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
 * import sugar from '@coffeekraken/sugar/node/config/sugar';
 * sugar('scss.unit'); // => rem
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let sugarConfigInstance;
function sugar(dotPath) {
    if (!sugarConfigInstance) {
        sugarConfigInstance = new SConfig_1.default('sugar', {
            adapters: [
                new SConfigFolderAdapter_1.default({
                    configAdapter: {
                        name: 'sugar'
                    },
                    configFolderAdapter: {
                        folderName: '.sugar',
                        fileName: '[name].config.js',
                        defaultConfigPath: path_1.default.resolve(__dirname, '../../config'),
                        appConfigPath: `${packageRoot_1.default(process.cwd())}/[foldername]`,
                        userConfigPath: `${packageRoot_1.default(process.cwd())}/.local/[foldername]`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9jb25maWcvc3VnYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsd0RBQWtDO0FBQ2xDLDJGQUFxRTtBQUNyRSxnREFBMEI7QUFDMUIsc0VBQWdEO0FBR2hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxJQUFJLG1CQUFtQixDQUFDO0FBRXhCLFNBQVMsS0FBSyxDQUFDLE9BQU87SUFDcEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1FBQ3hCLG1CQUFtQixHQUFHLElBQUksaUJBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDM0MsUUFBUSxFQUFFO2dCQUNSLElBQUksOEJBQXNCLENBQUM7b0JBQ3pCLGFBQWEsRUFBRTt3QkFDYixJQUFJLEVBQUUsT0FBTztxQkFDZDtvQkFDRCxtQkFBbUIsRUFBRTt3QkFDbkIsVUFBVSxFQUFFLFFBQVE7d0JBQ3BCLFFBQVEsRUFBRSxrQkFBa0I7d0JBQzVCLGlCQUFpQixFQUFFLGNBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQzt3QkFDNUQsYUFBYSxFQUFFLEdBQUcscUJBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZTt3QkFDN0QsY0FBYyxFQUFFLEdBQUcscUJBQWEsQ0FDOUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUNkLHNCQUFzQjtxQkFDeEI7aUJBQ0YsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxpQkFBaUI7SUFDakIsT0FBTyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtRQUNqRCwyQkFBMkIsRUFBRSxLQUFLO0tBQ25DLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxrQkFBZSxLQUFLLENBQUMifQ==