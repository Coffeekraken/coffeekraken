import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SComponentUtilsSettingsInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SComponentUtils settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SComponentUtilsSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                description: 'The name of the component/feature that will be used to generate className, etc...',
            },
            interface: {
                description: 'Specify an SInterface class to use as our properties definition',
                type: 'SInterface',
            },
            props: {
                description: 'Specify a properties object to use as our properties definition',
                type: 'Object',
            },
            style: {
                description: 'Specify a style string to use as style to inject for our component',
                type: 'String',
            },
            defaultProps: {
                description: 'Pass an object that act as the default properties value for our component',
                type: 'Object',
            },
            useTagNameForClassName: {
                type: 'Boolean',
                description: 'Specify if the method "className" will generate a class using the node tagName additionaly to the passed "name" setting',
                default: true,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0NBQWlDLFNBQVEsWUFBWTtJQUN0RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxtRkFBbUY7YUFDMUY7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLGlFQUFpRTtnQkFDckUsSUFBSSxFQUFFLFlBQVk7YUFDckI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLGlFQUFpRTtnQkFDckUsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLG9FQUFvRTtnQkFDeEUsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLDJFQUEyRTtnQkFDL0UsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxzQkFBc0IsRUFBRTtnQkFDcEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHlIQUF5SDtnQkFDN0gsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=