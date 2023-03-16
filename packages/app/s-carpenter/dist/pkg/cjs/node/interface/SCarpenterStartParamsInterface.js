"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 *
 * @name                SCarpenterStartParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to start a SCarpenter environment
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SCarpenterStartParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            port: {
                type: 'String',
                description: 'Specify the server port you want for your carpenter environment',
                default: s_sugar_config_1.default.get('carpenter.server.port'),
                alias: 'p',
            },
            vitePort: {
                type: 'String',
                description: 'Specify the vite server port you want when the "dev" mode is on',
                default: s_sugar_config_1.default.get('carpenter.vite.port'),
            },
            cssPath: {
                type: 'String',
                description: 'Specify the path to the main css entry point',
                required: true,
                default: '/dist/css/index.css',
            },
            jsPath: {
                type: 'String',
                description: 'Specify the path to the main js entry point',
                required: true,
                default: '/dist/js/index.esm.js',
            },
            dev: {
                type: 'Boolean',
                description: 'Specify if you want to launch carpenter in dev mode to work on it',
                default: false,
            },
        };
    }
}
exports.default = SCarpenterStartParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSw4QkFBK0IsU0FBUSxxQkFBWTtJQUNyRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxpRUFBaUU7Z0JBQ3JFLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDcEQsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsaUVBQWlFO2dCQUNyRSxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDckQ7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLDhDQUE4QztnQkFDM0QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLHFCQUFxQjthQUNqQztZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsNkNBQTZDO2dCQUMxRCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsdUJBQXVCO2FBQ25DO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxtRUFBbUU7Z0JBQ3ZFLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELGtCQUFlLDhCQUE4QixDQUFDIn0=