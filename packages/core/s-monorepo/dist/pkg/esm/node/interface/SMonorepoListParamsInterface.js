// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SMonorepoListParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar mono.list` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SMonorepoListParamsInterface extends __SInterface {
    static get _definition() {
        return {
            packagesGlob: {
                description: 'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'String',
                default: __SSugarConfig.get('monorepo.packagesGlob'),
                alias: 'g',
            },
            json: {
                description: 'Specify if you want the list into a json object',
                type: 'Boolean',
                default: false,
                alias: 'j',
            },
            publish: {
                description: 'Specigy if you want the packages that will be published, not published or both by letting this undefined',
                type: 'Boolean',
                alias: 'p',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyw0QkFBNkIsU0FBUSxZQUFZO0lBQ2xFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLG1GQUFtRjtnQkFDdkYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7Z0JBQ3BELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AsMEdBQTBHO2dCQUM5RyxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9