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
            files: {
                type: {
                    type: 'String[]',
                    splitChars: [',', ' '],
                },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLDJCQUE0QixTQUFRLFlBQVk7SUFDakUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1Asc0VBQXNFO2dCQUMxRSxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCx3REFBd0Q7YUFDL0Q7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxVQUFVO29CQUNoQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxXQUFXLEVBQ1AseUhBQXlIO2FBQ2hJO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsV0FBVyxFQUNQLDZHQUE2RzthQUNwSDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUUsa0RBQWtEO2dCQUMvRCxPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsOEdBQThHO2dCQUNsSCxPQUFPLEVBQUUsT0FBTzthQUNuQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1AsOERBQThEO2dCQUNsRSxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsNkNBQTZDO2dCQUMxRCxPQUFPLEVBQUUsU0FBUzthQUNyQjtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsMEZBQTBGO2dCQUM5RixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsaURBQWlEO2dCQUM5RCxPQUFPLEVBQUUscUNBQXFDO2FBQ2pEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwrRUFBK0U7Z0JBQ25GLE9BQU8sRUFBRSwwQ0FBMEM7YUFDdEQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLCtDQUErQztnQkFDNUQsT0FBTyxFQUFFO29CQUNMLFdBQVcsRUFBRSxNQUFNLENBQUMsK0JBQStCLEVBQUU7d0JBQ2pELEVBQUUsRUFBRSxrQkFBa0I7cUJBQ3pCLENBQUM7aUJBQ0w7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==