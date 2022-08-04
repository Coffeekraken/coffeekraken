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
            behaviors: {
                description: 'Specify the available behaviors for the slider',
                type: 'Object',
            },
            behavior: {
                description: 'Specify which behavior your want to use for your slider. Behavior are like "presets" with different animations, etc...',
                values: ['none', 'default'],
                type: 'String',
                default: 'default',
                physical: true,
            },
            nextIconClass: {
                description: 'Specify the class of the next icon',
                type: 'String',
            },
            previousIconClass: {
                description: 'Specify the class of the previous icon',
                type: 'String',
            },
            controls: {
                description: 'Specify if you want to display the controls or not. Controls are the previous and next icons',
                type: 'Boolean',
                default: false,
            },
            nav: {
                description: 'Specify if you want to display the nav or not. Nav are the dots',
                type: 'Boolean',
                default: false,
            },
            swipe: {
                description: 'Specify if you want your slider to support swipe navigation or not',
                type: 'Boolean',
                default: false,
            },
            mousewheel: {
                description: 'Specify if you want to enable the mousewheel event on the slider or not',
                type: 'Boolean',
                default: false,
            },
            clickOnSlide: {
                description: 'Specify if you want to enable the click on the slides to navigate or not',
                type: 'Boolean',
                default: false,
            },
            loop: {
                description: 'Specify if you want to enable the loop behavior or not',
                type: 'Boolean',
                default: false,
            },
            slide: {
                description: 'Specify the active slide id',
                type: 'Number',
                default: 0,
                physical: true,
            },
            progress: {
                description: 'Specify if you want to display the progress bar or not',
                type: 'Boolean',
                default: false,
            },
            timer: {
                description: 'Specify a timer that will be applied on each slides and go to the next one after the timer is over. For custom timer by slide, specify the `timer="1200"` attribute on the slides you want',
                type: 'Number',
            },
            autoplay: {
                description: 'Specify if you want the slider to auto play itself when some timer(s) has been set',
                type: 'Boolean',
                default: true,
            },
            intersectionClasses: {
                description: 'Specify if you want the classes that describe each slide intersection classes like "in-10", "in-20", etc...',
                type: 'Boolean',
                default: false,
            },
            transitionDuration: {
                description: 'Specify the transition duration of the slider in ms',
                type: 'Number',
                default: 500,
            },
            transitionEasing: {
                description: 'Specify the transition easing of the slider',
                type: 'Function',
                default: __easeOutQuad,
            },
            transitionHandler: {
                description: 'Specify a function that will take care of transitioning the slider from the current item to the next/previous',
                type: 'Function',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sYUFBYSxNQUFNLCtDQUErQyxDQUFDO0FBRTFFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8seUJBQTBCLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxpRUFBaUU7Z0JBQ3JFLE1BQU0sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7Z0JBQ2xDLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxZQUFZO2FBQ3hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCx3SEFBd0g7Z0JBQzVILE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7Z0JBQzNCLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQUUsb0NBQW9DO2dCQUNqRCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLFdBQVcsRUFBRSx3Q0FBd0M7Z0JBQ3JELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCw4RkFBOEY7Z0JBQ2xHLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFDUCxpRUFBaUU7Z0JBQ3JFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxvRUFBb0U7Z0JBQ3hFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCx5RUFBeUU7Z0JBQzdFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFDUCwwRUFBMEU7Z0JBQzlFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCx3REFBd0Q7Z0JBQzVELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSw2QkFBNkI7Z0JBQzFDLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCx3REFBd0Q7Z0JBQzVELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCw0TEFBNEw7Z0JBQ2hNLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCxvRkFBb0Y7Z0JBQ3hGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ2pCLFdBQVcsRUFDUCw2R0FBNkc7Z0JBQ2pILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2hCLFdBQVcsRUFDUCxxREFBcUQ7Z0JBQ3pELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxHQUFHO2FBQ2Y7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxXQUFXLEVBQUUsNkNBQTZDO2dCQUMxRCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLGFBQWE7YUFDekI7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixXQUFXLEVBQ1AsK0dBQStHO2dCQUNuSCxJQUFJLEVBQUUsVUFBVTthQUNuQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==