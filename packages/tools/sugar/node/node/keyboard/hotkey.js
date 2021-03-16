"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsInterface = exports.HotkeySettingsInterface = void 0;
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const uniqid_1 = __importDefault(require("../string/uniqid"));
const keypress_1 = __importDefault(require("keypress"));
// import __SIpc from '../ipc/SIpc';
const childProcess_1 = __importDefault(require("../is/childProcess"));
const SInterface_1 = __importDefault(require("../interface/SInterface"));
/**
 * @name                hotkey
 * @namespace           sugar.node.keyboard
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
let isSystemWideAlreadyAdded = false;
class HotkeySettingsInterface extends SInterface_1.default {
}
exports.HotkeySettingsInterface = HotkeySettingsInterface;
exports.SettingsInterface = HotkeySettingsInterface;
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
        // process.stdin.pause();
        // @ts-ignore
        process.emit('custom_exit', 'killed');
    }
    // loop on each promises registered
    Object.keys(hotkeyStack).forEach((id) => {
        const obj = hotkeyStack[id];
        if (!obj || !obj.key)
            return;
        // // check if an activeSpace is specified
        // if (obj.settings.disableWhenEditingForm) {
        //   if (__activeSpace.is('**.form.*')) return;
        // }
        // if (obj.settings.activeSpace) {
        //   if (!__activeSpace.is(obj.settings.activeSpace)) return;
        // }
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
    const promise = new s_promise_1.default({
        id: 'hotkey'
    });
    if (!childProcess_1.default()) {
        const uniqid = `hotkey.${uniqid_1.default()}`;
        if (!isListenerAlreadyAdded) {
            isListenerAlreadyAdded = true;
            keypress_1.default(process.stdin);
            process.stdin.on('keypress', _handleKeypress);
            // process.stdin.setRawMode(true);
            // process.stdin.resume();
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
exports.default = hotkey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90a2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25vZGUva2V5Ym9hcmQvaG90a2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCw4REFBd0M7QUFDeEMsd0RBQWtDO0FBRWxDLG9DQUFvQztBQUNwQyxzRUFBa0Q7QUFDbEQseUVBQW1EO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLElBQUksc0JBQXNCLEdBQUcsS0FBSyxDQUFDO0FBQ25DLElBQUksd0JBQXdCLEdBQUcsS0FBSyxDQUFDO0FBTXJDLE1BQWEsdUJBQXdCLFNBQVEsb0JBQVk7O0FBQXpELDBEQWFDO0FBbUdtQyxvREFBaUI7QUEvRzVDLGtDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQUUscURBQXFEO1FBQ2xFLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSxnREFBZ0Q7UUFDN0QsT0FBTyxFQUFFLEdBQUc7S0FDYjtDQUNGLENBQUM7QUFHSixTQUFTLGVBQWUsQ0FBQyxFQUFFLEVBQUUsTUFBTTtJQUNqQyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFO1FBQy9DLHlCQUF5QjtRQUN6QixhQUFhO1FBQ2IsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDdkM7SUFFRCxtQ0FBbUM7SUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUN0QyxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsRUFBRSxD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