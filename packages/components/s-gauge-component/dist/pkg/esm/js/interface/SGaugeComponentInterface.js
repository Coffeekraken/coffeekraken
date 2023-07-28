import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SGaugeComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SGaugeComponent component
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SGaugeComponentInterface extends __SInterface {
    static get _definition() {
        return {
            min: {
                type: 'Number',
                title: 'Min',
                description: 'Min value',
                default: 0,
            },
            max: {
                type: 'Number',
                title: 'Max',
                description: 'Max value',
                default: 100,
            },
            value: {
                type: 'Number',
                title: 'Value',
                description: 'Actual value between the min and the max one',
                required: true,
            },
            linecap: {
                type: 'String',
                title: 'Linecap',
                description: 'Specify the shape you want a the end of the geuge line',
                values: ['butt', 'square', 'round'],
                default: 'round',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxLQUFLO2dCQUNaLFdBQVcsRUFBRSxXQUFXO2dCQUN4QixPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxLQUFLO2dCQUNaLFdBQVcsRUFBRSxXQUFXO2dCQUN4QixPQUFPLEVBQUUsR0FBRzthQUNmO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFBRSw4Q0FBOEM7Z0JBQzNELFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxTQUFTO2dCQUNoQixXQUFXLEVBQ1Asd0RBQXdEO2dCQUM1RCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQztnQkFDbkMsT0FBTyxFQUFFLE9BQU87YUFDbkI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=