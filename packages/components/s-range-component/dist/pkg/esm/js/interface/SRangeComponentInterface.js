import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SRangeComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SRangeComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SRangeComponentInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                description: 'Specify the name to assign to the internal input[type="range"]',
            },
            value: {
                type: 'Number',
                description: 'Specify the initial range value',
            },
            min: {
                type: 'Number',
                description: 'Specify the minimal value or the range',
                default: 0,
            },
            max: {
                type: 'Number',
                description: 'Specify the maximal value of the range',
                default: 100,
            },
            step: {
                type: 'Number',
                description: 'Specify the steps between each values',
            },
            target: {
                type: 'String',
                description: 'Specify a css selector of any HTMLElement or HTMLInputElement in which to inject the value when the range is updated',
            },
            tooltip: {
                type: 'Boolean',
                description: 'Specify if you want to display the value inside a tooltip on top of the thumb',
                default: false,
            },
            disabled: {
                type: 'Boolean',
                description: 'Specify if this range is disabled',
                default: false,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxnRUFBZ0U7YUFDdkU7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGlDQUFpQzthQUNqRDtZQUNELEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsd0NBQXdDO2dCQUNyRCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSx3Q0FBd0M7Z0JBQ3JELE9BQU8sRUFBRSxHQUFHO2FBQ2Y7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLHVDQUF1QzthQUN2RDtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1Asc0hBQXNIO2FBQzdIO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCwrRUFBK0U7Z0JBQ25GLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSxtQ0FBbUM7Z0JBQ2hELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9