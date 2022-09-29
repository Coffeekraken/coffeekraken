"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SActivateFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SActivateFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SActivateFeatureInterface extends s_interface_1.default {
    static get _definition() {
        return {
            href: {
                description: 'Specify the target element(s) to activate/unactivate',
                type: 'String',
                default: '',
            },
            group: {
                description: 'Specify a group id for your element. This is used for things like tabs, etc...',
                type: 'String',
            },
            toggle: {
                description: 'Specify if you want to be able to click on the same element to activate/unactivate it.',
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                default: false,
            },
            history: {
                description: 'Specify if you want to store and react to history hash changes',
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                default: false,
            },
            active: {
                description: 'Specify the initial state of your element',
                type: {
                    type: 'Boolean',
                    nullishAsTrue: true,
                },
                default: false,
                physical: true,
            },
            activeClass: {
                description: 'Specify the class applied on target(s) when active. Default is "active"',
                type: 'String',
                default: 'active',
            },
            activeAttribute: {
                description: 'Specify the attribute name applied on target(s) when active.',
                type: 'String',
                default: 'active',
            },
            saveState: {
                description: 'Specify if you want to save state in localStorage to restore it on page reload, etc...',
                type: 'Boolean',
                default: false,
            },
            activateTimeout: {
                description: 'Specify a timeout before actiavting the target(s)',
                type: 'Number',
                default: 0,
            },
            unactivateTimeout: {
                description: 'Specify a timeout before unactivate the target(s)',
                type: 'Number',
                default: 0,
            },
            triggerer: {
                description: 'Specify an element selector that will be used as the triggerer instead of this current element',
                type: 'String',
            },
            trigger: {
                description: 'Specify what trigger an activate/unactivate action. Can be "click", "mouseover", "mouseout" and/or "anchor"',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: [
                    'click',
                    'mouseover',
                    'mouseenter',
                    'mouseout',
                    'mouseleave',
                    'anchor',
                ],
                default: ['click'],
            },
            unactivateOn: {
                description: 'Specify some event(s) catched on the body tag that will unactivate the target(s)',
                type: 'Array<String>',
            },
        };
    }
}
exports.default = SActivateFeatureInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHlCQUEwQixTQUFRLHFCQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLHNEQUFzRDtnQkFDMUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsZ0ZBQWdGO2dCQUNwRixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1Asd0ZBQXdGO2dCQUM1RixJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsYUFBYSxFQUFFLElBQUk7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCxnRUFBZ0U7Z0JBQ3BFLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsU0FBUztvQkFDZixhQUFhLEVBQUUsSUFBSTtpQkFDdEI7Z0JBQ0QsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxTQUFTO29CQUNmLGFBQWEsRUFBRSxJQUFJO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1AseUVBQXlFO2dCQUM3RSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUTthQUNwQjtZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQ1AsOERBQThEO2dCQUNsRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUTthQUNwQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQ1Asd0ZBQXdGO2dCQUM1RixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQ1AsbURBQW1EO2dCQUN2RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsaUJBQWlCLEVBQUU7Z0JBQ2YsV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQ1AsZ0dBQWdHO2dCQUNwRyxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AsNkdBQTZHO2dCQUNqSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztpQkFDcEI7Z0JBQ0QsTUFBTSxFQUFFO29CQUNKLE9BQU87b0JBQ1AsV0FBVztvQkFDWCxZQUFZO29CQUNaLFVBQVU7b0JBQ1YsWUFBWTtvQkFDWixRQUFRO2lCQUNYO2dCQUNELE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNyQjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1Asa0ZBQWtGO2dCQUN0RixJQUFJLEVBQUUsZUFBZTthQUN4QjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFwR0QsNENBb0dDIn0=