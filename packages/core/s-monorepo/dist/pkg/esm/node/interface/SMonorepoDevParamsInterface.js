// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SMonorepoDevParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar monorepo.dev` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SMonorepoDevParamsInterface extends __SInterface {
    static get _definition() {
        return {
            packagesGlob: {
                description: 'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'String',
                default: __SSugarConfig.get('monorepo.packagesGlob'),
                alias: 'p',
            },
            build: {
                description: 'Specify if you want to build your files like the .ts ones or not',
                type: 'Boolean',
                default: true,
                alias: 'b',
            },
            buildInitial: {
                description: 'Specify if you want to build the files at launch before the watch process take care of the rest',
                type: 'Boolean',
                default: false,
            },
            test: {
                description: 'Specify if you want to run the tests on saved files or not',
                type: 'Boolean',
                default: false,
                alias: 't',
            },
            testInitial: {
                description: 'Specify if you want to test the files at launch before the watch process take care of the rest',
                type: 'Boolean',
                default: false,
            },
            format: {
                description: 'Specify if you want to run the code formatter (SCodeFormatter) on your packages or not',
                type: 'Boolean',
                default: true,
                alias: 'f',
            },
            formatInitial: {
                description: 'Specify if you want to format your files at launch before the watch process take care of the rest',
                type: 'Boolean',
                default: false,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTywyQkFBNEIsU0FBUSxZQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLG1GQUFtRjtnQkFDdkYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7Z0JBQ3BELEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLGtFQUFrRTtnQkFDdEUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1AsaUdBQWlHO2dCQUNyRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQ1AsNERBQTREO2dCQUNoRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFDUCxnR0FBZ0c7Z0JBQ3BHLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCx3RkFBd0Y7Z0JBQzVGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2dCQUNiLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLG1HQUFtRztnQkFDdkcsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=