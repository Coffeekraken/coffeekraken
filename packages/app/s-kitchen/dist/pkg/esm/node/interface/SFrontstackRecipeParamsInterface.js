import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SFrontstackRecipeParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SFrontstack.action method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SFrontstackRecipeParamsInterface extends __SInterface {
    static get _definition() {
        return {
            stack: {
                description: 'Specify the stack you want to execute like "dev", "build", etc...',
                type: 'String',
                alias: 's',
            },
            recipe: {
                description: 'Specify the recipe you want to execute the stack from',
                type: 'String',
                alias: 'r',
            },
            runInParallel: {
                description: 'Specify if you want the recipe actions to run in parallel of not',
                type: 'Boolean',
                alias: 'p'
            },
            env: {
                description: 'Specify the environment in which to execute your recipe',
                type: 'String',
            },
        };
    }
}
export default SFrontstackRecipeParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxtRUFBbUU7Z0JBQ3ZFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLHVEQUF1RDtnQkFDM0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQUUsa0VBQWtFO2dCQUMvRSxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdELElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELGVBQWUsZ0NBQWdDLENBQUMifQ==