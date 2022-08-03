import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SSidePanelComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SSidePanelComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SSidePanelComponentInterface extends __SInterface {
    static get _definition() {
        return {
            side: {
                description: 'Specify the side where to display the panel. Can be "top","left","bottom" or "right"',
                type: 'String',
                values: ['top', 'left', 'bottom', 'right'],
                default: 'left',
            },
            active: {
                description: 'Specify the panel initial state',
                type: 'Boolean',
                default: false,
            },
            overlay: {
                description: 'Specify if you want an "overlay" between the panel and your content',
                type: 'Boolean',
                default: false,
            },
            triggerer: {
                description: 'Specify a css selector that targets the elements in your UI you want to open the panel on click',
                type: 'String',
            },
            closeOn: {
                description: 'Specify which "action(s)" close the panel. Valid values are "click" or/and "escape"',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: ['click', 'escape'],
                default: ['click', 'escape'],
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sNEJBQTZCLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxzRkFBc0Y7Z0JBQzFGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQztnQkFDMUMsT0FBTyxFQUFFLE1BQU07YUFDbEI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHFFQUFxRTtnQkFDekUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUNQLGlHQUFpRztnQkFDckcsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLHFGQUFxRjtnQkFDekYsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7Z0JBQzNCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7YUFDL0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=