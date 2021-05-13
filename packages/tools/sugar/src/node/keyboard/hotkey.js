import __SPromise from '@coffeekraken/s-promise';
import __keypress from 'keypress';
import __uniqid from '../../shared/string/uniqid';
import __SInterface from '@coffeekraken/s-interface';
// import __SIpc from '../ipc/SIpc';
import __isChildProcess from '../is/childProcess';
/**
 * @name                hotkey
 * @namespace            node.keyboard
 * @type                Function
 * @status              beta
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
 * const promise = hotkey('ctrl+a').on('key', (e) => {
 *    // do something...
 * });
 * promise.cancel();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const hotkeyStack = {};
let isListenerAlreadyAdded = false;
const isSystemWideAlreadyAdded = false;
export class HotkeySettingsInterface extends __SInterface {
}
HotkeySettingsInterface.definition = {
    once: {
        type: 'Boolean',
        description: 'Specify if you want to capture the hotkey just once',
        default: false
    },
    splitChar: {
        type: 'String',
        description: 'Define the character to use to split shortcuts',
        default: '+'
    }
};
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
                console.log('RE', key, keyObj);
                obj.promise.emit('press', {
                    key,
                    ctrl: keyObj ? keyObj.ctrl : false,
                    meta: keyObj ? keyObj.meta : false,
                    shift: keyObj ? keyObj.shift : false
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
                    shift: keyObj ? keyObj.shift : false
                });
            }
        });
    });
}
function hotkey(key, settings) {
    const set = HotkeySettingsInterface.apply(settings).value;
    const promise = new __SPromise({
        id: 'hotkey'
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
            settings: set
        };
    }
    // return the promise
    return promise;
}
export { HotkeySettingsInterface as SettingsInterface };
export default hotkey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90a2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG90a2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLFFBQVEsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxvQ0FBb0M7QUFDcEMsT0FBTyxnQkFBZ0IsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN2QixJQUFJLHNCQUFzQixHQUFHLEtBQUssQ0FBQztBQUNuQyxNQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQU12QyxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsWUFBWTs7QUFDaEQsa0NBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLFdBQVcsRUFBRSxxREFBcUQ7UUFDbEUsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLGdEQUFnRDtRQUM3RCxPQUFPLEVBQUUsR0FBRztLQUNiO0NBQ0YsQ0FBQztBQUdKLFNBQVMsZUFBZSxDQUFDLEVBQUUsRUFBRSxNQUFNO0lBQ2pDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUU7UUFDL0MsYUFBYTtRQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsbUNBQW1DO0lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDdEMs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