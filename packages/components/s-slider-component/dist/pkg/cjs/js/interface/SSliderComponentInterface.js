"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const easing_1 = require("@coffeekraken/sugar/easing");
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
class SSliderComponentInterface extends s_interface_1.default {
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
                default: {},
            },
            behavior: {
                description: 'Specify which behavior your want to use for your slider. Behavior are like "presets" with different animations, etc...',
                values: ['none', 'scroll', 'transform'],
                type: 'String',
                default: 'scroll',
                physical: true,
            },
            pad: {
                type: 'Boolean',
                description: 'Specify if you want to pad the slides if for example the first slide does not take the while width of the slider, a padding-(block|inline)-start will be applied to center this first slide. Same for the last one',
                default: true,
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
                default: easing_1.__easeOutQuad,
            },
            transitionHandler: {
                description: 'Specify a function that will take care of transitioning the slider from the current item to the next/previous',
                type: 'Function',
            },
        };
    }
}
exports.default = SSliderComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELHVEQUEyRDtBQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQix5QkFBMEIsU0FBUSxxQkFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxpRUFBaUU7Z0JBQ3JFLE1BQU0sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUM7Z0JBQ2xDLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxZQUFZO2FBQ3hCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLHdIQUF3SDtnQkFDNUgsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUM7Z0JBQ3ZDLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1Asb05BQW9OO2dCQUN4TixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQUUsb0NBQW9DO2dCQUNqRCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLFdBQVcsRUFBRSx3Q0FBd0M7Z0JBQ3JELElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCw4RkFBOEY7Z0JBQ2xHLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFDUCxpRUFBaUU7Z0JBQ3JFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxvRUFBb0U7Z0JBQ3hFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCx5RUFBeUU7Z0JBQzdFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFDUCwwRUFBMEU7Z0JBQzlFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCx3REFBd0Q7Z0JBQzVELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSw2QkFBNkI7Z0JBQzFDLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCx3REFBd0Q7Z0JBQzVELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCw0TEFBNEw7Z0JBQ2hNLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCxvRkFBb0Y7Z0JBQ3hGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ2pCLFdBQVcsRUFDUCw2R0FBNkc7Z0JBQ2pILElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2hCLFdBQVcsRUFDUCxxREFBcUQ7Z0JBQ3pELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxHQUFHO2FBQ2Y7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxXQUFXLEVBQUUsNkNBQTZDO2dCQUMxRCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLHNCQUFhO2FBQ3pCO1lBQ0QsaUJBQWlCLEVBQUU7Z0JBQ2YsV0FBVyxFQUNQLCtHQUErRztnQkFDbkgsSUFBSSxFQUFFLFVBQVU7YUFDbkI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBekhELDRDQXlIQyJ9