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
                default: true
            },
            nodir: {
                description: 'Specify if you want to ignore directories or not',
                type: 'Boolean',
                default: false
            },
            contentRegExp: {
                description: 'Specify a regex to use on the file content to filter resolved files',
                type: 'RegExp'
            },
            SFile: {
                description: 'Specify if you want back some SFile instances or simple string path',
                type: 'Boolean',
                default: true
            },
            exclude: {
                description: 'Specify some paths or patterns you want to exclude from your resolve process',
                type: 'Array<String>',
                default: []
            },
            defaultExcludes: {
                description: 'Specfy if you want to use the default excludes globs setted under the config.storage.exclude configuration',
                type: 'Boolean',
                default: true
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dsb2JTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNHbG9iU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLHNCQUF1QixTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsc0RBQXNEO2dCQUNuRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTthQUN6QjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsa0RBQWtEO2dCQUMvRCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQUUscUVBQXFFO2dCQUNsRixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUscUVBQXFFO2dCQUNsRixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQUUsOEVBQThFO2dCQUMzRixJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQUUsNEdBQTRHO2dCQUN6SCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==