"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                WhenInteractSettingsInterface
 * @namespace           js.dom.detect.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the `whenInteract` settings.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class WhenInteractSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            pointerover: {
                description: 'Specify if the pointerover event has to be used',
                type: 'Boolean',
                default: true,
            },
            pointerout: {
                description: 'Specify if the pointerout event has to be used',
                type: 'Boolean',
                default: true,
            },
            click: {
                description: 'Specify if the click event has to be used',
                type: 'Boolean',
                default: true,
            },
            touchstart: {
                description: 'Specify if the touchstart event has to be used',
                type: 'Boolean',
                default: true,
            },
            touchend: {
                description: 'Specify if the touchend event has to be used',
                type: 'Boolean',
                default: true,
            },
            focus: {
                description: 'Specify if the focus event has to be used',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
exports.default = WhenInteractSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBcUIsNkJBQThCLFNBQVEscUJBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQUUsaURBQWlEO2dCQUM5RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsMkNBQTJDO2dCQUN4RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsOENBQThDO2dCQUMzRCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsMkNBQTJDO2dCQUN4RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFuQ0QsZ0RBbUNDIn0=