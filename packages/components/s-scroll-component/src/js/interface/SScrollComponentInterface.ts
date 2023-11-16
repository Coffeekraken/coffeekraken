import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name                SScrollComponentInterface
 * @namespace           js.interface
 * @type                      Class
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
                default: __STheme.current.get('scroll.duration'),
            },
            offsetX: {
                description:
                    'Specify the offset of the scroll x in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: __STheme.current.get('scroll.offsetX'),
            },
            offsetY: {
                description:
                    'Specify the offset of the scroll y in px. Usefull if you have a sticky header, etc...',
                type: 'number',
                default: __STheme.current.get('scroll.offsetY'),
            },
        };
    }
}
