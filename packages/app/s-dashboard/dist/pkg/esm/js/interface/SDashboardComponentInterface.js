import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SDashboardComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @status              beta
 * @platform             node
 * @interface
 *
 * This class represent the settings of the SDashboardComponent class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDashboardComponentInterface extends __SInterface {
    static get _definition() {
        return {
            layout: {
                type: 'Array',
                description: 'Specify the layout you want for your dashboard. First level array are the columns, then nested arrays are rows of widgets',
                default: [],
            },
            widgets: {
                description: 'Specify each widget settings if wanted to customize default behaviors',
                type: 'Object',
                default: {},
            },
        };
    }
}
export default SDashboardComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sNEJBQTZCLFNBQVEsWUFBWTtJQUNuRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxPQUFPO2dCQUNiLFdBQVcsRUFDUCwySEFBMkg7Z0JBQy9ILE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHVFQUF1RTtnQkFDM0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxlQUFlLDRCQUE0QixDQUFDIn0=