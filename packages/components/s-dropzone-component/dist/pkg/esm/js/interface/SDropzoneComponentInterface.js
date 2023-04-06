import { __i18n } from '@coffeekraken/s-i18n';
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
            maxFiles: {
                type: 'Number',
                description: 'Specify the maximum files that can be droped on the dropzone at once',
                default: 1,
            },
            maxSize: {
                type: 'Number',
                description: 'Specify the maximum file size accepted by the dropzone',
            },
            multiple: {
                type: 'Boolean',
                description: 'Specify if you want to accept multiple files at once',
                default: false,
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
            upload: {
                type: 'Boolean',
                description: 'Specify if you want the droped file(s) to be uploaded or not',
                default: false,
            },
            uploadUrl: {
                type: 'String',
                description: 'Specify the url where to upload the file(s)',
                default: '/upload',
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
                    clickOrDrag: __i18n('Click or drag file(s) here...', {
                        id: 's-dropzone.label',
                    }),
                },
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLDJCQUE0QixTQUFRLFlBQVk7SUFDakUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1Asc0VBQXNFO2dCQUMxRSxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCx3REFBd0Q7YUFDL0Q7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHNEQUFzRDtnQkFDMUQsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxVQUFVO29CQUNoQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxXQUFXLEVBQ1AsNkdBQTZHO2FBQ3BIO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSxrREFBa0Q7Z0JBQy9ELE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCw4R0FBOEc7Z0JBQ2xILE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCw4REFBOEQ7Z0JBQ2xFLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSw2Q0FBNkM7Z0JBQzFELE9BQU8sRUFBRSxTQUFTO2FBQ3JCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwwRkFBMEY7Z0JBQzlGLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELE9BQU8sRUFBRSxxQ0FBcUM7YUFDakQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsT0FBTyxFQUFFLDBDQUEwQzthQUN0RDtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxPQUFPLEVBQUU7b0JBQ0wsV0FBVyxFQUFFLE1BQU0sQ0FBQywrQkFBK0IsRUFBRTt3QkFDakQsRUFBRSxFQUFFLGtCQUFrQjtxQkFDekIsQ0FBQztpQkFDTDthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9