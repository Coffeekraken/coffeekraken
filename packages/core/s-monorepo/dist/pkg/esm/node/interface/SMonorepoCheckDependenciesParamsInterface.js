// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import { __SPackageCheckDependenciesParamsInterface } from '@coffeekraken/s-package';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SMonorepoCheckDependenciesParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar monorepo.checkDependencies` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SMonorepoCheckDependenciesParamsInterface extends __SInterface {
    static get _definition() {
        return Object.assign({ packagesGlob: {
                description: 'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'String',
                default: __SSugarConfig.get('monorepo.packagesGlob'),
            } }, __SPackageCheckDependenciesParamsInterface.definition);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsMENBQTBDLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRixPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyx5Q0FBMEMsU0FBUSxZQUFZO0lBQy9FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLHVCQUNJLFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1AsbUZBQW1GO2dCQUN2RixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQzthQUN2RCxJQUNFLDBDQUEwQyxDQUFDLFVBQVUsRUFDMUQ7SUFDTixDQUFDO0NBQ0oifQ==