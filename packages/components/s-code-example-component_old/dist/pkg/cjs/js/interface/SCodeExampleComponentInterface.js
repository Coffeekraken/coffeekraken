"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SCodeExampleComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SCodeExampleComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SCodeExampleComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            active: {
                description: 'Specify which "tab" is active in case of multiple languages examples',
                type: 'String',
            },
            toolbar: {
                description: 'Specify what you want in the toolbar. Currently available item is "copy"',
                type: 'Array<String>',
                values: ['copy'],
                default: ['copy'],
            },
            toolbarPosition: {
                description: 'Specify the toolbar position. Can be "content" or "nav"',
                type: 'String',
                values: ['content', 'nav'],
                default: 'nav',
            },
            languages: {
                description: 'Specify some languages that you want to support. Must be "[key]: language" object syntax. See [highlight.js doc](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) for supported languages',
                type: 'Object',
                default: {},
            },
            items: {
                description: 'Specify the items to put in your code example',
                type: 'Object[]',
                default: [],
            },
            lines: {
                description: 'Specify how many lines to display at max',
                type: 'Number',
                default: 15,
                physical: true,
            },
            moreLabel: {
                description: 'Specify the "show more" button label',
                type: 'String',
                default: 'Show more',
            },
            lessLabel: {
                description: 'Specigy the "show less" button label',
                type: 'String',
                default: 'Show less',
            },
            moreAction: {
                description: 'Specify the action to execute when click on the "more" button. Currently available action is "toggle"',
                values: ['toggle'],
                type: 'String',
                default: 'toggle',
            },
            more: {
                description: 'Specify if you want to expand the more feature at start or not',
                type: 'Boolean',
                default: false,
            },
            scrollOnMore: {
                description: 'Specify if you want to scroll to the code when clicking on the "show more/less" button',
                type: 'Boolean',
                default: true,
            },
            scrollToSettings: {
                description: 'Specify some scrollTo settings',
                type: 'Object',
                default: {},
            },
        };
    }
}
exports.default = SCodeExampleComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLDhCQUErQixTQUFRLHFCQUFZO0lBQ3BFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLHNFQUFzRTtnQkFDMUUsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLDBFQUEwRTtnQkFDOUUsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO2FBQ3BCO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCx3TkFBd047Z0JBQzVOLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLCtDQUErQztnQkFDNUQsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLDBDQUEwQztnQkFDdkQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFdBQVc7YUFDdkI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFdBQVc7YUFDdkI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUNQLHVHQUF1RztnQkFDM0csTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNsQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUTthQUNwQjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQ1AsZ0VBQWdFO2dCQUNwRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1Asd0ZBQXdGO2dCQUM1RixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELGdCQUFnQixFQUFFO2dCQUNkLFdBQVcsRUFBRSxnQ0FBZ0M7Z0JBQzdDLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBM0VELGlEQTJFQyJ9