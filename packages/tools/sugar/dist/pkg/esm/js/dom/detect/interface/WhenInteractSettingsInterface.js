// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
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
export default class WhenInteractSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            mouseover: {
                description: 'Specify if the mouseover event has to be used',
                type: 'Boolean',
                default: true
            },
            mouseout: {
                description: 'Specify if the mouseout event has to be used',
                type: 'Boolean',
                default: true
            },
            click: {
                description: 'Specify if the click event has to be used',
                type: 'Boolean',
                default: true
            },
            touchstart: {
                description: 'Specify if the touchstart event has to be used',
                type: 'Boolean',
                default: true
            },
            touchend: {
                description: 'Specify if the touchend event has to be used',
                type: 'Boolean',
                default: true
            },
            focus: {
                description: 'Specify if the focus event has to be used',
                type: 'Boolean',
                default: true
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyw2QkFBOEIsU0FBUSxZQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLCtDQUErQztnQkFDNUQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLDhDQUE4QztnQkFDM0QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLDhDQUE4QztnQkFDM0QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=