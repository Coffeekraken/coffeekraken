import __SInterface from '@coffeekraken/s-interface';
import __SPromise from '@coffeekraken/s-promise';
import __uniqid from '../../node/string/uniqid';
// import __SIpc from '../ipc/SIpc';
import { __isChildProcess } from '@coffeekraken/sugar/is';
import __keypress from 'keypress';
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
const hotkeyStack = {};
let isListenerAlreadyAdded = false;
const isSystemWideAlreadyAdded = false;
export class HotkeySettingsInterface extends __SInterface {
    static get _definition() {
        return {
            once: {
                type: 'Boolean',
                description: 'Specify if you want to capture the hotkey just once',
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
function _handleKeypress(ch, keyObj) {
    if (keyObj && keyObj.ctrl && keyObj.name == 'c') {
        // @ts-ignore
        process.emit('custom_exit', 'killed');
    }
    // loop on each promises registered
    Object.keys(hotkeyStack).forEach((id) => {
        const obj = hotkeyStack[id];
        if (!obj || !obj.key)
            return;
        obj.key
            .toString()
            .split(',')
            .map((m) => m.trim())
            .forEach((key) => {
            if (ch && ch.toString() === key) {
                obj.promise.emit('press', {
                    key,
                    ctrl: keyObj ? keyObj.ctrl : false,
                    meta: keyObj ? keyObj.meta : false,
                    shift: keyObj ? keyObj.shift : false,
                });
                return;
            }
            if (!keyObj)
                return;
            let pressedKey = keyObj.name;
            if (keyObj.ctrl)
                pressedKey = `ctrl${obj.settings.splitChar}${pressedKey}`;
            if (keyObj.shift)
                pressedKey = `shift${obj.settings.splitChar}${pressedKey}`;
            if (keyObj.meta)
                pressedKey = `alt${obj.settings.splitChar}${pressedKey}`;
            if (pressedKey === key) {
                obj.promise.emit('press', {
                    key,
                    ctrl: keyObj ? keyObj.ctrl : false,
                    meta: keyObj ? keyObj.meta : false,
                    shift: keyObj ? keyObj.shift : false,
                });
            }
        });
    });
}
export { HotkeySettingsInterface as SettingsInterface };
export default function __hotkey(key, settings) {
    const set = HotkeySettingsInterface.apply(settings);
    const promise = new __SPromise({
        id: 'hotkey',
    });
    if (!__isChildProcess()) {
        const uniqid = `hotkey.${__uniqid()}`;
        if (!isListenerAlreadyAdded) {
            isListenerAlreadyAdded = true;
            __keypress(process.stdin);
            process.stdin.on('keypress', _handleKeypress);
            process.stdin.setRawMode(true);
            process.stdin.resume();
        }
        promise
            .on('press', (key) => {
            if (set.once) {
                promise.cancel();
            }
        })
            .on('finally', () => {
            // delete the callback from the stack
            delete hotkeyStack[uniqid];
        });
        // save the emit function in the stack
        hotkeyStack[uniqid] = {
            key,
            promise,
            settings: set,
        };
    }
    // return the promise
    return promise;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hELG9DQUFvQztBQUNwQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBQ0gsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLElBQUksc0JBQXNCLEdBQUcsS0FBSyxDQUFDO0FBQ25DLE1BQU0sd0JBQXdCLEdBQUcsS0FBSyxDQUFDO0FBTXZDLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxZQUFZO0lBQ3JELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHFEQUFxRDtnQkFDekQsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsT0FBTyxFQUFFLEdBQUc7YUFDZjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxTQUFTLGVBQWUsQ0FBQyxFQUFFLEVBQUUsTUFBTTtJQUMvQixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFO1FBQzdDLGFBQWE7UUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUN6QztJQUVELG1DQUFtQztJQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcs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