"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SPageTransitionFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SPageTransitionFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SPageTransitionFeatureInterface extends s_interface_1.default {
    static get _definition() {
        return {
            patchBody: {
                description: 'Specify if you want to patch the body tag with the new page body tag',
                type: 'Boolean',
                default: true,
            },
            scrollTop: {
                description: 'Specify if you want to scroll to the top of the updated element after a transition',
                type: 'Boolean',
                default: true,
            },
            before: {
                description: 'Specify a function to run before the transition',
                type: 'Function',
            },
            after: {
                description: 'Specify a function to run after the transition',
                type: 'Function',
            },
            autoStyle: {
                description: 'Specify if you want to automatically add classes like "s-tc:error" on the broken links (only the "a" tags)',
                type: 'Boolean',
                default: true,
            },
            injectBrokenLinkIcon: {
                description: 'Specify if you want to inject the "error" icon on the broken links',
                type: 'Boolean',
                default: true,
            },
            brokenLinkIcon: {
                description: 'Specify the icon you want to inject on the broken links',
                type: 'String',
                default: '<i class="s-icon:link-broken-solid" alt="Broken link"></i>',
            },
        };
    }
}
exports.default = SPageTransitionFeatureInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLCtCQUFnQyxTQUFRLHFCQUFZO0lBQ3JFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLHNFQUFzRTtnQkFDMUUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLG9GQUFvRjtnQkFDeEYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsSUFBSSxFQUFFLFVBQVU7YUFDbkI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLDRHQUE0RztnQkFDaEgsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxvQkFBb0IsRUFBRTtnQkFDbEIsV0FBVyxFQUNQLG9FQUFvRTtnQkFDeEUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUNQLHlEQUF5RDtnQkFDN0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUNILDREQUE0RDthQUNuRTtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUE1Q0Qsa0RBNENDIn0=