import __SInterface from '@coffeekraken/s-interface';
import __SPromise from '@coffeekraken/s-promise';
// import __SIpc from '../ipc/SIpc';
import { __isChildProcess } from '@coffeekraken/sugar/is';

/**
 * @name                hotkey
 * @namespace            node.keyboard
 * @type                Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to add keyboard listening process and subscribe to some sequences
 * using the SPromise instance returned.
 *
 * @param        {String}       hotkey          The hotkey to detect
 * @param         {Object}      [settings={}]    An option object to configure your hotkey. Here's the list of available settings:
 * - once (false) {Boolean}: Specify if you want to detect the keyboard event just once
 * - splitChar (+) {String}: Specify the split key to use in the sequences like "ctrl+a"
 * - systemWide (false) {Boolean}: Specify if the listener have to listen for the application only events, or for the system level ones
 * @return      {SPromise}                       An SPromise instance on which you can register for "key" stack event
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Feature}       Add IPC support to allow listen for key press in child processes
 * @todo      {Feature}       Add the system wide support
 *
 * @snippet         __hotkey($1)
 * const hotkey = __hotkey($1).on('press', e => {
 *      $2
 * });
 * // hotkey.cancel(); // when want to cancel the listener
 * 
 * @example         js
 * import { __hotkey } from '@coffeekraken/sugar/keyboard';
 * const promise = __hotkey('ctrl+a').on('press', (e) => {
 *    // do something...
 * });
 * promise.cancel();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IHotkeySettings {
    once: boolean;
    splitChar: string;
}

export class HotkeySettingsInterface extends __SInterface {
    static get _definition() {
        return {
            once: {
                type: 'Boolean',
                description:
                    'Specify if you want to capture the hotkey just once',
                default: false,
            },
            splitChar: {
                type: 'String',
                description: 'Define the character to use to split shortcuts',
                default: '+',
            },
        };
    }
}

import __readline from 'readline';
__readline.emitKeypressEvents(process.stdin);

if (process.stdin.setRawMode != null) {
    process.stdin.setRawMode(true);
}

export { HotkeySettingsInterface as SettingsInterface };

export default function __hotkey(key, settings?: Partial<IHotkeySettings>) {
    const set: IHotkeySettings = HotkeySettingsInterface.apply(settings);

    const promise = new __SPromise({
        id: 'hotkey',
    });

    process.stdin.on('keypress', (str, keyObj) => {
        if (__isChildProcess()) {
            return;
        }

        let pressedKey = keyObj.name;
        if (keyObj.ctrl) pressedKey = `ctrl${set.splitChar}${pressedKey}`;
        if (keyObj.shift) pressedKey = `shift${set.splitChar}${pressedKey}`;
        if (keyObj.meta) pressedKey = `alt${set.splitChar}${pressedKey}`;

        if (pressedKey !== key) {
            return;
        }

        promise.emit('press', {
            key: pressedKey,
            ctrl: keyObj ? keyObj.ctrl : false,
            meta: keyObj ? keyObj.meta : false,
            shift: keyObj ? keyObj.shift : false,
        });

        if (set.once) {
            promise.cancel();
        }
    });

    // return the promise
    return promise;
}
