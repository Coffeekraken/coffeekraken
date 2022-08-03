"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class SFileSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            checkExistence: {
                description: 'Specify if the file must exists on the filesystem at the instanciation',
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
                description: 'Specify if you want to watch the file for changes or not',
                type: 'Boolean',
                default: false,
            },
            writeSettings: {
                description: 'Specify the write settings (https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)',
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
                description: 'Specify the read settings (https://nodejs.org/api/fs.html#filehandlereadfileoptions)',
                type: 'Object',
                default: {
                    encoding: 'utf8',
                    flag: undefined,
                    cast: true,
                },
            },
            processors: {
                description: 'Specify some functions to execute on the file content before accessing the "content", and saving it "save". Each "content" and "save" property stores an Array of functions that will be executed once after the other',
                type: 'Object',
                default: {
                    content: [],
                    save: [],
                },
            },
        };
    }
}
exports.default = SFileSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHNCQUF1QixTQUFRLHFCQUFZO0lBQzVELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUNQLHdFQUF3RTtnQkFDNUUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLHVDQUF1QztnQkFDcEQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7YUFDekI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsMERBQTBEO2dCQUM5RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQ1AsbUdBQW1HO2dCQUN2RyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0wsUUFBUSxFQUFFLE1BQU07b0JBQ2hCLElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxLQUFLO29CQUNYLElBQUksRUFBRSxJQUFJO29CQUNWLElBQUksRUFBRSxTQUFTO2lCQUNsQjthQUNKO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFDUCxzRkFBc0Y7Z0JBQzFGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRTtvQkFDTCxRQUFRLEVBQUUsTUFBTTtvQkFDaEIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLElBQUk7aUJBQ2I7YUFDSjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQ1Asd05BQXdOO2dCQUM1TixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0wsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLEVBQUU7aUJBQ1g7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUExREQseUNBMERDIn0=