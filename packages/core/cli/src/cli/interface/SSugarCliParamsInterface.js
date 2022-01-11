import __SInterface from '@coffeekraken/s-interface';
import __SLog from '@coffeekraken/s-log';
/**
 * @name                SSugarCliParamsInterface
 * @namespace           cli.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SSugarCli class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SSugarCliParamsInterface extends __SInterface {
    static get _definition() {
        return {
            bench: {
                type: {
                    type: 'Array<String> | Boolean',
                    splitChars: [','],
                },
                default: false,
                explicit: true,
            },
            logPreset: {
                type: 'String',
                values: __SLog.PRESETS,
                default: 'default',
                explicit: true,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQ2xpUGFyYW1zSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N1Z2FyQ2xpUGFyYW1zSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUseUJBQXlCO29CQUMvQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTztnQkFDdEIsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9