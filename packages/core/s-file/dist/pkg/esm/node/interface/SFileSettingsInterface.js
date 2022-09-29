import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SFileSettingsInterface
 * @namespace           node.interface
 * @type                      Class
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sc0JBQXVCLFNBQVEsWUFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFDUCx3RUFBd0U7Z0JBQzVFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSx1Q0FBdUM7Z0JBQ3BELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO2FBQ3pCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLDBEQUEwRDtnQkFDOUQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLG1HQUFtRztnQkFDdkcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFO29CQUNMLFFBQVEsRUFBRSxNQUFNO29CQUNoQixJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsS0FBSztvQkFDWCxJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsU0FBUztpQkFDbEI7YUFDSjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1Asc0ZBQXNGO2dCQUMxRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0wsUUFBUSxFQUFFLE1BQU07b0JBQ2hCLElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxJQUFJO2lCQUNiO2FBQ0o7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUNQLHdOQUF3TjtnQkFDNU4sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFO29CQUNMLE9BQU8sRUFBRSxFQUFFO29CQUNYLElBQUksRUFBRSxFQUFFO2lCQUNYO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=