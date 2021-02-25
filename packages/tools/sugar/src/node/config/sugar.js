// @ts-nocheck
import __SConfig from './SConfig';
import __SConfigFolderAdapter from './adapters/SConfigFolderAdapter';
import __path from 'path';
import __packageRoot from '../path/packageRoot';
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
        sugarConfigInstance = new __SConfig('sugar', {
            adapters: [
                new __SConfigFolderAdapter({
                    configAdapter: {
                        name: 'sugar'
                    },
                    configFolderAdapter: {
                        folderName: '.sugar',
                        fileName: '[name].config.js',
                        defaultConfigPath: __path.resolve(__dirname, '../../config'),
                        appConfigPath: `${__packageRoot(process.cwd())}/[foldername]`,
                        userConfigPath: `${__packageRoot(process.cwd())}/.local/[foldername]`
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
export default sugar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxTQUFTLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sc0JBQXNCLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBR2hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxJQUFJLG1CQUFtQixDQUFDO0FBRXhCLFNBQVMsS0FBSyxDQUFDLE9BQU87SUFDcEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1FBQ3hCLG1CQUFtQixHQUFHLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUMzQyxRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxzQkFBc0IsQ0FBQztvQkFDekIsYUFBYSxFQUFFO3dCQUNiLElBQUksRUFBRSxPQUFPO3FCQUNkO29CQUNELG1CQUFtQixFQUFFO3dCQUNuQixVQUFVLEVBQUUsUUFBUTt3QkFDcEIsUUFBUSxFQUFFLGtCQUFrQjt3QkFDNUIsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDO3dCQUM1RCxhQUFhLEVBQUUsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWU7d0JBQzdELGNBQWMsRUFBRSxHQUFHLGFBQWEsQ0FDOUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUNkLHNCQUFzQjtxQkFDeEI7aUJBQ0YsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxpQkFBaUI7SUFDakIsT0FBTyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtRQUNqRCwyQkFBMkIsRUFBRSxLQUFLO0tBQ25DLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxlQUFlLEtBQUssQ0FBQyJ9