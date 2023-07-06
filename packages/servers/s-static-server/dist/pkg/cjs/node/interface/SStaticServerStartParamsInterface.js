"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SStaticServerStartParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a static server process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SStaticServerStartParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            hostname: {
                description: 'Server hostname',
                type: 'String',
                alias: 'o',
                required: true,
                default: s_sugar_config_1.default.get('staticServer.hostname') || '127.0.0.1',
            },
            port: {
                description: 'Server port',
                type: 'Number',
                alias: 'p',
                default: s_sugar_config_1.default.get('staticServer.port') || 8080,
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
                default: s_sugar_config_1.default.get('staticServer.rootDir'),
            },
        };
    }
}
exports.default = SStaticServerStartParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQXFCLGlDQUFrQyxTQUFRLHFCQUFZO0lBQ3ZFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLGlCQUFpQjtnQkFDOUIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUNILHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLElBQUksV0FBVzthQUNqRTtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLElBQUksSUFBSTthQUMzRDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsNkZBQTZGO2dCQUNqRyxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQUUsdUJBQXVCO2dCQUNwQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDdEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBL0JELG9EQStCQyJ9