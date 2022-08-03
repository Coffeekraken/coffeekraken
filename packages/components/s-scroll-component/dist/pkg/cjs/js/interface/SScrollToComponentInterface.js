"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SScrollToComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SScrollToComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SScrollToComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            duration: {
                description: 'Specify the duration of the scroll in ms',
                type: 'number',
                default: 300,
            },
            offset: {
                description: 'Specify the offset of the scroll in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: 0,
            },
            offsetX: {
                description: 'Specify the offset of the scroll x in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: 0,
            },
            offsetY: {
                description: 'Specify the offset of the scroll y in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: 0,
            },
        };
    }
}
exports.default = SScrollToComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLDJCQUE0QixTQUFRLHFCQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLDBDQUEwQztnQkFDdkQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEdBQUc7YUFDZjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AscUZBQXFGO2dCQUN6RixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCx1RkFBdUY7Z0JBQzNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHVGQUF1RjtnQkFDM0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUE1QkQsOENBNEJDIn0=