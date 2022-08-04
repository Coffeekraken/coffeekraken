"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SStdioSettingsInterface
 * @namespace           shared.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SStdio settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SStdioSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            filter: {
                description: 'Specify a function that will be used to filter the logs. It will take the log object as parameter and MUST return a boolean.',
                type: 'Function'
            },
            processor: {
                description: 'Specify a function that will be used to process the logs. It will take the log object and MUST return it, updated or not...',
                type: 'Function'
            },
            defaultLogObj: {
                description: 'Specify a default log object that will be used as base for each received logs',
                type: 'Object',
                default: {}
            },
            defaultAskObj: {
                description: 'Specify a default ask object that will be used as base for each received questions (ask)',
                type: 'Object',
                default: {}
            }
        };
    }
}
exports.default = SStdioSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHVCQUF3QixTQUFRLHFCQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLDhIQUE4SDtnQkFDM0ksSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLDZIQUE2SDtnQkFDMUksSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLCtFQUErRTtnQkFDNUYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQUUsMEZBQTBGO2dCQUN2RyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXZCRCwwQ0F1QkMifQ==