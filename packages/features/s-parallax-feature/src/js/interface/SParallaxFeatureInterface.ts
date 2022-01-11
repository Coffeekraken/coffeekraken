import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SParallaxFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SParallaxFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export default class SParallaxFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            amount: {
                description: 'Specify the amount of parallax you want to apply',
                type: 'Number',
                default: 1,
            },
            amountX: {
                description:
                    'Specify the amount of parallax you want for the x axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountY: {
                description:
                    'Specify the amount of parallax you want for the y axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountTranslateX: {
                description:
                    'Specify the amount of parallax you want for the translate x axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountTranslateY: {
                description:
                    'Specify the amount of parallax you want for the translate y axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountRotateX: {
                description:
                    'Specify the amount of parallax you want for the rotate x axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
            amountRotateY: {
                description:
                    'Specify the amount of parallax you want for the rotate y axis. This will be applied on top of the global amount',
                type: 'Number',
                default: 1,
            },
        };
    }
}
