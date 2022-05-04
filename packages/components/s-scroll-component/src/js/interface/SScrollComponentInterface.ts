import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SScrollComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SScrollToComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SScrollComponentInterface extends __SInterface {
    static get _definition() {
        return {
            to: {
                description:
                    'The target when to scroll. Must be a valid css selector',
                type: 'String',
                required: true,
            },
            duration: {
                description: 'Specify the duration of the scroll in ms',
                type: 'number',
                default: 300,
            },
            offset: {
                description:
                    'Specify the offset of the scroll in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: 0,
            },
            offsetX: {
                description:
                    'Specify the offset of the scroll x in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: 0,
            },
            offsetY: {
                description:
                    'Specify the offset of the scroll y in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: 0,
            },
        };
    }
}
