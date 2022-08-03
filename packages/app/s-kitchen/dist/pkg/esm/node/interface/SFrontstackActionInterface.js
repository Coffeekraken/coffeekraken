import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SFrontstackActionInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @status              beta
 * @platform             node
 * @interface
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
class SFrontstackActionInterface extends __SInterface {
    static get _definition() {
        return {
            action: {
                description: 'Specify the action you want to launch',
                type: 'String',
                requried: true,
            },
            params: {
                description: 'Specify the action parameters using the cli "--param value" syntax',
                type: 'String',
                alias: 'p',
            },
        };
    }
}
export default SFrontstackActionInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sMEJBQTJCLFNBQVEsWUFBWTtJQUNqRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSx1Q0FBdUM7Z0JBQ3BELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCxvRUFBb0U7Z0JBQ3hFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsZUFBZSwwQkFBMEIsQ0FBQyJ9