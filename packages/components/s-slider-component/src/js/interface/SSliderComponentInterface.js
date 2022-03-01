import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SSliderComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SSliderComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SSliderComponentInterface extends __SInterface {
    static get _definition() {
        return {
            direction: {
                description: 'Specify the slider direction. Can be `horizontal` or `vertical`',
                values: ['horizontal', 'vertical'],
                type: 'String',
                physical: true,
                default: 'horizontal',
            },
            itemsByPage: {
                description: 'Specify how many items a slider "page" contains. By default it\'s 1',
                type: 'Number',
                default: 1
            },
            sideReveal: {
                description: 'Specify the amount of "previous" and "next" item to display',
                type: 'String',
                default: '0px'
            },
            scrollable: {
                description: 'Specify if the slider is scrollable or not',
                type: 'Boolean',
                physical: true,
                default: true
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NsaWRlckNvbXBvbmVudEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTbGlkZXJDb21wb25lbnRJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyx5QkFBMEIsU0FBUSxZQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLGlFQUFpRTtnQkFDOUUsTUFBTSxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQztnQkFDbEMsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLFlBQVk7YUFDeEI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLHFFQUFxRTtnQkFDbEYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQUUsNkRBQTZEO2dCQUMxRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQUUsNENBQTRDO2dCQUN6RCxJQUFJLEVBQUUsU0FBUztnQkFDZixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==