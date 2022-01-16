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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SCliFsCopyParamsInterface extends __SInterface {
    static get _definition() {
        return {
            src: {
                description: 'Specify the file/folder to copy',
                type: 'String',
                required: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaUZzQ29weVBhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDbGlGc0NvcHlQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLHlCQUEwQixTQUFRLFlBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsaUNBQWlDO2dCQUM5QyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQUUscUNBQXFDO2dCQUNsRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsdUZBQXVGO2dCQUNwRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==