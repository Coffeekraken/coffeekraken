// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SCliMonoUpgradeParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar mono.upgrade` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCliMonoUpgradeParamsInterface extends __SInterface {
    static get _definition() {
        return {
            packagesGlobs: {
                description: 'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'Array<String>',
                default: __SSugarConfig.get('monorepo.packagesGlobs'),
            },
            filesToUpgrade: {
                description: 'Specify some files to upgrade in each packages when doing a monorepo.upgrade call',
                type: 'Array<String>',
                default: __SSugarConfig.get('monorepo.filesToUpgrade'),
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyw4QkFBK0IsU0FBUSxZQUFZO0lBQ3BFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLG1GQUFtRjtnQkFDdkYsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO2FBQ3hEO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFDUCxtRkFBbUY7Z0JBQ3ZGLElBQUksRUFBRSxlQUFlO2dCQUNyQixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQzthQUN6RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==