import __SInterface from '@coffeekraken/s-interface';
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
export default class SColorPickerComponentInterface extends __SInterface {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxnR0FBZ0c7Z0JBQ3BHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSwyQ0FBMkM7Z0JBQ3hELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFDUCxtSUFBbUk7Z0JBQ3ZJLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUNwQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osYUFBYTtvQkFDYixXQUFXO29CQUNYLGFBQWE7b0JBQ2IsVUFBVTtvQkFDVixZQUFZO29CQUNaLE9BQU87b0JBQ1AsT0FBTztvQkFDUCxRQUFRO2lCQUNYO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxXQUFXO29CQUNYLFVBQVU7b0JBQ1YsWUFBWTtvQkFDWixPQUFPO29CQUNQLE9BQU87b0JBQ1AsUUFBUTtpQkFDWDthQUNKO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCwwSEFBMEg7Z0JBQzlILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO2dCQUNyRCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsZ0lBQWdJO2dCQUNwSSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQ1Asc0dBQXNHO2dCQUMxRyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLE9BQU87b0JBQ2QsUUFBUSxFQUFFLFVBQVU7aUJBQ3ZCO2FBQ0o7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLHVHQUF1RztnQkFDM0csSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGdCQUFnQjthQUM1QjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQ1Asc0RBQXNEO2dCQUMxRCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQ1AsOEZBQThGO2dCQUNsRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1Asb0hBQW9IO2dCQUN4SCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7YUFDakM7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLHNGQUFzRjtnQkFDMUYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFO29CQUNMLFFBQVEsRUFBRSxNQUFNO29CQUNoQixLQUFLLEVBQUUsRUFBRTtvQkFDVCxNQUFNLEVBQUUsQ0FBQztvQkFDVCxLQUFLLEVBQUUsS0FBSztvQkFDWixTQUFTLEVBQUUsRUFBRTtvQkFDYixZQUFZLEVBQUUsRUFBRTtpQkFDbkI7YUFDSjtZQUNELG1CQUFtQixFQUFFO2dCQUNqQixXQUFXLEVBQ1AsbUZBQW1GO2dCQUN2RixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsNEJBQTRCO2FBQ3hDO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCw2RUFBNkU7Z0JBQ2pGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxxQkFBcUI7YUFDakM7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsV0FBVyxFQUNQLDRHQUE0RztnQkFDaEgsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHVCQUF1QjthQUNuQztZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQ1AsaUVBQWlFO2dCQUNyRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsc0JBQXNCO2FBQ2xDO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCw2RUFBNkU7Z0JBQ2pGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxZQUFZO2FBQ3hCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSx5Q0FBeUM7Z0JBQ3RELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9