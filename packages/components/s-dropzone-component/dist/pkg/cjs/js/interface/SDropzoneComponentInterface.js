"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_i18n_1 = require("@coffeekraken/s-i18n");
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class SDropzoneComponentInterface extends s_interface_1.default {
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
                    clickOrDrag: (0, s_i18n_1.__i18n)('Click or drag file(s) here...', {
                        id: 's-dropzone.label',
                    }),
                },
            },
        };
    }
}
exports.default = SDropzoneComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQThDO0FBQzlDLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQiwyQkFBNEIsU0FBUSxxQkFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxzRUFBc0U7Z0JBQzFFLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLHdEQUF3RDthQUMvRDtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1Asc0RBQXNEO2dCQUMxRCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELFdBQVcsRUFDUCw2R0FBNkc7YUFDcEg7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFLGtEQUFrRDtnQkFDL0QsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLDhHQUE4RztnQkFDbEgsT0FBTyxFQUFFLE9BQU87YUFDbkI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLDhEQUE4RDtnQkFDbEUsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLDZDQUE2QztnQkFDMUQsT0FBTyxFQUFFLFNBQVM7YUFDckI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLDBGQUEwRjtnQkFDOUYsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsT0FBTyxFQUFFLHFDQUFxQzthQUNqRDtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsK0VBQStFO2dCQUNuRixPQUFPLEVBQUUsMENBQTBDO2FBQ3REO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSwrQ0FBK0M7Z0JBQzVELE9BQU8sRUFBRTtvQkFDTCxXQUFXLEVBQUUsSUFBQSxlQUFNLEVBQUMsK0JBQStCLEVBQUU7d0JBQ2pELEVBQUUsRUFBRSxrQkFBa0I7cUJBQ3pCLENBQUM7aUJBQ0w7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUE5RUQsOENBOEVDIn0=