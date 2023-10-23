import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SClipboardCopyComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SClipboardCopyComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SClipboardCopyComponentInterface extends __SInterface {
    static get _definition() {
        return {
            from: {
                description:
                    'Specify the element you want to copy from with a simple css selector. Try to get "value" first, then "innerHTML"',
                type: 'String',
            },
            successTimeout: {
                description:
                    'Specify the duration for displaying the "success" icon',
                type: 'Number',
                default: 700,
            },
            errorTimeout: {
                description:
                    'Specify the duration for displaying the "error" icon',
                type: 'Number',
                default: 3000,
            },
        };
    }
}
