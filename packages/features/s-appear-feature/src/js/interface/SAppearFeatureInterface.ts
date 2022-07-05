import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SAppearFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SAppearFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SAppearFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            in: {
                description:
                    'Specify the animation you want to use to display your element',
                type: 'String',
                default: 'fade',
                physical: true,
            },
            out: {
                description:
                    'Specify the animation you want to use to hide your item',
                type: 'String',
                physical: true,
            },
            delay: {
                description:
                    'Specify a delay before animation in or out your element',
                type: 'number',
            },
            appear: {
                description:
                    'Specify if the element has to appear. This is usually setted automatically when needed',
                type: 'Boolean',
                default: false,
                physical: true,
            },
        };
    }
}
