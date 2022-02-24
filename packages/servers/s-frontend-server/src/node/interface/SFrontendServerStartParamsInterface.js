// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SFrontendServerStartParamsInterface
 * @namespace           node.interface
 * @type.                      Class
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
        var _a;
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
                default: __SSugarConfig.get('frontendServer.port') || 3000,
                level: 1,
            },
            rootDir: {
                description: 'Server root directory',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.rootDir') ||
                    __packageRoot(process.cwd()),
                level: 1,
            },
            viewsDir: {
                description: 'Server views directory',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.viewsDir') ||
                    __packageRoot(process.cwd()) + '/views',
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
            prod: {
                description: 'Specify that we want the server to act "like" a production one with compression etc...',
                type: 'Boolean',
                default: false,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyU3RhcnRQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRlbmRTZXJ2ZXJTdGFydFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sbUNBQW9DLFNBQVEsWUFBWTtJQUN6RSxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsaUJBQWlCO2dCQUM5QixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQ0gsY0FBYyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDN0MsV0FBVzthQUNsQjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsSUFBSSxJQUFJO2dCQUMxRCxLQUFLLEVBQUUsQ0FBQzthQUNYO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFBRSx1QkFBdUI7Z0JBQ3BDLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFDSCxjQUFjLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO29CQUM1QyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNoQyxLQUFLLEVBQUUsQ0FBQzthQUNYO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSx3QkFBd0I7Z0JBQ3JDLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFDSCxjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO29CQUM3QyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsUUFBUTthQUM5QztZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUU7b0JBQ0osUUFBUTtvQkFDUixPQUFPO29CQUNQLE1BQU07b0JBQ04sT0FBTztvQkFDUCxNQUFNO29CQUNOLFNBQVM7b0JBQ1QsT0FBTztpQkFDVjtnQkFDRCxPQUFPLEVBQ0gsTUFBQSxjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLG1DQUFJLE1BQU07YUFDOUQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLHdGQUF3RjtnQkFDNUYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=