import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SSliderSlideableBehaviorInterface
 * @namespace           js.behaviors.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SSliderSlideableBehavior behavior
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SSliderSlideableBehaviorInterface extends __SInterface {
    static get _definition() {
        return {
            friction: {
                description:
                    'Specify the friction to apply when you release the pointer. 1 mean full friction, 0 mean no friction',
                type: 'Number',
                default: 0.7,
            },
        };
    }
}
