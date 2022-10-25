import __SInterface from '@coffeekraken/s-interface';
import { __easeOutQuad } from '@coffeekraken/sugar/easing';
/**
 * @name                SSliderComponentInterface
 * @namespace           js.interface
 * @type                      Class
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLHlCQUEwQixTQUFRLFlBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQ1AsaUVBQWlFO2dCQUNyRSxNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDO2dCQUNsQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsWUFBWTthQUN4QjtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQUUsZ0RBQWdEO2dCQUM3RCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQ1Asd0hBQXdIO2dCQUM1SCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDO2dCQUMzQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsU0FBUztnQkFDbEIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLG9DQUFvQztnQkFDakQsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixXQUFXLEVBQUUsd0NBQXdDO2dCQUNyRCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQ1AsOEZBQThGO2dCQUNsRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQ1AsaUVBQWlFO2dCQUNyRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1Asb0VBQW9FO2dCQUN4RSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQ1AseUVBQXlFO2dCQUM3RSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1AsMEVBQTBFO2dCQUM5RSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQ1Asd0RBQXdEO2dCQUM1RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsNkJBQTZCO2dCQUMxQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQztnQkFDVixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQ1Asd0RBQXdEO2dCQUM1RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsNExBQTRMO2dCQUNoTSxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQ1Asb0ZBQW9GO2dCQUN4RixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELG1CQUFtQixFQUFFO2dCQUNqQixXQUFXLEVBQ1AsNkdBQTZHO2dCQUNqSCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGtCQUFrQixFQUFFO2dCQUNoQixXQUFXLEVBQ1AscURBQXFEO2dCQUN6RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsR0FBRzthQUNmO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsV0FBVyxFQUFFLDZDQUE2QztnQkFDMUQsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRSxhQUFhO2FBQ3pCO1lBQ0QsaUJBQWlCLEVBQUU7Z0JBQ2YsV0FBVyxFQUNQLCtHQUErRztnQkFDbkgsSUFBSSxFQUFFLFVBQVU7YUFDbkI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=