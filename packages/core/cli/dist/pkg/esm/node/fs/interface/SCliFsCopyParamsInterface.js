// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SCliFsCopyParamsInterface
 * @namespace           node.fs.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar fs.copy` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCliFsCopyParamsInterface extends __SInterface {
    static get _definition() {
        return {
            src: {
                description: 'Specify the file/folder to copy',
                type: 'String',
                required: true
            },
            glob: {
                description: 'Specify a glob pattern to search for files inside the specified src"',
                type: 'String',
            },
            dest: {
                description: 'Specify the destination file/folder',
                type: 'String',
                required: true
            },
            chdir: {
                description: 'Specify if you want the process to change directory inside the destination one or not',
                type: 'Boolean',
                default: false
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyx5QkFBMEIsU0FBUSxZQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUFFLHNFQUFzRTtnQkFDbkYsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUFFLHFDQUFxQztnQkFDbEQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLHVGQUF1RjtnQkFDcEcsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=