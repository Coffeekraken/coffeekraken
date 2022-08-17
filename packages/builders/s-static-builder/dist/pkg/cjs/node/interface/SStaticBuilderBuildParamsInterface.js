"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
/**
 * @name                SStaticBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type.                      Class
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
            prod: {
                description: 'Shorthand to set a production ready build',
                type: 'Boolean',
                default: s_env_1.default.is('production'),
                alias: 'p',
            },
        };
    }
}
exports.default = SStaticBuilderBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUMxRCxnRUFBeUM7QUFFekM7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBcUIsa0NBQW1DLFNBQVEscUJBQVk7SUFDeEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDckQ7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLHVDQUF1QztnQkFDcEQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ3REO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUNwRDtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQ1Asc0ZBQXNGO2dCQUMxRixJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLFdBQVcsRUFDUCxtSkFBbUo7Z0JBQ3ZKLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxxSUFBcUk7Z0JBQ3pJLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUNyRDtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQUUsOENBQThDO2dCQUMzRCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7YUFDM0Q7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLG9FQUFvRTtnQkFDeEUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO2FBQ3pEO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFDUCxvRUFBb0U7Z0JBQ3hFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQzthQUM5RDtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1AsOEVBQThFO2dCQUNsRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUM7YUFDNUQ7WUFDRCxtQkFBbUIsRUFBRTtnQkFDakIsV0FBVyxFQUNQLDZEQUE2RDtnQkFDakUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUN2QixtQ0FBbUMsQ0FDdEM7YUFDSjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsMkVBQTJFO2dCQUMvRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDdEQ7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLGVBQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUNoQyxLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWxHRCxxREFrR0MifQ==