// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SPackageCheckDependenciesParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar package.checkDependencies` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPackageCheckDependenciesParamsInterface extends __SInterface {
    static get _definition() {
        return {
            dirs: {
                description: 'Specify the directories in which to check for dependencies issues, etc...',
                type: 'String[]',
                default: __SSugarConfig.get('package.checkDependencies.dirs'),
                alias: 'd',
            },
            installMissing: {
                description: 'Specify if you would like to install missing dependencies.',
                type: 'Boolean',
                default: undefined,
                alias: 'i',
            },
            packagesMap: {
                description: 'Specify some package name patterns to add in package.json without installin them. Usefull for monorepo with packages that are not published yet.',
                type: 'Object',
                default: __SSugarConfig.get('package.checkDependencies.packagesMap'),
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyx3Q0FBeUMsU0FBUSxZQUFZO0lBQzlFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLDJFQUEyRTtnQkFDL0UsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO2dCQUM3RCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFdBQVcsRUFDUCw0REFBNEQ7Z0JBQ2hFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFDUCxrSkFBa0o7Z0JBQ3RKLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUN2Qix1Q0FBdUMsQ0FDMUM7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==