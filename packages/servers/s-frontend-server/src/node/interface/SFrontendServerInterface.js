// @ts-nocheck
var _a;
import __sugarConfig from '@coffeekraken/s-sugar-config';
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
}
SFrontendServerInterface.definition = {
    hostname: {
        type: 'String',
        alias: 'o',
        description: 'Server hostname',
        required: true,
        default: __sugarConfig('frontendServer.hostname') || '127.0.0.1'
    },
    port: {
        type: 'Number',
        alias: 'p',
        description: 'Server port',
        default: __sugarConfig('frontendServer.port') || 3000,
        level: 1
    },
    rootDir: {
        type: 'String',
        description: 'Server root directory',
        default: __sugarConfig('frontendServer.rootDir') || __packageRoot(process.cwd()),
        level: 1
    },
    viewsDir: {
        type: 'String',
        description: 'Server views directory',
        default: __sugarConfig('frontendServer.viewsDir') ||
            __packageRoot(process.cwd()) + '/views'
    },
    logLevel: {
        type: 'String',
        description: 'Specify the log level you want for your server',
        values: ['silent', 'error', 'warn', 'debug', 'info', 'verbose', 'silly'],
        default: (_a = __sugarConfig('frontendServer.logLevel')) !== null && _a !== void 0 ? _a : 'info'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVySW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7O0FBRWQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLHdCQUF5QixTQUFRLFlBQVk7O0FBQ3pELG1DQUFVLEdBQUc7SUFDbEIsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSxpQkFBaUI7UUFDOUIsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsYUFBYSxDQUFDLHlCQUF5QixDQUFDLElBQUksV0FBVztLQUNqRTtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsYUFBYTtRQUMxQixPQUFPLEVBQUUsYUFBYSxDQUFDLHFCQUFxQixDQUFDLElBQUksSUFBSTtRQUNyRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsdUJBQXVCO1FBQ3BDLE9BQU8sRUFDTCxhQUFhLENBQUMsd0JBQXdCLENBQUMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pFLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSx3QkFBd0I7UUFDckMsT0FBTyxFQUNMLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQztZQUN4QyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsUUFBUTtLQUMxQztJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLGdEQUFnRDtRQUM3RCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUM7UUFDeEUsT0FBTyxFQUFFLE1BQUEsYUFBYSxDQUFDLHlCQUF5QixDQUFDLG1DQUFJLE1BQU07S0FDNUQ7Q0FDRixDQUFDIn0=