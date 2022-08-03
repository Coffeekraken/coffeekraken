import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SPostcssBuilderSettingsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe settings of the SPostcssBuilder class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPostcssBuilderSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            postcss: {
                description: 'Specify some postcss configurations',
                type: 'Object',
                default: __SSugarConfig.get('postcssBuilder.postcss'),
            },
            purgecss: {
                description: 'Specify some purgecss configurations',
                type: 'Object',
                default: __SSugarConfig.get('postcssBuilder.purgecss'),
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0NBQWlDLFNBQVEsWUFBWTtJQUN0RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO2FBQ3hEO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSxzQ0FBc0M7Z0JBQ25ELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO2FBQ3pEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9