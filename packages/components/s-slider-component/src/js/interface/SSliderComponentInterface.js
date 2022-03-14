import __SInterface from '@coffeekraken/s-interface';
import __easeOutQuad from '@coffeekraken/sugar/shared/easing/easeOutQuad';
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
            behavior: {
                description: 'Specify which behavior your want to use for your slider. Behavior are like "presets" with different animations, etc...',
                type: 'Object',
                default: undefined
            },
            nextIconClass: {
                description: 'Specify the class of the next icon',
                type: 'String'
            },
            previousIconClass: {
                description: 'Specify the class of the previous icon',
                type: 'String'
            },
            controls: {
                description: 'Specify if you want to display the controls or not. Controls are the previous and next icons',
                type: 'Boolean',
                default: false,
            },
            slidesByPage: {
                description: 'Specify how many items a slider "page" contains. By default it\'s 1',
                type: 'Number',
                default: 1
            },
            intersectionClasses: {
                description: 'Specify if you want the classes that describe each slide intersection classes like "in-10", "in-20", etc...',
                type: 'Boolean',
                default: true
            },
            transitionDuration: {
                description: 'Specify the transition duration of the slider in ms',
                type: 'Number',
                default: 500
            },
            transitionEasing: {
                description: 'Specify the transition easing of the slider',
                type: 'Function',
                default: __easeOutQuad
            },
            transitionHandler: {
                description: 'Specify a function that will take care of transitioning the slider from the current item to the next/previous',
                type: 'Function'
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NsaWRlckNvbXBvbmVudEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTbGlkZXJDb21wb25lbnRJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxhQUFhLE1BQU0sK0NBQStDLENBQUM7QUFFMUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyx5QkFBMEIsU0FBUSxZQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVyxFQUFFLGlFQUFpRTtnQkFDOUUsTUFBTSxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQztnQkFDbEMsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLFlBQVk7YUFDeEI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLHdIQUF3SDtnQkFDckksSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFNBQVM7YUFDckI7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLG9DQUFvQztnQkFDakQsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixXQUFXLEVBQUUsd0NBQXdDO2dCQUNyRCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsOEZBQThGO2dCQUMzRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQUUscUVBQXFFO2dCQUNsRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ2pCLFdBQVcsRUFBRSw2R0FBNkc7Z0JBQzFILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2hCLFdBQVcsRUFBRSxxREFBcUQ7Z0JBQ2xFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxHQUFHO2FBQ2Y7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxXQUFXLEVBQUUsNkNBQTZDO2dCQUMxRCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLGFBQWE7YUFDekI7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixXQUFXLEVBQUUsK0dBQStHO2dCQUM1SCxJQUFJLEVBQUUsVUFBVTthQUNuQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==