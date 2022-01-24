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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SColorPickerComponentInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                description: "Specify the name that will be assigned to the injected input if you don't provide one yourself",
                type: 'String',
                default: 'date',
            },
            value: {
                description: 'Specify the initial value for your picker',
                type: 'String',
            },
            placeholder: {
                description: "Specify the placeholder that will be assigned to the injected input if you don't provide one yourself",
                type: 'String',
                default: 'Select a color',
            },
            theme: {
                description: 'Specify the theme you want to use for this picker',
                type: 'String',
                values: ['nano', 'monolith'],
                default: 'nano',
            },
            input: {
                description: 'Specify if you dont want an automatically injected text input when you dont provide yours',
                type: 'Boolean',
                default: false,
            },
            preview: {
                description: 'Specify if you want to display the preview or not',
                type: 'Boolean',
                default: false,
                physical: true,
            },
            position: {
                description: 'Specify the position of the picker. Can be "top" or "bottom"',
                type: 'String',
                values: ['top', 'bottom'],
                default: 'bottom',
            },
            swatches: {
                description: 'Specify some colors you want in your swatches',
                type: 'Array<String>',
                default: [],
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yUGlja2VyQ29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbG9yUGlja2VyQ29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxnR0FBZ0c7Z0JBQ3BHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSwyQ0FBMkM7Z0JBQ3hELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFDUCx1R0FBdUc7Z0JBQzNHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxnQkFBZ0I7YUFDNUI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQztnQkFDNUIsT0FBTyxFQUFFLE1BQU07YUFDbEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLDJGQUEyRjtnQkFDL0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLDhEQUE4RDtnQkFDbEUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQztnQkFDekIsT0FBTyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLCtDQUErQztnQkFDNUQsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=