"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
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
        default: sugar_1.default('frontendServer.hostname') || '127.0.0.1'
    },
    port: {
        type: 'Number',
        alias: 'p',
        description: 'Server port',
        default: sugar_1.default('frontendServer.port') || 3000,
        level: 1
    },
    rootDir: {
        type: 'String',
        description: 'Server root directory',
        default: sugar_1.default('frontendServer.rootDir') || __packageRoot(process.cwd()),
        level: 1
    },
    viewsDir: {
        type: 'String',
        description: 'Server views directory',
        default: sugar_1.default('frontendServer.viewsDir') ||
            __packageRoot(process.cwd()) + '/views'
    },
    logLevel: {
        type: 'String',
        description: 'Specify the log level you want for your server',
        values: ['silent', 'error', 'warn', 'debug', 'info', 'verbose', 'silly'],
        default: (_a = sugar_1.default('frontendServer.logLevel')) !== null && _a !== void 0 ? _a : 'info'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVySW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCxvRkFBb0U7QUFDcEUsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBcUIsd0JBQXlCLFNBQVEscUJBQVk7O0FBQWxFLDJDQXFDQztBQXBDUSxtQ0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsaUJBQWlCO1FBQzlCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLGVBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLFdBQVc7S0FDakU7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLGFBQWE7UUFDMUIsT0FBTyxFQUFFLGVBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLElBQUk7UUFDckQsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLHVCQUF1QjtRQUNwQyxPQUFPLEVBQ0wsZUFBYSxDQUFDLHdCQUF3QixDQUFDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6RSxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsd0JBQXdCO1FBQ3JDLE9BQU8sRUFDTCxlQUFhLENBQUMseUJBQXlCLENBQUM7WUFDeEMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLFFBQVE7S0FDMUM7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSxnREFBZ0Q7UUFDN0QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDO1FBQ3hFLE9BQU8sRUFBRSxNQUFBLGVBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxtQ0FBSSxNQUFNO0tBQzVEO0NBQ0YsQ0FBQyJ9