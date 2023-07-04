import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SDocServeParamsInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @status              beta
 * @platform             node
 * @interface
 *
 * This class represent the settings of the SDoc serve class method params
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocServeParamsInterface extends __SInterface {
    static get _definition() {
        return {
            port: {
                type: 'Number',
                description: 'Specify the port on which to run the SDoc server',
                default: __SSugarConfig.get('doc.server.port'),
            },
        };
    }
}
export default SDocServeParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sd0JBQXlCLFNBQVEsWUFBWTtJQUMvQyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxrREFBa0Q7Z0JBQy9ELE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO2FBQ2pEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELGVBQWUsd0JBQXdCLENBQUMifQ==