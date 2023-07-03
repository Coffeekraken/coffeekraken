// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SFrontendServerCorsProxyParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a frontend cors proxy server process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFrontendServerCorsProxyParamsInterface extends __SInterface {
    static get _definition() {
        return {
            port: {
                description: 'Specify the port on which to run the proxy',
                type: 'Number',
                default: __SSugarConfig.get('frontendServer.corsProxy.port'),
            },
            targetUrlHeaderName: {
                description: 'Specifyheader name to use as the target url',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.corsProxy.targetUrlHeaderName'),
            },
            limit: {
                description: 'Specify the limit request size to process',
                type: 'String',
                default: __SSugarConfig.get('frontendServer.corsProxy.limit'),
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyx1Q0FBd0MsU0FBUSxZQUFZO0lBQzdFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUFFLDRDQUE0QztnQkFDekQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUM7YUFDL0Q7WUFDRCxtQkFBbUIsRUFBRTtnQkFDakIsV0FBVyxFQUFFLDZDQUE2QztnQkFDMUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQ3ZCLDhDQUE4QyxDQUNqRDthQUNKO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSwyQ0FBMkM7Z0JBQ3hELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO2FBQ2hFO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9