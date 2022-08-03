// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SGlobSettingsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface represent the SGlob settings.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SGlobSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            cwd: {
                description: 'Specify the working directory to run the command in.',
                type: 'String',
                default: process.cwd(),
            },
            symlinks: {
                description: 'Specify if you want to follow symlinks or not',
                type: 'Boolean',
                default: true,
            },
            nodir: {
                description: 'Specify if you want to ignore directories or not',
                type: 'Boolean',
                default: false,
            },
            contentRegExp: {
                description: 'Specify a regex to use on the file content to filter resolved files',
                type: 'RegExp',
            },
            SFile: {
                description: 'Specify if you want back some SFile instances or simple string path',
                type: 'Boolean',
                default: true,
            },
            exclude: {
                description: 'Specify some paths or patterns you want to exclude from your resolve process',
                type: 'Array<String>',
                default: [],
            },
            defaultExcludes: {
                description: 'Specfy if you want to use the default excludes globs setted under the config.storage.exclude configuration',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxzQkFBdUIsU0FBUSxZQUFZO0lBQzVELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUNQLHNEQUFzRDtnQkFDMUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7YUFDekI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLCtDQUErQztnQkFDNUQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLGtEQUFrRDtnQkFDL0QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLHFFQUFxRTtnQkFDekUsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLHFFQUFxRTtnQkFDekUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLDhFQUE4RTtnQkFDbEYsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsV0FBVyxFQUNQLDRHQUE0RztnQkFDaEgsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=