import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SWysiwygComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SWysiwygComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SWysiwygComponentInterface extends __SInterface {
    static get _definition() {
        return {
            frontspec: {
                type: 'Boolean',
                description:
                    'Specify if you would like to use the "typo" stack of the frontspec',
                default: false,
            },
        };
    }
}
