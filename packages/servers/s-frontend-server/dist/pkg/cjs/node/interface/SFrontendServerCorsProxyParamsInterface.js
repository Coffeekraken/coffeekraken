"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SFrontendServerCorsProxyParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a frontend cors proxy server process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SFrontendServerCorsProxyParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            port: {
                description: 'Specify the port on which to run the proxy',
                type: 'Number',
                default: s_sugar_config_1.default.get('frontendServer.corsProxy.port'),
            },
            targetUrlHeaderName: {
                description: 'Specifyheader name to use as the target url',
                type: 'String',
                default: s_sugar_config_1.default.get('frontendServer.corsProxy.targetUrlHeaderName'),
            },
            limit: {
                description: 'Specify the limit request size to process',
                type: 'String',
                default: s_sugar_config_1.default.get('frontendServer.corsProxy.limit'),
            },
        };
    }
}
exports.default = SFrontendServerCorsProxyParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUEwRDtBQUMxRCw0RUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQXFCLHVDQUF3QyxTQUFRLHFCQUFZO0lBQzdFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUFFLDRDQUE0QztnQkFDekQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDO2FBQy9EO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ2pCLFdBQVcsRUFBRSw2Q0FBNkM7Z0JBQzFELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FDdkIsOENBQThDLENBQ2pEO2FBQ0o7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO2FBQ2hFO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXRCRCwwREFzQkMifQ==