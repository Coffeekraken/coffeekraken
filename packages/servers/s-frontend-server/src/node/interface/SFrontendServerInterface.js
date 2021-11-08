// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SFrontendServerInterface
 * @namespace           s-frontend-server
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a frontend server process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SFrontendServerInterface extends __SInterface {
    static get _definition() {
        var _a;
        return {
            hostname: {
                type: 'String',
                alias: 'o',
                description: 'Server hostname',
                required: true,
                default: __SSugarConfig.get('frontendServer.hostname') ||
                    '127.0.0.1',
            },
            port: {
                type: 'Number',
                alias: 'p',
                description: 'Server port',
                default: __SSugarConfig.get('frontendServer.port') || 3000,
                level: 1,
            },
            rootDir: {
                type: 'String',
                description: 'Server root directory',
                default: __SSugarConfig.get('frontendServer.rootDir') ||
                    __packageRoot(process.cwd()),
                level: 1,
            },
            viewsDir: {
                type: 'String',
                description: 'Server views directory',
                default: __SSugarConfig.get('frontendServer.viewsDir') ||
                    __packageRoot(process.cwd()) + '/views',
            },
            logLevel: {
                type: 'String',
                description: 'Specify the log level you want for your server',
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
            prod: {
                type: 'Boolean',
                description: 'Specify that we want the server to act "like" a production one with compression etc...',
                default: false,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVySW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQUUsaUJBQWlCO2dCQUM5QixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQ0gsY0FBYyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDN0MsV0FBVzthQUNsQjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsSUFBSSxJQUFJO2dCQUMxRCxLQUFLLEVBQUUsQ0FBQzthQUNYO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSx1QkFBdUI7Z0JBQ3BDLE9BQU8sRUFDSCxjQUFjLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO29CQUM1QyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNoQyxLQUFLLEVBQUUsQ0FBQzthQUNYO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSx3QkFBd0I7Z0JBQ3JDLE9BQU8sRUFDSCxjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO29CQUM3QyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsUUFBUTthQUM5QztZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxNQUFNLEVBQUU7b0JBQ0osUUFBUTtvQkFDUixPQUFPO29CQUNQLE1BQU07b0JBQ04sT0FBTztvQkFDUCxNQUFNO29CQUNOLFNBQVM7b0JBQ1QsT0FBTztpQkFDVjtnQkFDRCxPQUFPLEVBQ0gsTUFBQSxjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLG1DQUFJLE1BQU07YUFDOUQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHdGQUF3RjtnQkFDNUYsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=