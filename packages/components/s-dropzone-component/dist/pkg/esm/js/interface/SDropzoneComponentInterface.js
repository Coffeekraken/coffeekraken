import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SDropzoneComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SDropzoneComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDropzoneComponentInterface extends __SInterface {
    static get _definition() {
        return {
            max: {
                type: 'Number',
                description: 'Specify the maximum files that can be droped on the dropzone at once',
                default: 1,
            },
            files: {
                type: 'String[]',
                description: 'Specify some initial file(s) to be used and displayed in the UI. MUST contain at least a "src" attribute by file passed',
            },
            accept: {
                type: {
                    type: 'String[]',
                    splitChars: [' ', ','],
                },
                description: 'Specify which file types are accepted. Exactly the same as the "accept" attribute of the input[type="file"]',
            },
            input: {
                type: 'Boolean',
                description: 'Specify if you want an input[type="file"] or not',
                default: true,
            },
            name: {
                type: 'String',
                description: 'Specify a name for the input[type="file"] input that will be created if you set the "input" property to true',
                default: 'files',
            },
            errorTimeout: {
                type: 'Number',
                description: 'Specify how many ms the error class is applied on the dropzone when something goes wrong',
                default: 1000,
            },
            helpIcon: {
                type: 'String',
                description: 'Specify the html to be used for the "help" icon',
                default: '<i class="s-icon s-icon--help"></i>',
            },
            dropFileIcon: {
                type: 'String',
                description: 'Specify the html to be used for the "drop" icon when no file have been droped',
                default: '<i class="s-icon s-icon--drop-file"></i>',
            },
            i18n: {
                type: 'Object',
                description: 'Specify some words/sentences to be translated',
                default: {
                    reset: 'Reset',
                    clickOrDrag: 'Click or drag file(s) here...',
                },
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sMkJBQTRCLFNBQVEsWUFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxzRUFBc0U7Z0JBQzFFLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFdBQVcsRUFDUCx5SEFBeUg7YUFDaEk7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxVQUFVO29CQUNoQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxXQUFXLEVBQ1AsNkdBQTZHO2FBQ3BIO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSxrREFBa0Q7Z0JBQy9ELE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCw4R0FBOEc7Z0JBQ2xILE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwwRkFBMEY7Z0JBQzlGLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELE9BQU8sRUFBRSxxQ0FBcUM7YUFDakQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsT0FBTyxFQUFFLDBDQUEwQzthQUN0RDtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxPQUFPLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLE9BQU87b0JBQ2QsV0FBVyxFQUFFLCtCQUErQjtpQkFDL0M7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==