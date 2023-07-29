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
            start: {
                type: 'Number',
                title: 'Start',
                description: 'Start degree',
                default: 0,
            },
            end: {
                type: 'Number',
                title: 'End',
                description: 'End degree',
                default: 360,
            },
            max: {
                type: 'Number',
                title: 'Max',
                description: 'Max value',
                default: 100,
            },
            value: {
                type: 'String|Number',
                title: 'Value',
                description: 'Actual value between the min and the max one',
                required: true,
            },
            classes: {
                type: 'Object',
                title: 'Classes',
                description: 'Specify a class to be added if the actual gauge value is above it. The check number has to be a percentage',
                default: {
                    low: 0,
                    medium: 33,
                    high: 66,
                },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxLQUFLO2dCQUNaLFdBQVcsRUFBRSxXQUFXO2dCQUN4QixPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFBRSxjQUFjO2dCQUMzQixPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxLQUFLO2dCQUNaLFdBQVcsRUFBRSxZQUFZO2dCQUN6QixPQUFPLEVBQUUsR0FBRzthQUNmO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxLQUFLO2dCQUNaLFdBQVcsRUFBRSxXQUFXO2dCQUN4QixPQUFPLEVBQUUsR0FBRzthQUNmO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxlQUFlO2dCQUNyQixLQUFLLEVBQUUsT0FBTztnQkFDZCxXQUFXLEVBQUUsOENBQThDO2dCQUMzRCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsU0FBUztnQkFDaEIsV0FBVyxFQUNQLDRHQUE0RztnQkFDaEgsT0FBTyxFQUFFO29CQUNMLEdBQUcsRUFBRSxDQUFDO29CQUNOLE1BQU0sRUFBRSxFQUFFO29CQUNWLElBQUksRUFBRSxFQUFFO2lCQUNYO2FBQ0o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFdBQVcsRUFDUCx3REFBd0Q7Z0JBQzVELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsT0FBTzthQUNuQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==