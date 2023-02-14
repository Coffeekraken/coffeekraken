import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SGlitchFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SGlitch feature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SGlitchFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            fps: {
                type: 'Number',
                description: 'Specify the frames per second of the render',
                default: 30,
            },
            minTimeout: {
                type: 'Number',
                description:
                    'Specify the min timeout between the glitches phase in ms',
                default: 0,
            },
            maxTimeout: {
                type: 'Number',
                description:
                    'Specify the max timeout between the glitches phase in ms',
                default: 5000,
            },
            minDuration: {
                type: 'Number',
                description: 'Specify the min glitch duration in ms',
                default: 100,
            },
            maxDuration: {
                type: 'Number',
                description: 'Specify the max glitch duration in ms',
                default: 2000,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sdUJBQXdCLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSw2Q0FBNkM7Z0JBQzFELE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLDBEQUEwRDtnQkFDOUQsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsMERBQTBEO2dCQUM5RCxPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELFdBQVcsRUFBRTtnQkFDVCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsdUNBQXVDO2dCQUNwRCxPQUFPLEVBQUUsR0FBRzthQUNmO1lBQ0QsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSx1Q0FBdUM7Z0JBQ3BELE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9
