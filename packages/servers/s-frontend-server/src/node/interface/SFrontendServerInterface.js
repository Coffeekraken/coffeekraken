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
    static get definition() {
        var _a, _b;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
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
                default: (_b = __SSugarConfig.get('frontendServer.logLevel')) !== null && _b !== void 0 ? _b : 'info',
            },
            prod: {
                type: 'Boolean',
                description: 'Specify that we want the server to act "like" a production one with compression etc...',
                default: false,
            },
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVySW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssVUFBVTs7UUFDakIsT0FBTyxDQUNILE1BQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxtQ0FDYixJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ1AsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFBRSxpQkFBaUI7Z0JBQzlCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFDSCxjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO29CQUM3QyxXQUFXO2FBQ2xCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLElBQUk7Z0JBQzFELEtBQUssRUFBRSxDQUFDO2FBQ1g7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLHVCQUF1QjtnQkFDcEMsT0FBTyxFQUNILGNBQWMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7b0JBQzVDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ2hDLEtBQUssRUFBRSxDQUFDO2FBQ1g7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLHdCQUF3QjtnQkFDckMsT0FBTyxFQUNILGNBQWMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7b0JBQzdDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxRQUFRO2FBQzlDO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxnREFBZ0Q7Z0JBQ3BELE1BQU0sRUFBRTtvQkFDSixRQUFRO29CQUNSLE9BQU87b0JBQ1AsTUFBTTtvQkFDTixPQUFPO29CQUNQLE1BQU07b0JBQ04sU0FBUztvQkFDVCxPQUFPO2lCQUNWO2dCQUNELE9BQU8sRUFDSCxNQUFBLGNBQWMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsbUNBQUksTUFBTTthQUM5RDtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1Asd0ZBQXdGO2dCQUM1RixPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztDQUNKIn0=