import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SSugarFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SSugarFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SSugarFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            scrolled: {
                description: 'Specify if you want the `scrolled` class to be applied on the `body` element when the page has been scrolled',
                type: 'Boolean',
                default: true,
            },
            scrolledDelta: {
                description: 'Specify after how many scroll the scrolled class will be applied',
                type: 'Number',
                default: 10,
            },
            vhvar: {
                description: 'Specify if you want the `--vh` css variable to be computed and available',
                type: 'Boolean',
                default: true,
            },
            inputAdditionalAttributes: {
                description: 'Specify if you want to have the additional attributes on inputs like "has-value", "empty" and "dirty" or not',
                type: 'Boolean',
                default: true
            },
            resizeTransmations: {
                description: 'Specify if you want all the transitions and animations cleared during window resize',
                type: 'Boolean',
                default: true
            },
            linksStateAttributes: {
                description: 'Specify if you want to have the state attributes on links like "actual" and "actual-child" or not',
                type: 'Boolean',
                default: true
            },
            preventScrollRestoration: {
                description: 'Specify if you want to prevent the scroll restoration behavior on chrome that can usually be anoying',
                type: 'Boolean',
                default: true
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sc0JBQXVCLFNBQVEsWUFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCw4R0FBOEc7Z0JBQ2xILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCxrRUFBa0U7Z0JBQ3RFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLDBFQUEwRTtnQkFDOUUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCx5QkFBeUIsRUFBRTtnQkFDdkIsV0FBVyxFQUFFLDhHQUE4RztnQkFDM0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxrQkFBa0IsRUFBRTtnQkFDaEIsV0FBVyxFQUFFLHFGQUFxRjtnQkFDbEcsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxvQkFBb0IsRUFBRTtnQkFDbEIsV0FBVyxFQUFFLG1HQUFtRztnQkFDaEgsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCx3QkFBd0IsRUFBRTtnQkFDdEIsV0FBVyxFQUFFLHNHQUFzRztnQkFDbkgsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=