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
            position: {
                description: 'Specify the placement of your floating element. By default it will try to be placed as good as possible.',
                type: 'String',
                values: [
                    'top',
                    'right',
                    'bottom',
                    'left',
                    'top-start',
                    'top-end',
                    'right-start',
                    'right-end',
                    'bottom-start',
                    'bottom-end',
                    'left-start',
                    'left-end',
                    'auto',
                ],
                default: 'auto',
            },
            shift: {
                description: 'Specify a space between the floating element and the viewport side to respect',
                type: 'Number',
                default: 10,
            },
            offset: {
                description: 'Specify a space between the floating element and the reference one to respect',
                type: 'Number',
            },
            arrow: {
                description: 'Specify if you want an arrow or not',
                type: 'Boolean',
                default: true,
            },
            arrowSize: {
                description: 'Specify the size of the arrow in px',
                type: 'Number',
                default: 15,
            },
            arrowPadding: {
                description: 'Specify the padding of the arrow in px',
                type: 'Number',
                default: 10,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8seUJBQTBCLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFDUCx3SUFBd0k7Z0JBQzVJLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCwwR0FBMEc7Z0JBQzlHLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRTtvQkFDSixLQUFLO29CQUNMLE9BQU87b0JBQ1AsUUFBUTtvQkFDUixNQUFNO29CQUNOLFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxhQUFhO29CQUNiLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxZQUFZO29CQUNaLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixNQUFNO2lCQUNUO2dCQUNELE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCwrRUFBK0U7Z0JBQ25GLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLHFDQUFxQztnQkFDbEQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLHFDQUFxQztnQkFDbEQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQUUsd0NBQXdDO2dCQUNyRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9