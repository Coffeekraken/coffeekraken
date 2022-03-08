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
            slideable: {
                description: 'Specify if the slider is slideable or not',
                type: 'Boolean',
                physical: true,
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
