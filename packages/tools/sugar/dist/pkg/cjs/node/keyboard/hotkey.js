"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsInterface = exports.HotkeySettingsInterface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const uniqid_1 = __importDefault(require("../../node/string/uniqid"));
// import __SIpc from '../ipc/SIpc';
const is_1 = require("@coffeekraken/sugar/is");
const keypress_1 = __importDefault(require("keypress"));
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
class HotkeySettingsInterface extends s_interface_1.default {
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
exports.HotkeySettingsInterface = HotkeySettingsInterface;
exports.SettingsInterface = HotkeySettingsInterface;
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
function __hotkey(key, settings) {
    const set = HotkeySettingsInterface.apply(settings);
    const promise = new s_promise_1.default({
        id: 'hotkey',
    });
    if (!(0, is_1.__isChildProcess)()) {
        const uniqid = `hotkey.${(0, uniqid_1.default)()}`;
        if (!isListenerAlreadyAdded) {
            isListenerAlreadyAdded = true;
            (0, keypress_1.default)(process.stdin);
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
exports.default = __hotkey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx3RUFBaUQ7QUFDakQsc0VBQWdEO0FBQ2hELG9DQUFvQztBQUNwQywrQ0FBMEQ7QUFDMUQsd0RBQWtDO0FBRWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNILE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN2QixJQUFJLHNCQUFzQixHQUFHLEtBQUssQ0FBQztBQUNuQyxNQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQU12QyxNQUFhLHVCQUF3QixTQUFRLHFCQUFZO0lBQ3JELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHFEQUFxRDtnQkFDekQsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsT0FBTyxFQUFFLEdBQUc7YUFDZjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFoQkQsMERBZ0JDO0FBa0RtQyxvREFBaUI7QUFoRHJELFNBQVMsZUFBZSxDQUFDLEVBQUUsRUFBRSxNQUFNO0lBQy9CLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUU7UUFDN0MsYUFBYTtRQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3pDO0lBRUQsbUNBQW1DO0lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDcEMsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRztZQUFFLE9BQU87UUFFN0IsR0FBRyxDQUFDLEdBQUc7YUFDRixRQUFRLEVBQUU7YUFDVixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDcEIsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDYixJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssR0FBRyxFQUFFO2dCQUM3QixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ3RCLEdBQUc7b0JBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztvQkFDbEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztvQkFDbEMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSztpQkFDdkMsQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxNQUFNO2dCQUFFLE9BQU87WUFFcEIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUM3QixJQUFJLE1BQU0sQ0FBQyxJQUFJO2dCQUNYLFVBQVUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLFVBQVUsRUFBRSxDQUFDO1lBQzlELElBQUksTUFBTSxDQUFDLEtBQUs7Z0JBQ1osVUFBVSxHQUFHLFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBVSxFQUFFLENBQUM7WUFDL0QsSUFBSSxNQUFNLENBQUMsSUFBSTtnQkFDWCxVQUFVLEdBQUcsTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFVLEVBQUUsQ0FBQztZQUU3RCxJQUFJLFVBQVUsS0FBSyxHQUFHLEVBQUU7Z0JBQ3BCLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDdEIsR0FBRztvQkFDSCxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO29CQUNsQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO29CQUNsQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLO2lCQUN2QyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBSUQsU0FBd0IsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFtQztJQUNyRSxNQUFNLEdBQUcsR0FBb0IsdUJBQXVCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXJFLE1BQU0sT0FBTyxHQUFHLElBQUksbUJBQVUsQ0FBQztRQUMzQixFQUFFLEVBQUUsUUFBUTtLQUNmLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFBLHFCQUFnQixHQUFFLEVBQUU7UUFDckIsTUFBTSxNQUFNLEdBQUcsVUFBVSxJQUFBLGdCQUFRLEdBQUUsRUFBRSxDQUFDO1FBRXRDLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUN6QixzQkFBc0IsR0FBRyxJQUFJLENBQUM7WUFDOUIsSUFBQSxrQkFBVSxFQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDOUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMxQjtRQUVELE9BQU87YUFDRixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDakIsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2hCLHFDQUFxQztZQUNyQyxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUVQLHNDQUFzQztRQUN0QyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDbEIsR0FBRztZQUNILE9BQU87WUFDUCxRQUFRLEVBQUUsR0FBRztTQUNoQixDQUFDO0tBQ0w7SUFFRCxxQkFBcUI7SUFDckIsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQXZDRCwyQkF1Q0MifQ==