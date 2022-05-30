import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SFileSettingsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SFile settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SFileSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            checkExistence: {
                description:
                    'Specify if the file must exists on the filesystem at the instanciation',
                type: 'boolean',
                default: true,
            },
            cwd: {
                description: 'Specify the current working directory',
                type: 'string',
                default: process.cwd(),
            },
            shrinkSizeTo: {
                description: 'Specify how many decimals to keep for the size',
                type: 'number',
                default: 4,
            },
            watch: {
                description:
                    'Specify if you want to watch the file for changes or not',
                type: 'Boolean',
                default: false,
            },
            writeSettings: {
                description:
                    'Specify the write settings (https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)',
                type: 'Object',
                default: {
                    encoding: 'utf8',
                    flag: undefined,
                    mode: 0x666,
                    cast: true,
                    path: undefined,
                },
            },
            readSettings: {
                description:
                    'Specify the read settings (https://nodejs.org/api/fs.html#filehandlereadfileoptions)',
                type: 'Object',
                default: {
                    encoding: 'utf8',
                    flag: undefined,
                    cast: true,
                },
            },
            processors: {
                description:
                    'Specify some functions to execute on the file content before accessing the "content", and saving it "save". Each "content" and "save" property stores an Array of functions that will be executed once after the other',
                type: 'Object',
                default: {
                    content: [],
                    save: [],
                },
            },
        };
    }
}
