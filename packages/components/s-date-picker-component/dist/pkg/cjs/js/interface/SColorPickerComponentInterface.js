"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SColorPickerComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SColorPickerComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SColorPickerComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                description: "Specify the name that will be assigned to the injected input if you don't provide one yourself",
                type: 'String',
                default: 'color',
            },
            value: {
                description: 'Specify the initial value for your picker',
                type: 'String',
            },
            updateInput: {
                description: 'Specify when you want to updat the attached input. Can be "pointermove", "pointerup", "pointerdown", "input", "validate", "close"',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: [
                    'pointerdown',
                    'pointerup',
                    'pointermove',
                    'validate',
                    'reset',
                    'clear',
                    'close',
                ],
                default: [
                    'pointerdown',
                    'pointerup',
                    'pointermove',
                    'validate',
                    'reset',
                    'clear',
                    'close',
                ],
            },
            format: {
                description: 'Specify the format of the color you want as end in the input value. Can be "hex", "hexa", "rgb", "rgba", "hsl" or "hsla"',
                type: 'String',
                values: ['hex', 'hexa', 'rgb', 'rgba', 'hsl', 'hsla'],
                default: 'hex',
            },
            inline: {
                description: 'Specify if you want to initalize the color picker inline or if you want it to be displayed only when the focus is in the input',
                type: 'Boolean',
                default: false,
                physical: true,
            },
            i18n: {
                description: 'Specify some translations for the color picker. You can translate the "reset", "clear" and "validate" buttons',
                type: 'Object',
                default: {
                    reset: 'Reset',
                    clear: 'Clear',
                    validate: 'Validate',
                },
            },
            placeholder: {
                description: "Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",
                type: 'String',
                default: 'Select a color',
            },
            input: {
                description: 'Specify if you dont want an automatically injected text input when you dont provide yours',
                type: 'Boolean',
                default: false,
            },
            button: {
                description: 'Specify if you want to display the button or not',
                type: 'Boolean',
                default: false,
                physical: true,
            },
            clear: {
                description: 'Specify if you want the "clear" button that take the color picker back to his initial state (clear the state)',
                type: 'Boolean',
                default: true,
            },
            reset: {
                description: 'Specify if you want the "reset" button that take the color picker back to his "state" state',
                type: 'Boolean',
                default: true,
            },
            validate: {
                description: 'Specify if you want the "validate" button that apply the color and close the picker',
                type: 'Boolean',
                default: true,
            },
            floatSettings: {
                description: 'Specify some float settings to pass to the "makeFloat" function of the sugar toolkit',
                type: 'Object',
                default: {
                    position: 'auto',
                    shift: 10,
                    offset: 0,
                    arrow: false,
                    arrowSize: 15,
                    arrowPadding: 10,
                },
            },
            copyIconClass: {
                description: 'Specify the class you want to apply on the "i" that display the "copy" icon',
                type: 'String',
                default: 's-icon s-icon--copy',
            },
            copiedIconClass: {
                description: 'Specify the class you want to apply on the "i" that display the "copy" icon when the color has been copied',
                type: 'String',
                default: 's-icon s-icon--copied',
            },
            buttonIconClass: {
                description: 'Specify the class you want to apply on the injected button icon',
                type: 'String',
                default: 's-icon s-icon--color',
            },
            disabled: {
                description: 'Specify if the color picker is disabled',
                type: 'Boolean',
                default: false,
            },
        };
    }
}
exports.default = SColorPickerComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLDhCQUErQixTQUFRLHFCQUFZO0lBQ3BFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLGdHQUFnRztnQkFDcEcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE9BQU87YUFDbkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLG1JQUFtSTtnQkFDdkksSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELE1BQU0sRUFBRTtvQkFDSixhQUFhO29CQUNiLFdBQVc7b0JBQ1gsYUFBYTtvQkFDYixVQUFVO29CQUNWLE9BQU87b0JBQ1AsT0FBTztvQkFDUCxPQUFPO2lCQUNWO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxhQUFhO29CQUNiLFdBQVc7b0JBQ1gsYUFBYTtvQkFDYixVQUFVO29CQUNWLE9BQU87b0JBQ1AsT0FBTztvQkFDUCxPQUFPO2lCQUNWO2FBQ0o7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLDBIQUEwSDtnQkFDOUgsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7Z0JBQ3JELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxnSUFBZ0k7Z0JBQ3BJLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCwrR0FBK0c7Z0JBQ25ILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRTtvQkFDTCxLQUFLLEVBQUUsT0FBTztvQkFDZCxLQUFLLEVBQUUsT0FBTztvQkFDZCxRQUFRLEVBQUUsVUFBVTtpQkFDdkI7YUFDSjtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1AsdUdBQXVHO2dCQUMzRyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsZ0JBQWdCO2FBQzVCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCwyRkFBMkY7Z0JBQy9GLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxrREFBa0Q7Z0JBQy9ELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCwrR0FBK0c7Z0JBQ25ILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCw2RkFBNkY7Z0JBQ2pHLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCxxRkFBcUY7Z0JBQ3pGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCxzRkFBc0Y7Z0JBQzFGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRTtvQkFDTCxRQUFRLEVBQUUsTUFBTTtvQkFDaEIsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsTUFBTSxFQUFFLENBQUM7b0JBQ1QsS0FBSyxFQUFFLEtBQUs7b0JBQ1osU0FBUyxFQUFFLEVBQUU7b0JBQ2IsWUFBWSxFQUFFLEVBQUU7aUJBQ25CO2FBQ0o7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLDZFQUE2RTtnQkFDakYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHFCQUFxQjthQUNqQztZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQ1AsNEdBQTRHO2dCQUNoSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsdUJBQXVCO2FBQ25DO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLFdBQVcsRUFDUCxpRUFBaUU7Z0JBQ3JFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxzQkFBc0I7YUFDbEM7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLHlDQUF5QztnQkFDdEQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBeklELGlEQXlJQyJ9