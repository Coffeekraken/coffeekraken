"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SColorSettingsInterface
 * @namespace           shared.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 * @platform        js
 *
 * This interface represent the settings of an SColor instance.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SColorSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            returnNewInstance: {
                description: 'Specify if the methods returns by default a new SColor instance or the same',
                type: 'boolean',
                default: false
            },
            defaultFormat: {
                description: 'Specify the default format of the color',
                type: 'String',
                values: ['hex', 'rgb', 'rgba', 'hsl', 'hsla'],
                default: 'hex'
            }
        };
    }
}
exports.default = SColorSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLHVCQUF3QixTQUFRLHFCQUFZO0lBQzlDLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxpQkFBaUIsRUFBRTtnQkFDZixXQUFXLEVBQUUsNkVBQTZFO2dCQUMxRixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQUUseUNBQXlDO2dCQUN0RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxDQUFDO2dCQUN6QyxPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxrQkFBZSx1QkFBdUIsQ0FBQyJ9