import __SInterface from '@coffeekraken/s-interface';
import __SLog from '@coffeekraken/s-log';
/**
 * @name                SSugarCliParamsInterface
 * @namespace           cli.interface
 * @type                      Class
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SSugarCliParamsInterface extends __SInterface {
    static get _definition() {
        return {
            bench: {
                type: {
                    type: 'Array<String>|Boolean',
                    splitChars: [','],
                },
                default: false,
                explicit: true,
            },
            verbose: {
                type: 'Boolean',
                default: false,
                explicit: true,
            },
            target: {
                description: 'Specify the target of the build processes. Exposes as a global environment variable to simplify usage of multiple builds that support the "target" param',
                type: 'String',
                values: ['development', 'production'],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsdUJBQXVCO29CQUM3QixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCwwSkFBMEo7Z0JBQzlKLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUM7Z0JBQ3JDLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTztnQkFDdEIsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9