// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SMitosisStartParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to start a mitosis env and build component using the SMitosis class.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SMitosisStartParamsInterface extends __SInterface {
    static get _definition() {
        return {
            targets: {
                type: 'String[]',
                description: 'Specify the targets you want for your build',
                default: ['webcomponent', 'react'],
                values: ['webcomponent', 'react'],
            },
            port: {
                type: 'String',
                description: 'Specify the server port you want for your mitosis environment',
                default: __SSugarConfig.get('mitosis.server.port'),
            },
        };
    }
}
export default SMitosisStartParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sNEJBQTZCLFNBQVEsWUFBWTtJQUNuRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxVQUFVO2dCQUNoQixXQUFXLEVBQUUsNkNBQTZDO2dCQUMxRCxPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDO2dCQUNsQyxNQUFNLEVBQUUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDO2FBQ3BDO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwrREFBK0Q7Z0JBQ25FLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQ3JEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELGVBQWUsNEJBQTRCLENBQUMifQ==