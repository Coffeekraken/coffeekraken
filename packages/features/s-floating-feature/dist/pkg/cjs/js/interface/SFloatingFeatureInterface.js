"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SFloatingFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SFloatingFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SFloatingFeatureInterface extends s_interface_1.default {
    static get _definition() {
        return {
            ref: {
                description: 'Specify the reference HTMLElement from which to position the floating one. If not specified, will take the previous element in the DOM',
                type: 'String',
            },
            position: {
                description: 'Specify the placement of your floating element. By default it will try to be placed as good as possible.',
                type: 'String',
                values: [
                    'top',
                    'right',
                    'bottom',
                    'left',
                    'top-start',
                    'top-end',
                    'right-start',
                    'right-end',
                    'bottom-start',
                    'bottom-end',
                    'left-start',
                    'left-end',
                    'auto',
                ],
                default: 'auto',
            },
            shift: {
                description: 'Specify a space between the floating element and the viewport side to respect',
                type: 'Number',
                default: 10,
            },
            offset: {
                description: 'Specify a space between the floating element and the reference one to respect',
                type: 'Number',
            },
            arrow: {
                description: 'Specify if you want an arrow or not',
                type: 'Boolean',
                default: true,
            },
            arrowSize: {
                description: 'Specify the size of the arrow in px',
                type: 'Number',
                default: 15,
            },
            arrowPadding: {
                description: 'Specify the padding of the arrow in px',
                type: 'Number',
                default: 10,
            },
        };
    }
}
exports.default = SFloatingFeatureInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHlCQUEwQixTQUFRLHFCQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUNQLHdJQUF3STtnQkFDNUksSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLDBHQUEwRztnQkFDOUcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFO29CQUNKLEtBQUs7b0JBQ0wsT0FBTztvQkFDUCxRQUFRO29CQUNSLE1BQU07b0JBQ04sV0FBVztvQkFDWCxTQUFTO29CQUNULGFBQWE7b0JBQ2IsV0FBVztvQkFDWCxjQUFjO29CQUNkLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixVQUFVO29CQUNWLE1BQU07aUJBQ1Q7Z0JBQ0QsT0FBTyxFQUFFLE1BQU07YUFDbEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsK0VBQStFO2dCQUNuRixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUscUNBQXFDO2dCQUNsRCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQUUscUNBQXFDO2dCQUNsRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFBRSx3Q0FBd0M7Z0JBQ3JELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBekRELDRDQXlEQyJ9