"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = SDropzoneComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLDJCQUE0QixTQUFRLHFCQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLHNFQUFzRTtnQkFDMUUsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsV0FBVyxFQUNQLHlIQUF5SDthQUNoSTtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELFdBQVcsRUFDUCw2R0FBNkc7YUFDcEg7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFLGtEQUFrRDtnQkFDL0QsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLDhHQUE4RztnQkFDbEgsT0FBTyxFQUFFLE9BQU87YUFDbkI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLDBGQUEwRjtnQkFDOUYsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsT0FBTyxFQUFFLHFDQUFxQzthQUNqRDtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsK0VBQStFO2dCQUNuRixPQUFPLEVBQUUsMENBQTBDO2FBQ3REO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSwrQ0FBK0M7Z0JBQzVELE9BQU8sRUFBRTtvQkFDTCxLQUFLLEVBQUUsT0FBTztvQkFDZCxXQUFXLEVBQUUsK0JBQStCO2lCQUMvQzthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTVERCw4Q0E0REMifQ==