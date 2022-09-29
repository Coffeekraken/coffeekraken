"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SConductorSettingsInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the SConductor settings.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SConductorSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            idleTimeout: {
                description: 'Specify after how many milliseconds of inactity the SConductor has to be considered as idle ',
                type: 'Number',
                default: 5000,
            },
            logTimeout: {
                description: 'Specify after how many milliseconds of inactity the SConductor has to log the small analysis',
                type: 'Number',
                default: 2000,
            },
            log: {
                description: 'Specify if you want to log the small analysis when the SConductor is idle',
                type: 'Boolean',
                default: false,
            },
        };
    }
}
exports.default = SConductorSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBcUIsMkJBQTRCLFNBQVEscUJBQVk7SUFDakUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1AsOEZBQThGO2dCQUNsRyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQ1AsOEZBQThGO2dCQUNsRyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQ1AsMkVBQTJFO2dCQUMvRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF2QkQsOENBdUJDIn0=