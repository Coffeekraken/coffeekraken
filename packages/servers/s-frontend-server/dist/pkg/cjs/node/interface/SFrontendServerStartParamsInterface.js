"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
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
class SFrontendServerStartParamsInterface extends s_interface_1.default {
    static get _definition() {
        var _a, _b;
        return {
            hostname: {
                description: 'Server hostname',
                type: 'String',
                alias: 'o',
                required: true,
                default: s_sugar_config_1.default.get('frontendServer.hostname') ||
                    '127.0.0.1',
            },
            port: {
                description: 'Server port',
                type: 'Number',
                alias: 'p',
                default: s_sugar_config_1.default.get('frontendServer.port') || 3000,
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
                default: s_sugar_config_1.default.get('frontendServer.rootDir'),
            },
            viewsDir: {
                description: 'Server views directory',
                type: 'String',
                default: s_sugar_config_1.default.get('frontendServer.viewsDir'),
            },
            pagesDir: {
                description: 'Server pages directory',
                type: 'String',
                default: s_sugar_config_1.default.get('frontendServer.pagesDir'),
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
                default: (_a = s_sugar_config_1.default.get('frontendServer.logLevel')) !== null && _a !== void 0 ? _a : 'info',
            },
            target: {
                description: 'Specify the target of the build. Can be "development" or "production"',
                values: ['development', 'production'],
                alias: 't',
                default: (_b = s_env_1.default.get('target')) !== null && _b !== void 0 ? _b : 'development',
            },
        };
    }
}
exports.default = SFrontendServerStartParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGdFQUF5QztBQUN6Qyw0RUFBcUQ7QUFDckQsa0ZBQTBEO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFxQixtQ0FBb0MsU0FBUSxxQkFBWTtJQUN6RSxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsaUJBQWlCO2dCQUM5QixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQ0gsd0JBQWMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7b0JBQzdDLFdBQVc7YUFDbEI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUFFLGFBQWE7Z0JBQzFCLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLElBQUk7YUFDN0Q7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLDZGQUE2RjtnQkFDakcsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLHVCQUF1QjtnQkFDcEMsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO2FBQ3hEO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSx3QkFBd0I7Z0JBQ3JDLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQzthQUN6RDtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsd0JBQXdCO2dCQUNyQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUM7YUFDekQ7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFO29CQUNKLFFBQVE7b0JBQ1IsT0FBTztvQkFDUCxNQUFNO29CQUNOLE9BQU87b0JBQ1AsTUFBTTtvQkFDTixTQUFTO29CQUNULE9BQU87aUJBQ1Y7Z0JBQ0QsT0FBTyxFQUNILE1BQUEsd0JBQWMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsbUNBQUksTUFBTTthQUM5RDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsdUVBQXVFO2dCQUMzRSxNQUFNLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDO2dCQUNyQyxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsTUFBQSxlQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxhQUFhO2FBQ2pEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWhFRCxzREFnRUMifQ==