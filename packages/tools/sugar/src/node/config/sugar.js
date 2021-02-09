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
                    name: 'sugar',
                    foldername: '.sugar',
                    filename: '[name].config.js',
                    defaultConfigPath: path_1.default.resolve(__dirname, '../../../.sugar-default'),
                    appConfigPath: `${packageRoot_1.default(process.cwd())}/[foldername]`,
                    userConfigPath: `${packageRoot_1.default(process.cwd())}/.local/[foldername]`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx3REFBa0M7QUFDbEMsMkZBQXFFO0FBQ3JFLGdEQUEwQjtBQUMxQixzRUFBZ0Q7QUFHaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILElBQUksbUJBQW1CLENBQUM7QUFFeEIsU0FBUyxLQUFLLENBQUMsT0FBTztJQUNwQixJQUFJLENBQUMsbUJBQW1CLEVBQUU7UUFDeEIsbUJBQW1CLEdBQUcsSUFBSSxpQkFBUyxDQUFDLE9BQU8sRUFBRTtZQUMzQyxRQUFRLEVBQUU7Z0JBQ1IsSUFBSSw4QkFBc0IsQ0FBQztvQkFDekIsSUFBSSxFQUFFLE9BQU87b0JBQ2IsVUFBVSxFQUFFLFFBQVE7b0JBQ3BCLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLGlCQUFpQixFQUFFLGNBQU0sQ0FBQyxPQUFPLENBQy9CLFNBQVMsRUFDVCx5QkFBeUIsQ0FDMUI7b0JBQ0QsYUFBYSxFQUFFLEdBQUcscUJBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZTtvQkFDN0QsY0FBYyxFQUFFLEdBQUcscUJBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQXNCO2lCQUN0RSxDQUFDO2FBQ0g7U0FDRixDQUFDLENBQUM7S0FDSjtJQUNELGlCQUFpQjtJQUNqQixPQUFPLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO1FBQ2pELDJCQUEyQixFQUFFLEtBQUs7S0FDbkMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGtCQUFlLEtBQUssQ0FBQyJ9