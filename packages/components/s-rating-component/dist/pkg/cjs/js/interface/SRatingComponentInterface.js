"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SRatingComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SClipboardCopyComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SRatingComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                description: 'Specify a name that will be attributed to the hidden input created automatically',
                type: 'String',
                default: 'rate',
            },
            value: {
                description: 'Specify a base value for the rating',
                type: 'Number',
                default: 3,
            },
            min: {
                description: 'Specify the minimum rate you accept',
                type: 'Number',
                default: 1,
            },
            max: {
                description: 'Specify the maximum rate you accept',
                type: 'Number',
                default: 5,
            },
            icon: {
                description: 'This works only if you use the "s-icon:..." class notation. Define the icon you want to use',
                type: 'String',
                default: 'star',
            },
            iconClass: {
                description: 'Specify a custom icon class you want to use. If this is set, override the "icon" parameter',
                type: 'String',
            },
            readonly: {
                description: 'Specify if you want your rating component to just display the value and that the user cannot interact with it or not',
                type: 'Boolean',
                default: false,
                physical: true,
            },
        };
    }
}
exports.default = SRatingComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHlCQUEwQixTQUFRLHFCQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLGtGQUFrRjtnQkFDdEYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE1BQU07YUFDbEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLHFDQUFxQztnQkFDbEQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUscUNBQXFDO2dCQUNsRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLDZGQUE2RjtnQkFDakcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE1BQU07YUFDbEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLDRGQUE0RjtnQkFDaEcsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLHNIQUFzSDtnQkFDMUgsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBNUNELDRDQTRDQyJ9