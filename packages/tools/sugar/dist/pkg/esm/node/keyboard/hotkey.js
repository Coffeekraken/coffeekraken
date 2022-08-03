import __SInterface from '@coffeekraken/s-interface';
import __SPromise from '@coffeekraken/s-promise';
import __uniqid from '../../shared/string/uniqid';
// import __SIpc from '../ipc/SIpc';
import __isChildProcess from '../is/childProcess';
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
 * import hotkey from '@coffeekraken/sugar/node/keyboard/hotkey';
 * const promise = hotkey('ctrl+a').on('press', (e) => {
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
function hotkey(key, settings) {
    const set = HotkeySettingsInterface.apply(settings);
    const promise = new __SPromise({
        id: 'hotkey',
    });
    if (!__isChildProcess()) {
        const uniqid = `hotkey.${__uniqid()}`;
        if (!isListenerAlreadyAdded) {
            isListenerAlreadyAdded = true;
            // __keypress(process.stdin);
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
export { HotkeySettingsInterface as SettingsInterface };
export default hotkey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xELG9DQUFvQztBQUNwQyxPQUFPLGdCQUFnQixNQUFNLG9CQUFvQixDQUFDO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNILE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN2QixJQUFJLHNCQUFzQixHQUFHLEtBQUssQ0FBQztBQUNuQyxNQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQU12QyxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsWUFBWTtJQUNyRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxxREFBcUQ7Z0JBQ3pELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxnREFBZ0Q7Z0JBQzdELE9BQU8sRUFBRSxHQUFHO2FBQ2Y7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsU0FBUyxlQUFlLENBQUMsRUFBRSxFQUFFLE1BQU07SUFDL0IsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRTtRQUM3QyxhQUFhO1FBQ2IsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDekM7SUFFRCxtQ0FBbUM7SUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtR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