// @ts-nocheck
import __SEnv from '@coffeekraken/s-env';
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SFrontendServerStartParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a frontend server process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFrontendServerStartParamsInterface extends __SInterface {
    static get _definition() {
        var _a, _b;
        return {
            hostname: {
                description: 'Server hostname',
                type: 'String',
                alias: 'o',
                required: true,
                default: __SSugarConfig.get('frontendServer.hostname') ||
                    '127.0.0.1',
            },
            port: {
                description: 'Server port',
                type: 'Number',
                alias: 'p',
                default: __SSugarConfig.get('frontendServer.port') || 8080,
            },
            listen: {
                description: 'Specify if you want the server to listen on specified hostname and port for requests or not',
                type: 'Boolean',
                alias: 'l',
                default: true,
            },
            rootDir: {
                description: 'Server root directory',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.rootDir'),
            },
            viewsDir: {
                description: 'Server views directory',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.viewsDir'),
            },
            pagesDir: {
                description: 'Server pages directory',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.pagesDir'),
            },
            logLevel: {
                description: 'Specify the log level you want for your server',
                type: 'String',
                values: [
                    'silent',
                    'error',
                    'warn',
                    'debug',
                    'info',
                    'verbose',
                    'silly',
                ],
                default: (_a = __SSugarConfig.get('frontendServer.logLevel')) !== null && _a !== void 0 ? _a : 'info',
            },
            target: {
                description: 'Specify the target of the build. Can be "development" or "production"',
                values: ['development', 'production'],
                alias: 't',
                default: (_b = __SEnv.get('target')) !== null && _b !== void 0 ? _b : 'development',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQ0FBb0MsU0FBUSxZQUFZO0lBQ3pFLE1BQU0sS0FBSyxXQUFXOztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFDSCxjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO29CQUM3QyxXQUFXO2FBQ2xCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLElBQUk7YUFDN0Q7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLDZGQUE2RjtnQkFDakcsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLHVCQUF1QjtnQkFDcEMsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDeEQ7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLHdCQUF3QjtnQkFDckMsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7YUFDekQ7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLHdCQUF3QjtnQkFDckMsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7YUFDekQ7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFO29CQUNKLFFBQVE7b0JBQ1IsT0FBTztvQkFDUCxNQUFNO29CQUNOLE9BQU87b0JBQ1AsTUFBTTtvQkFDTixTQUFTO29CQUNULE9BQU87aUJBQ1Y7Z0JBQ0QsT0FBTyxFQUNILE1BQUEsY0FBYyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxtQ0FBSSxNQUFNO2FBQzlEO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCx1RUFBdUU7Z0JBQzNFLE1BQU0sRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUM7Z0JBQ3JDLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxNQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLG1DQUFJLGFBQWE7YUFDakQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=