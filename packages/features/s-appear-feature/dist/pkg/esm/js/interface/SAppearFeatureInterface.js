import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SAppearFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SAppearFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SAppearFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            in: {
                description: 'Specify the animation you want to use to display your element',
                type: 'String',
                default: 'bottom',
                physical: true,
            },
            out: {
                description: 'Specify the animation you want to use to hide your item',
                type: 'String',
                physical: true,
            },
            delay: {
                description: 'Specify a delay before animation in or out your element. Can be an array of two number that define the min delay and the max delay. The real delay will be random between these two numbers',
                type: {
                    type: 'Array<Number>',
                    splitChars: [','],
                },
                default: [500],
            },
            duration: {
                description: 'Specify the duration of the animation in ms. Can be an array of two number that define the min delay and the max duration. The real duration will be random between these two numbers',
                type: {
                    type: 'Array<Number>',
                    splitChars: [','],
                },
                default: [500],
            },
            distance: {
                description: 'Specify the distance that your element will move if you have set an "in" direction. Can be an array of two number that define the min delay and the max distance. The real duration will be random between these two numbers',
                type: {
                    type: 'Array<Number>',
                    splitChars: [','],
                },
                default: [100, 120],
            },
            appear: {
                description: 'Specify if the element has to appear. This is usually setted automatically when needed',
                type: 'Boolean',
                default: false,
                physical: true,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sdUJBQXdCLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsRUFBRSxFQUFFO2dCQUNBLFdBQVcsRUFDUCwrREFBK0Q7Z0JBQ25FLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQ1AseURBQXlEO2dCQUM3RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsNkxBQTZMO2dCQUNqTSxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCx1TEFBdUw7Z0JBQzNMLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUM7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLDhOQUE4TjtnQkFDbE8sSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7YUFDdEI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLHdGQUF3RjtnQkFDNUYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=