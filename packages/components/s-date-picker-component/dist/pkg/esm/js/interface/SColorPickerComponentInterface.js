import __SInterface from '@coffeekraken/s-interface';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxnR0FBZ0c7Z0JBQ3BHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSwyQ0FBMkM7Z0JBQ3hELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFDUCxtSUFBbUk7Z0JBQ3ZJLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUNwQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osYUFBYTtvQkFDYixXQUFXO29CQUNYLGFBQWE7b0JBQ2IsVUFBVTtvQkFDVixPQUFPO29CQUNQLE9BQU87b0JBQ1AsT0FBTztpQkFDVjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsYUFBYTtvQkFDYixXQUFXO29CQUNYLGFBQWE7b0JBQ2IsVUFBVTtvQkFDVixPQUFPO29CQUNQLE9BQU87b0JBQ1AsT0FBTztpQkFDVjthQUNKO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCwwSEFBMEg7Z0JBQzlILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO2dCQUNyRCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsZ0lBQWdJO2dCQUNwSSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQ1AsK0dBQStHO2dCQUNuSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLE9BQU87b0JBQ2QsS0FBSyxFQUFFLE9BQU87b0JBQ2QsUUFBUSxFQUFFLFVBQVU7aUJBQ3ZCO2FBQ0o7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLHVHQUF1RztnQkFDM0csSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGdCQUFnQjthQUM1QjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsMkZBQTJGO2dCQUMvRixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsa0RBQWtEO2dCQUMvRCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsK0dBQStHO2dCQUNuSCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsNkZBQTZGO2dCQUNqRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQ1AscUZBQXFGO2dCQUN6RixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQ1Asc0ZBQXNGO2dCQUMxRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0wsUUFBUSxFQUFFLE1BQU07b0JBQ2hCLEtBQUssRUFBRSxFQUFFO29CQUNULE1BQU0sRUFBRSxDQUFDO29CQUNULEtBQUssRUFBRSxLQUFLO29CQUNaLFNBQVMsRUFBRSxFQUFFO29CQUNiLFlBQVksRUFBRSxFQUFFO2lCQUNuQjthQUNKO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCw2RUFBNkU7Z0JBQ2pGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxxQkFBcUI7YUFDakM7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsV0FBVyxFQUNQLDRHQUE0RztnQkFDaEgsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHVCQUF1QjthQUNuQztZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQ1AsaUVBQWlFO2dCQUNyRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsc0JBQXNCO2FBQ2xDO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSx5Q0FBeUM7Z0JBQ3RELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9