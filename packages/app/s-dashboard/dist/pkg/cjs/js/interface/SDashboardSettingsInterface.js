"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SDashboardSettingsInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @status              beta
 * @platform             node
 * @interface
 *
 * This class represent the settings of the SDashboard class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDashboardSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            layout: {
                description: 'Specify the layout of the dashboard with the components you want to display in which column',
                type: 'Array',
                default: s_sugar_config_1.default.get('dashboard.layout'),
            },
        };
    }
}
exports.default = SDashboardSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLDJCQUE0QixTQUFRLHFCQUFZO0lBQ2xELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLDZGQUE2RjtnQkFDakcsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO2FBQ2xEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELGtCQUFlLDJCQUEyQixDQUFDIn0=