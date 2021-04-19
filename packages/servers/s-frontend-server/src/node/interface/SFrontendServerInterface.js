"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class SFrontendServerInterface extends s_interface_1.default {
}
exports.default = SFrontendServerInterface;
SFrontendServerInterface.definition = {
    hostname: {
        type: 'String',
        alias: 'o',
        description: 'Server hostname',
        required: true,
        default: s_sugar_config_1.default('frontendServer.hostname') || '127.0.0.1'
    },
    port: {
        type: 'Number',
        alias: 'p',
        description: 'Server port',
        default: s_sugar_config_1.default('frontendServer.port') || 3000,
        level: 1
    },
    rootDir: {
        type: 'String',
        description: 'Server root directory',
        default: s_sugar_config_1.default('frontendServer.rootDir') || __packageRoot(process.cwd()),
        level: 1
    },
    viewsDir: {
        type: 'String',
        description: 'Server views directory',
        default: s_sugar_config_1.default('frontendServer.viewsDir') ||
            __packageRoot(process.cwd()) + '/views'
    },
    logLevel: {
        type: 'String',
        description: 'Specify the log level you want for your server',
        values: ['silent', 'error', 'warn', 'debug', 'info', 'verbose', 'silly'],
        default: (_a = s_sugar_config_1.default('frontendServer.logLevel')) !== null && _a !== void 0 ? _a : 'info'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVySW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCxrRkFBeUQ7QUFDekQsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBcUIsd0JBQXlCLFNBQVEscUJBQVk7O0FBQWxFLDJDQXFDQztBQXBDUSxtQ0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsaUJBQWlCO1FBQzlCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLHdCQUFhLENBQUMseUJBQXlCLENBQUMsSUFBSSxXQUFXO0tBQ2pFO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSxhQUFhO1FBQzFCLE9BQU8sRUFBRSx3QkFBYSxDQUFDLHFCQUFxQixDQUFDLElBQUksSUFBSTtRQUNyRCxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsdUJBQXVCO1FBQ3BDLE9BQU8sRUFDTCx3QkFBYSxDQUFDLHdCQUF3QixDQUFDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6RSxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsd0JBQXdCO1FBQ3JDLE9BQU8sRUFDTCx3QkFBYSxDQUFDLHlCQUF5QixDQUFDO1lBQ3hDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxRQUFRO0tBQzFDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsZ0RBQWdEO1FBQzdELE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQztRQUN4RSxPQUFPLEVBQUUsTUFBQSx3QkFBYSxDQUFDLHlCQUF5QixDQUFDLG1DQUFJLE1BQU07S0FDNUQ7Q0FDRixDQUFDIn0=