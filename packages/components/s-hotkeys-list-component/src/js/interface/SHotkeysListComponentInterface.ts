import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SHotkeysListComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SHotkeysListComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SHotkeysListComponentInterface extends __SInterface {
    static get _definition() {
        return {
            hotkeys: {
                type: 'Object',
                description:
                    'Specify the hotkeys you want to list. The key is the hotkey itself and it stores an object with "title", "description" and "hotkey" property.',
            },
        };
    }
}
