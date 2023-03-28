"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SColorPickerComponentInterface
 * @namespace           js.interface
 * @type                      Class
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
                    'eyedropper',
                    'reset',
                    'close',
                    'format',
                ],
                default: [
                    'pointerup',
                    'validate',
                    'eyedropper',
                    'reset',
                    'close',
                    'format',
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
                description: 'Specify some translations for the color picker. You can translate the "reset" and "validate" buttons',
                type: 'Object',
                default: {
                    reset: 'Reset',
                    validate: 'Validate',
                },
            },
            placeholder: {
                description: "Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",
                type: 'String',
                default: 'Select a color',
            },
            backdrop: {
                description: 'Specify if you want the ".s-backdrop" element or not',
                type: 'Boolean',
                default: false,
            },
            eyeDropper: {
                description: 'Specify if you want the eye dropper capability to pick a color anywhere on the screen or not',
                type: 'Boolean',
                default: true,
            },
            actions: {
                description: 'Specify the actions buttons you want to display. Can be "clear", "reset" and "validate". If false, hide all button',
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['reset', 'validate'],
                default: ['reset', 'validate'],
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
            eyeDropperIconClass: {
                description: 'Specify the class you want to apply on the "i" that display the "eyeDropper" icon',
                type: 'String',
                default: 's-icon s-icon--eye-dropper',
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
            backdropClass: {
                description: 'Specify the class to apply on the backdrop when the "backdrop" prop is true',
                type: 'String',
                default: 's-backdrop',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLDhCQUErQixTQUFRLHFCQUFZO0lBQ3BFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLGdHQUFnRztnQkFDcEcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE9BQU87YUFDbkI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLG1JQUFtSTtnQkFDdkksSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELE1BQU0sRUFBRTtvQkFDSixhQUFhO29CQUNiLFdBQVc7b0JBQ1gsYUFBYTtvQkFDYixVQUFVO29CQUNWLFlBQVk7b0JBQ1osT0FBTztvQkFDUCxPQUFPO29CQUNQLFFBQVE7aUJBQ1g7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFdBQVc7b0JBQ1gsVUFBVTtvQkFDVixZQUFZO29CQUNaLE9BQU87b0JBQ1AsT0FBTztvQkFDUCxRQUFRO2lCQUNYO2FBQ0o7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLDBIQUEwSDtnQkFDOUgsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7Z0JBQ3JELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxnSUFBZ0k7Z0JBQ3BJLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxzR0FBc0c7Z0JBQzFHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRTtvQkFDTCxLQUFLLEVBQUUsT0FBTztvQkFDZCxRQUFRLEVBQUUsVUFBVTtpQkFDdkI7YUFDSjtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1AsdUdBQXVHO2dCQUMzRyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsZ0JBQWdCO2FBQzVCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCxzREFBc0Q7Z0JBQzFELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCw4RkFBOEY7Z0JBQ2xHLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFDUCxvSEFBb0g7Z0JBQ3hILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQztnQkFDN0IsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQzthQUNqQztZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQ1Asc0ZBQXNGO2dCQUMxRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0wsUUFBUSxFQUFFLE1BQU07b0JBQ2hCLEtBQUssRUFBRSxFQUFFO29CQUNULE1BQU0sRUFBRSxDQUFDO29CQUNULEtBQUssRUFBRSxLQUFLO29CQUNaLFNBQVMsRUFBRSxFQUFFO29CQUNiLFlBQVksRUFBRSxFQUFFO2lCQUNuQjthQUNKO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ2pCLFdBQVcsRUFDUCxtRkFBbUY7Z0JBQ3ZGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSw0QkFBNEI7YUFDeEM7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLDZFQUE2RTtnQkFDakYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHFCQUFxQjthQUNqQztZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQ1AsNEdBQTRHO2dCQUNoSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsdUJBQXVCO2FBQ25DO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLFdBQVcsRUFDUCxpRUFBaUU7Z0JBQ3JFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxzQkFBc0I7YUFDbEM7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLDZFQUE2RTtnQkFDakYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFlBQVk7YUFDeEI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLHlDQUF5QztnQkFDdEQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBNUlELGlEQTRJQyJ9