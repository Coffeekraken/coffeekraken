import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SKitchenRunInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @status              beta
 * @platform             node
 * @interface
 *
 * This class represent the interface that describe parameters of the SKitchen.action method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SKitchenRunInterface extends __SInterface {
    static get _definition() {
        return {
            stack: {
                description: 'Specify the recipe stack you want to launch',
                type: 'String',
                alias: 's',
            },
            action: {
                description: 'Specify the action you want to launch',
                type: 'String',
                alias: 'a',
            },
            recipe: {
                description: 'Specify the recipe you want to launch. If not specified, will take the one from the "sugar.json" file, or the default setted in the "kitchen.config.ts" file...',
                type: 'String',
                alias: 'r',
            },
            params: {
                description: 'Specify the action parameters using the cli "--param value" syntax',
                type: 'String',
                alias: 'p',
            },
        };
    }
}
export default SKitchenRunInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sb0JBQXFCLFNBQVEsWUFBWTtJQUMzQyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSw2Q0FBNkM7Z0JBQzFELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLHVDQUF1QztnQkFDcEQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQ1AsaUtBQWlLO2dCQUNySyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxvRUFBb0U7Z0JBQ3hFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsZUFBZSxvQkFBb0IsQ0FBQyJ9