import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SFloatingFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SFloatingFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFloatingFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            ref: {
                description: 'Specify the reference HTMLElement from which to position the floating one. If not specified, will take the previous element in the DOM',
                type: 'String',
            },
            placement: {
                description: 'Specify the placement of your floating element. By default it will try to be placed as good as possible.',
                type: 'String',
                values: ['top', 'right', 'bottom', 'left', 'top-start', 'top-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'auto'],
                default: 'top'
            },
            shift: {
                description: 'Specify a space between the floating element and the viewport side to respect',
                type: 'Number',
                default: 10
            },
            offset: {
                description: 'Specify a space between the floating element and the reference one to respect',
                type: 'Number'
            },
            arrow: {
                description: 'Specify if you want an arrow or not',
                type: 'Boolean',
                default: true
            },
            arrowSize: {
                description: 'Specify the size of the arrow in px',
                type: 'Number',
                default: 15
            },
            arrowPadding: {
                description: 'Specify the padding of the arrow in px',
                type: 'Number',
                default: 10
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zsb2F0aW5nRmVhdHVyZUludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGbG9hdGluZ0ZlYXR1cmVJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyx5QkFBMEIsU0FBUSxZQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLHdJQUF3STtnQkFDckosSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLDBHQUEwRztnQkFDdkgsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsYUFBYSxFQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsTUFBTSxDQUFDO2dCQUNsSixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsK0VBQStFO2dCQUM1RixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSwrRUFBK0U7Z0JBQzVGLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFLHdDQUF3QztnQkFDckQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==