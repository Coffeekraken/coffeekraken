// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SCliPackageRenameParamsInterface
 * @namespace           node.package.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a process instance usable across the toolkit like in an SCli instance, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCliPackageRenameParamsInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                description: 'Specify the new name for your package',
                type: 'String'
            },
            folder: {
                description: 'Specify if the folder has to be renames as well',
                type: 'Boolean'
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaVBhY2thZ2VSZW5hbWVQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2xpUGFja2FnZVJlbmFtZVBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGdDQUFpQyxTQUFRLFlBQVk7SUFDdEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixXQUFXLEVBQUUsdUNBQXVDO2dCQUNwRCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsaURBQWlEO2dCQUM5RCxJQUFJLEVBQUUsU0FBUzthQUNsQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==