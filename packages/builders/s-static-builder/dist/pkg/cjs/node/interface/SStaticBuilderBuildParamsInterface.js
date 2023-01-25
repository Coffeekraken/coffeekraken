"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SStaticBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SStaticBuilder.build method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SStaticBuilderBuildParamsInterface extends s_interface_1.default {
    static get _definition() {
        var _a;
        return {
            input: {
                description: 'Specify the path to the input sitemap.xml file',
                type: 'String',
                required: true,
                alias: 'i',
                default: s_sugar_config_1.default.get('staticBuilder.input'),
            },
            outDir: {
                description: 'Specify the path to the output folder',
                type: 'String',
                alias: 'o',
                default: s_sugar_config_1.default.get('staticBuilder.outDir'),
            },
            host: {
                description: 'Specify the host on which to make the requests',
                type: 'String',
                alias: 'h',
                default: s_sugar_config_1.default.get('staticBuilder.host'),
            },
            fromErrors: {
                description: 'Specify if you want to build from the listed errors location in the errors.json file',
                type: 'Boolean',
                alias: 'e',
                default: false,
            },
            useFrontendServer: {
                description: 'Specify if the server is an SFrontendServer one so we can bypass the http requests and make use of the `server.request` method to speed things up',
                type: 'Boolean',
                alias: 'f',
                default: false,
            },
            clean: {
                description: 'Specify if you want to clean the past builds before rebuilding. THis would do the same as setting the "incremental" option to false',
                type: 'Boolean',
                alias: 'c',
                default: s_sugar_config_1.default.get('staticBuilder.clean'),
            },
            incremental: {
                description: 'Specify if you want to use incremental build',
                type: 'Boolean',
                alias: 'i',
                default: s_sugar_config_1.default.get('staticBuilder.incremental'),
            },
            failAfter: {
                description: 'Specify the number of authorized fails before stopping the process',
                type: 'Number',
                alias: 'f',
                default: s_sugar_config_1.default.get('staticBuilder.failAfter'),
            },
            requestTimeout: {
                description: 'Specify after how many ms a request has to be considered as failed',
                type: 'Number',
                alias: 't',
                default: s_sugar_config_1.default.get('staticBuilder.requestTimeout'),
            },
            requestRetry: {
                description: 'Specify the number of retry to do by request before considering it as failed',
                type: 'Number',
                default: s_sugar_config_1.default.get('staticBuilder.requestRetry'),
            },
            requestRetryTimeout: {
                description: 'Specify how many long the builder has to wait between tries',
                type: 'Number',
                default: s_sugar_config_1.default.get('staticBuilder.requestRetryTimeout'),
            },
            assets: {
                description: 'Specify some "assets" directories/files to copy into the static directory',
                type: 'Object',
                alias: 'a',
                default: s_sugar_config_1.default.get('staticBuilder.assets'),
            },
            minify: {
                description: 'Specify if you want to minify the output or not',
                type: 'Boolean',
                alias: 'm',
                default: false,
            },
            target: {
                description: 'Specify the target of the build. Can be "development" or "production"',
                values: ['development', 'production'],
                alias: 't',
                default: (_a = s_env_1.default.get('target')) !== null && _a !== void 0 ? _a : 'development',
            },
        };
    }
}
exports.default = SStaticBuilderBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBcUIsa0NBQW1DLFNBQVEscUJBQVk7SUFDeEUsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQ3JEO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSx1Q0FBdUM7Z0JBQ3BELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzthQUN0RDtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDcEQ7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUNQLHNGQUFzRjtnQkFDMUYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixXQUFXLEVBQ1AsbUpBQW1KO2dCQUN2SixJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AscUlBQXFJO2dCQUN6SSxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDckQ7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLDhDQUE4QztnQkFDM0QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDO2FBQzNEO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxvRUFBb0U7Z0JBQ3hFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQzthQUN6RDtZQUNELGNBQWMsRUFBRTtnQkFDWixXQUFXLEVBQ1Asb0VBQW9FO2dCQUN4RSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUM7YUFDOUQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLDhFQUE4RTtnQkFDbEYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDO2FBQzVEO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ2pCLFdBQVcsRUFDUCw2REFBNkQ7Z0JBQ2pFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FDdkIsbUNBQW1DLENBQ3RDO2FBQ0o7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLDJFQUEyRTtnQkFDL0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ3REO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCx1RUFBdUU7Z0JBQzNFLE1BQU0sRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUM7Z0JBQ3JDLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxNQUFBLGVBQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLG1DQUFJLGFBQWE7YUFDakQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBbkdELHFEQW1HQyJ9