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
                description:
                    'Specify the slider direction. Can be `horizontal` or `vertical`',
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
                description:
                    'Specify which behavior your want to use for your slider. Behavior are like "presets" with different animations, etc...',
                values: ['none', 'scroll', 'transform'],
                type: 'String',
                default: 'scroll',
                physical: true,
            },
            pad: {
                type: 'Boolean',
                description:
                    'Specify if you want to pad the slides if for example the first slide does not take the while width of the slider, a padding-(block|inline)-start will be applied to center this first slide. Same for the last one',
                default: false,
            },
            nextIconClass: {
                description: 'Specify the class of the next icon',
                type: 'String',
            },
            previousIconClass: {
                description: 'Specify the class of the previous icon',
                type: 'String',
            },
            uiContainer: {
                description:
                    'Specify if you want an "s-container:..." class applied on the .s-slider_ui element',
                type: 'String|Boolean',
            },
            controls: {
                description:
                    'Specify if you want to display the controls or not. Controls are the previous and next icons',
                type: 'Boolean',
                default: false,
            },
            nav: {
                description:
                    'Specify if you want to display the nav or not. Nav are the dots',
                type: 'Boolean',
                default: false,
            },
            swipe: {
                description:
                    'Specify if you want your slider to support swipe navigation or not',
                type: 'Boolean',
                default: false,
            },
            mousewheel: {
                description:
                    'Specify if you want to enable the mousewheel event on the slider or not',
                type: 'Boolean',
                default: false,
            },
            clickOnSlide: {
                description:
                    'Specify if you want to enable the click on the slides to navigate or not',
                type: 'Boolean',
                default: false,
            },
            loop: {
                description:
                    'Specify if you want to enable the loop behavior or not',
                type: 'Boolean',
                default: false,
            },
            slide: {
                description: 'Specify the active slide id',
                type: 'Number',
                default: 0,
                physical: true,
            },
            slidesByPage: {
                description:
                    'Specify how many slides you want by page. Pages are what is used to construct the dot nav and will determine how many slides will be passed on "next" and "previous"',
                type: 'Number',
                default: 1,
            },
            progress: {
                description:
                    'Specify if you want to display the progress bar or not',
                type: 'Boolean',
                default: false,
            },
            timer: {
                description:
                    'Specify a timer that will be applied on each slides and go to the next one after the timer is over. For custom timer by slide, specify the `timer="1200"` attribute on the slides you want',
                type: 'Number',
            },
            autoplay: {
                description:
                    'Specify if you want the slider to auto play itself when some timer(s) has been set',
                type: 'Boolean',
                default: true,
            },
            intersectionClasses: {
                description:
                    'Specify if you want the classes that describe each slide intersection classes like "in-10", "in-20", etc...',
                type: 'Boolean',
                default: false,
            },
            transitionDuration: {
                description:
                    'Specify the transition duration of the slider in ms',
                type: 'Number',
                default: 500,
            },
            transitionEasing: {
                description: 'Specify the transition easing of the slider',
                type: 'Function',
                default: __easeOutQuad,
            },
            transitionHandler: {
                description:
                    'Specify a function that will take care of transitioning the slider from the current item to the next/previous',
                type: 'Function',
            },
        };
    }
}
