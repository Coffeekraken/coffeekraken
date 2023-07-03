import __SEnv from '@coffeekraken/s-env';
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
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
export default class SStaticBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        var _a;
        return {
            input: {
                description: 'Specify the path to the input sitemap.xml file',
                type: 'String',
                required: true,
                alias: 'i',
                default: __SSugarConfig.get('staticBuilder.input'),
            },
            outDir: {
                description: 'Specify the path to the output folder',
                type: 'String',
                alias: 'o',
                default: __SSugarConfig.get('staticBuilder.outDir'),
            },
            host: {
                description: 'Specify the host on which to make the requests',
                type: 'String',
                alias: 'h',
                default: __SSugarConfig.get('staticBuilder.host'),
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
                default: __SSugarConfig.get('staticBuilder.clean'),
            },
            incremental: {
                description: 'Specify if you want to use incremental build',
                type: 'Boolean',
                alias: 'i',
                default: __SSugarConfig.get('staticBuilder.incremental'),
            },
            failAfter: {
                description: 'Specify the number of authorized fails before stopping the process',
                type: 'Number',
                alias: 'f',
                default: __SSugarConfig.get('staticBuilder.failAfter'),
            },
            requestTimeout: {
                description: 'Specify after how many ms a request has to be considered as failed',
                type: 'Number',
                alias: 't',
                default: __SSugarConfig.get('staticBuilder.requestTimeout'),
            },
            requestRetry: {
                description: 'Specify the number of retry to do by request before considering it as failed',
                type: 'Number',
                default: __SSugarConfig.get('staticBuilder.requestRetry'),
            },
            requestRetryTimeout: {
                description: 'Specify how many long the builder has to wait between tries',
                type: 'Number',
                default: __SSugarConfig.get('staticBuilder.requestRetryTimeout'),
            },
            assets: {
                description: 'Specify some "assets" directories/files to copy into the static directory',
                type: 'Object',
                alias: 'a',
                default: __SSugarConfig.get('staticBuilder.assets'),
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
                default: (_a = __SEnv.get('target')) !== null && _a !== void 0 ? _a : 'development',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0NBQW1DLFNBQVEsWUFBWTtJQUN4RSxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUNyRDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsdUNBQXVDO2dCQUNwRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzthQUN0RDtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUNwRDtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQ1Asc0ZBQXNGO2dCQUMxRixJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLFdBQVcsRUFDUCxtSkFBbUo7Z0JBQ3ZKLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxxSUFBcUk7Z0JBQ3pJLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQ3JEO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFBRSw4Q0FBOEM7Z0JBQzNELElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDO2FBQzNEO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxvRUFBb0U7Z0JBQ3hFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO2FBQ3pEO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFDUCxvRUFBb0U7Z0JBQ3hFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDO2FBQzlEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFDUCw4RUFBOEU7Z0JBQ2xGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDO2FBQzVEO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ2pCLFdBQVcsRUFDUCw2REFBNkQ7Z0JBQ2pFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUN2QixtQ0FBbUMsQ0FDdEM7YUFDSjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsMkVBQTJFO2dCQUMvRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzthQUN0RDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsaURBQWlEO2dCQUM5RCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsdUVBQXVFO2dCQUMzRSxNQUFNLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDO2dCQUNyQyxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsTUFBQSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxhQUFhO2FBQ2pEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9