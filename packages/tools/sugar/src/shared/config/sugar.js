"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_config_1 = __importDefault(require("@coffeekraken/s-config"));
const node_1 = __importDefault(require("../is/node"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
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
let sugarConfigInstance;
function sugar(dotPath) {
    if (node_1.default()) {
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
                            defaultConfigPath: __path.resolve(__dirname, '../../config'),
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
}
exports.default = sugar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUErQztBQUMvQyxzREFBa0M7QUFDbEMsc0VBQWdEO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxJQUFJLG1CQUFtQixDQUFDO0FBQ3hCLFNBQXdCLEtBQUssQ0FBQyxPQUFPO0lBQ25DLElBQUksY0FBUSxFQUFFLEVBQUU7UUFDZCxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDeEIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1lBQ3RELE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1lBQzFGLG1CQUFtQixHQUFHLElBQUksa0JBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQzNDLFFBQVEsRUFBRTtvQkFDUixJQUFJLG9CQUFvQixDQUFDO3dCQUN2QixhQUFhLEVBQUU7NEJBQ2IsSUFBSSxFQUFFLE9BQU87eUJBQ2Q7d0JBQ0QsbUJBQW1CLEVBQUU7NEJBQ25CLFVBQVUsRUFBRSxRQUFROzRCQUNwQixRQUFRLEVBQUUsa0JBQWtCOzRCQUM1QixpQkFBaUIsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUM7NEJBQzVELGFBQWEsRUFBRSxHQUFHLHFCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWU7NEJBQzdELGNBQWMsRUFBRSxHQUFHLHFCQUFhLENBQzlCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FDZCxzQkFBc0I7eUJBQ3hCO3FCQUNGLENBQUM7aUJBQ0g7YUFDRixDQUFDLENBQUM7U0FDSjtRQUNELGlCQUFpQjtRQUNqQixPQUFPLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO1lBQ2pELDJCQUEyQixFQUFFLEtBQUs7U0FDbkMsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDO0FBN0JELHdCQTZCQyJ9