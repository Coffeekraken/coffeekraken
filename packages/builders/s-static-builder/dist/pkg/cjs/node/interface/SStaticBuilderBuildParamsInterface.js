"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
                default: false,
                alias: 'p',
            },
        };
    }
}
exports.default = SStaticBuilderBuildParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQixrQ0FBbUMsU0FBUSxxQkFBWTtJQUN4RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUNyRDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsdUNBQXVDO2dCQUNwRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDdEQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQ3BEO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCxzRkFBc0Y7Z0JBQzFGLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsaUJBQWlCLEVBQUU7Z0JBQ2YsV0FBVyxFQUNQLG1KQUFtSjtnQkFDdkosSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLHFJQUFxSTtnQkFDekksSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQ3JEO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFBRSw4Q0FBOEM7Z0JBQzNELElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQzthQUMzRDtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQ1Asb0VBQW9FO2dCQUN4RSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7YUFDekQ7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUNQLG9FQUFvRTtnQkFDeEUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDO2FBQzlEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFDUCw4RUFBOEU7Z0JBQ2xGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQzthQUM1RDtZQUNELG1CQUFtQixFQUFFO2dCQUNqQixXQUFXLEVBQ1AsNkRBQTZEO2dCQUNqRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQ3ZCLG1DQUFtQyxDQUN0QzthQUNKO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCwyRUFBMkU7Z0JBQy9FLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzthQUN0RDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsaURBQWlEO2dCQUM5RCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQUUsMkNBQTJDO2dCQUN4RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWxHRCxxREFrR0MifQ==