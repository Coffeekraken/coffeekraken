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
            const __SConfigFolderAdapter = require('../../node/config/adapters/SConfigFolderAdapter') // eslint-disable-line
                .default;
            sugarConfigInstance = new s_config_1.default('sugar', {
                adapters: [
                    new __SConfigFolderAdapter({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUErQztBQUMvQyxzREFBa0M7QUFDbEMsc0VBQWdEO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxJQUFJLG1CQUFtQixDQUFDO0FBQ3hCLFNBQXdCLEtBQUssQ0FBQyxPQUFPO0lBQ25DLElBQUksY0FBUSxFQUFFLEVBQUU7UUFDZCxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDeEIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1lBQ3RELE1BQU0sc0JBQXNCLEdBQUcsT0FBTyxDQUFDLGlEQUFpRCxDQUFDLENBQUMsc0JBQXNCO2lCQUM3RyxPQUFPLENBQUM7WUFDWCxtQkFBbUIsR0FBRyxJQUFJLGtCQUFTLENBQUMsT0FBTyxFQUFFO2dCQUMzQyxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxzQkFBc0IsQ0FBQzt3QkFDekIsYUFBYSxFQUFFOzRCQUNiLElBQUksRUFBRSxPQUFPO3lCQUNkO3dCQUNELG1CQUFtQixFQUFFOzRCQUNuQixVQUFVLEVBQUUsUUFBUTs0QkFDcEIsUUFBUSxFQUFFLGtCQUFrQjs0QkFDNUIsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDOzRCQUM1RCxhQUFhLEVBQUUsR0FBRyxxQkFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlOzRCQUM3RCxjQUFjLEVBQUUsR0FBRyxxQkFBYSxDQUM5QixPQUFPLENBQUMsR0FBRyxFQUFFLENBQ2Qsc0JBQXNCO3lCQUN4QjtxQkFDRixDQUFDO2lCQUNIO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxpQkFBaUI7UUFDakIsT0FBTyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtZQUNqRCwyQkFBMkIsRUFBRSxLQUFLO1NBQ25DLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQztBQTlCRCx3QkE4QkMifQ==