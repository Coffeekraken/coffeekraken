import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SDocComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SDocComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDocComponentInterface extends __SInterface {
    static get _definition() {
        return {
            endpoints: {
                type: 'Object',
                description: 'Specify the doc endpoints url',
                default: __SSugarConfig.get('doc.endpoints'),
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sc0JBQXVCLFNBQVEsWUFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSwrQkFBK0I7Z0JBQzVDLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQzthQUMvQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==