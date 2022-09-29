import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SRatingComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SClipboardCopyComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SRatingComponentInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                description: 'Specify a name that will be attributed to the hidden input created automatically',
                type: 'String',
                default: 'rate',
            },
            value: {
                description: 'Specify a base value for the rating',
                type: 'Number',
                default: 3,
            },
            min: {
                description: 'Specify the minimum rate you accept',
                type: 'Number',
                default: 1,
            },
            max: {
                description: 'Specify the maximum rate you accept',
                type: 'Number',
                default: 5,
            },
            icon: {
                description: 'This works only if you use the "s-icon:..." class notation. Define the icon you want to use',
                type: 'String',
                default: 'star',
            },
            iconClass: {
                description: 'Specify a custom icon class you want to use. If this is set, override the "icon" parameter',
                type: 'String',
            },
            readonly: {
                description: 'Specify if you want your rating component to just display the value and that the user cannot interact with it or not',
                type: 'Boolean',
                default: false,
                physical: true,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8seUJBQTBCLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxrRkFBa0Y7Z0JBQ3RGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLHFDQUFxQztnQkFDbEQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUscUNBQXFDO2dCQUNsRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCw2RkFBNkY7Z0JBQ2pHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCw0RkFBNEY7Z0JBQ2hHLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCxzSEFBc0g7Z0JBQzFILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9