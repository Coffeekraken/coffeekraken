import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SParallaxFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SParallaxFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SParallaxFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            amount: {
                description: 'Specify the amount of parallax you want to apply',
                type: 'Number',
                default: 1,
            },
            amountX: {
                description: 'Specify the amount of parallax you want for the x axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountY: {
                description: 'Specify the amount of parallax you want for the y axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountTranslateX: {
                description: 'Specify the amount of parallax you want for the translate x axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountTranslateY: {
                description: 'Specify the amount of parallax you want for the translate y axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountRotateX: {
                description: 'Specify the amount of parallax you want for the rotate x axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountRotateY: {
                description: 'Specify the amount of parallax you want for the rotate y axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8seUJBQTBCLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxrREFBa0Q7Z0JBQy9ELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUNQLDBHQUEwRztnQkFDOUcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AsMEdBQTBHO2dCQUM5RyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsV0FBVyxFQUNQLG9IQUFvSDtnQkFDeEgsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELGdCQUFnQixFQUFFO2dCQUNkLFdBQVcsRUFDUCxvSEFBb0g7Z0JBQ3hILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLGlIQUFpSDtnQkFDckgsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQ1AsaUhBQWlIO2dCQUNySCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9