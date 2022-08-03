import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SColorSettingsInterface
 * @namespace           shared.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 * @platform        js
 *
 * This interface represent the settings of an SColor instance.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SColorSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            returnNewInstance: {
                description: 'Specify if the methods returns by default a new SColor instance or the same',
                type: 'boolean',
                default: false
            },
            defaultFormat: {
                description: 'Specify the default format of the color',
                type: 'String',
                values: ['hex', 'rgb', 'rgba', 'hsl', 'hsla'],
                default: 'hex'
            }
        };
    }
}
export default SColorSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLHVCQUF3QixTQUFRLFlBQVk7SUFDOUMsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILGlCQUFpQixFQUFFO2dCQUNmLFdBQVcsRUFBRSw2RUFBNkU7Z0JBQzFGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFBRSx5Q0FBeUM7Z0JBQ3RELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLENBQUM7Z0JBQ3pDLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELGVBQWUsdUJBQXVCLENBQUMifQ==