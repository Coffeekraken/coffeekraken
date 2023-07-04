"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SDocServeParamsInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @status              beta
 * @platform             node
 * @interface
 *
 * This class represent the settings of the SDoc serve class method params
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocServeParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            port: {
                type: 'Number',
                description: 'Specify the port on which to run the SDoc server',
                default: s_sugar_config_1.default.get('doc.server.port'),
            },
        };
    }
}
exports.default = SDocServeParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLHdCQUF5QixTQUFRLHFCQUFZO0lBQy9DLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGtEQUFrRDtnQkFDL0QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO2FBQ2pEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELGtCQUFlLHdCQUF3QixDQUFDIn0=