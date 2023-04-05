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
                description:
                    'Specify the maximum files that can be droped on the dropzone at once',
                default: 1,
            },
            maxSize: {
                type: 'Number',
                description:
                    'Specify the maximum file size accepted by the dropzone',
            },
            files: {
                type: {
                    type: 'String[]',
                    splitChars: [',', ' '],
                },
                description:
                    'Specify some initial file(s) to be used and displayed in the UI. MUST contain at least a "src" attribute by file passed',
            },
            accept: {
                type: {
                    type: 'String[]',
                    splitChars: [' ', ','],
                },
                description:
                    'Specify which file types are accepted. Exactly the same as the "accept" attribute of the input[type="file"]',
            },
            input: {
                type: 'Boolean',
                description: 'Specify if you want an input[type="file"] or not',
                default: true,
            },
            name: {
                type: 'String',
                description:
                    'Specify a name for the input[type="file"] input that will be created if you set the "input" property to true',
                default: 'files',
            },
            upload: {
                type: 'Boolean',
                description:
                    'Specify if you want the droped file(s) to be uploaded or not',
                default: false,
            },
            uploadUrl: {
                type: 'String',
                description: 'Specify the url where to upload the file(s)',
                default: '/upload',
            },
            errorTimeout: {
                type: 'Number',
                description:
                    'Specify how many ms the error class is applied on the dropzone when something goes wrong',
                default: 1000,
            },
            helpIcon: {
                type: 'String',
                description: 'Specify the html to be used for the "help" icon',
                default: '<i class="s-icon s-icon--help"></i>',
            },
            dropFileIcon: {
                type: 'String',
                description:
                    'Specify the html to be used for the "drop" icon when no file have been droped',
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
