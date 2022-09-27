"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name                SScrollComponentInterface
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
class SScrollComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            to: {
                description: 'The target when to scroll. Must be a valid css selector',
                type: 'String',
                required: true,
            },
            duration: {
                description: 'Specify the duration of the scroll in ms',
                type: 'number',
                default: s_theme_1.default.get('scroll.duration'),
            },
            offset: {
                description: 'Specify the offset of the scroll in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: s_theme_1.default.get('scroll.offset'),
            },
            offsetX: {
                description: 'Specify the offset of the scroll x in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: s_theme_1.default.get('scroll.offsetX'),
            },
            offsetY: {
                description: 'Specify the offset of the scroll y in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: s_theme_1.default.get('scroll.offsetY'),
            },
        };
    }
}
exports.default = SScrollComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELG9FQUE2QztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQix5QkFBMEIsU0FBUSxxQkFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsRUFBRSxFQUFFO2dCQUNBLFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSwwQ0FBMEM7Z0JBQ3ZELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzthQUMzQztZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AscUZBQXFGO2dCQUN6RixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2FBQ3pDO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCx1RkFBdUY7Z0JBQzNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQzthQUMxQztZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AsdUZBQXVGO2dCQUMzRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7YUFDMUM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBbENELDRDQWtDQyJ9