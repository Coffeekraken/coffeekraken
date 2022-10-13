"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SMitosisStartParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to start a mitosis env and build component using the SMitosis class.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SMitosisStartParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            targets: {
                type: 'String[]',
                description: 'Specify the targets you want for your build',
                default: ['webcomponent', 'react'],
                values: ['webcomponent', 'react'],
            },
            port: {
                type: 'String',
                description: 'Specify the server port you want for your mitosis environment',
                default: s_sugar_config_1.default.get('mitosis.vite.server.port'),
            },
        };
    }
}
exports.default = SMitosisStartParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLDRCQUE2QixTQUFRLHFCQUFZO0lBQ25ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFdBQVcsRUFBRSw2Q0FBNkM7Z0JBQzFELE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUM7Z0JBQ2xDLE1BQU0sRUFBRSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUM7YUFDcEM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLCtEQUErRDtnQkFDbkUsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO2FBQzFEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELGtCQUFlLDRCQUE0QixDQUFDIn0=