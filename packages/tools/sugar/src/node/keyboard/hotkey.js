"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const uniqid_1 = __importDefault(require("../string/uniqid"));
const keypress_1 = __importDefault(require("keypress"));
const activeSpace_1 = __importDefault(require("../core/activeSpace"));
// import __SIpc from '../ipc/SIpc';
const childProcess_1 = __importDefault(require("../is/childProcess"));
/**
 * @name                hotkey
 * @namespace           sugar.node.keyboard
 * @type                Function
 * @beta
 *
 * This function allows you to add keyboard listening process and subscribe to some sequences
 * using the SPromise instance returned.
 *
 * @param        {String}       hotkey          The hotkey to detect
 * @param         {Object}      [settings={}]    An option object to configure your hotkey. Here's the list of available settings:
 * - once (false) {Boolean}: Specify if you want to detect the keyboard event just once
 * - splitKey (+) {String}: Specify the split key to use in the sequences like "ctrl+a"
 * - systemWide (false) {Boolean}: Specify if the listener have to listen for the application only events, or for the system level ones
 * @return      {SPromise}                       An SPromise instance on which you can register for "key" stack event
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Feature}       Add IPC support to allow listen for key press in child processes
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
function _handleKeypress(ch, keyObj) {
    if (keyObj && keyObj.ctrl && keyObj.name == 'c') {
        // process.stdin.pause();
        process.emit('custom_exit', 'killed');
    }
    // loop on each promises registered
    Object.keys(hotkeyStack).forEach((id) => {
        const obj = hotkeyStack[id];
        if (!obj || !obj.key)
            return;
        // check if an activeSpace is specified
        if (obj.settings.disableWhenEditingForm) {
            if (activeSpace_1.default.is('**.form.*'))
                return;
        }
        if (obj.settings.activeSpace) {
            if (!activeSpace_1.default.is(obj.settings.activeSpace))
                return;
        }
        // check if an "active" function exists
        if (obj.settings.active && typeof obj.settings.active === 'function') {
            if (!obj.settings.active(obj.key))
                return;
        }
        obj.key
            .toString()
            .split(',')
            .map((m) => m.trim())
            .forEach((key) => {
            if (ch && ch.toString() === key) {
                obj.promise.emit('key', {
                    key,
                    ctrl: keyObj ? keyObj.ctrl : false,
                    meta: keyObj ? keyObj.meta : false,
                    shift: keyObj ? keyObj.shift : false
                });
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
                pressedKey = `ctrl${obj.settings.splitKey}${pressedKey}`;
            if (keyObj.shift)
                pressedKey = `shift${obj.settings.splitKey}${pressedKey}`;
            if (keyObj.meta)
                pressedKey = `alt${obj.settings.splitKey}${pressedKey}`;
            if (pressedKey === key) {
                obj.promise.emit('key', {
                    key,
                    ctrl: keyObj ? keyObj.ctrl : false,
                    meta: keyObj ? keyObj.meta : false,
                    shift: keyObj ? keyObj.shift : false
                });
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
function hotkey(key, settings = {}) {
    // extends the settings
    settings = Object.assign({ once: false, splitKey: '+', systemWide: false, activeSpace: null, disableWhenEditingForm: true, ipc: true }, settings);
    if (!childProcess_1.default()) {
        const uniqid = `hotkey.${uniqid_1.default()}`;
        if (!isListenerAlreadyAdded || !isSystemWideAlreadyAdded) {
            if (settings.systemWide && !isSystemWideAlreadyAdded) {
                isSystemWideAlreadyAdded = true;
                // @TODO      implement system wide hotkeys
                throw `System wide hotkeys are not implemented yet...`;
                // // __ioHook.on('keydown', function (event) {
                //
                // //   __ioHook.start();
                // // });
                // __ioHook.registerShortcut([30], (keys) => {
                // });
                __ioHook.start();
            }
            else if (!isListenerAlreadyAdded) {
                isListenerAlreadyAdded = true;
                keypress_1.default(process.stdin);
                process.stdin.on('keypress', _handleKeypress);
                // process.stdin.setRawMode(true);
                // process.stdin.resume();
            }
        }
        const promise = new SPromise_1.default({
            id: 'hotkey'
        });
        promise
            .on('press', (key) => {
            if (settings.once) {
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
            settings
        };
        // return the promise
        return promise;
    }
    // else if (settings.ipc) {
    //   const promise = new __SPromise({
    //     id: 'hotkey'
    //   });
    //   // child process
    //   __SIpc.on(`keypress.${key}`, (keyObj) => {
    //     promise.emit('key', keyObj);
    //     promise.emit('press', keyObj);
    //   });
    //   setTimeout(() => {
    //     __SIpc.emit(`keypress`, {
    //       key,
    //       settings
    //     });
    //   }, 2000);
    //   return promise;
    // }
}
module.exports = hotkey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG90a2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG90a2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsbUVBQTZDO0FBQzdDLDhEQUF3QztBQUN4Qyx3REFBa0M7QUFDbEMsc0VBQWdEO0FBQ2hELG9DQUFvQztBQUNwQyxzRUFBa0Q7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUN2QixJQUFJLHNCQUFzQixHQUFHLEtBQUssQ0FBQztBQUNuQyxJQUFJLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUVyQyxTQUFTLGVBQWUsQ0FBQyxFQUFFLEVBQUUsTUFBTTtJQUNqQyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFO1FBQy9DLHlCQUF5QjtRQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUN2QztJQUVELG1DQUFtQztJQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUc7WUFBRSxPQUFPO1FBQzdCLHVDQUF1QztRQUN2QyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUU7WUFDdkMsSUFBSSxxQkFBYSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQUUsT0FBTztTQUMzQztRQUNELElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDNUIsSUFBSSxDQUFDLHFCQUFhLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO2dCQUFFLE9BQU87U0FDekQ7UUFDRCx1Q0FBdUM7UUFDdkMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtZQUNwRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPO1NBQzNDO1FBRUQsR0FBRyxDQUFDLEdBQUc7YUFDSixRQUFRLEVBQUU7YUFDVixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDcEIsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDZixJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssR0FBRyxFQUFFO2dCQUMvQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ3RCLEdBQUc7b0JBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztvQkFDbEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztvQkFDbEMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSztpQkFDckMsQ0FBQyxDQUFDO2dCQUNILEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDeEIsR0FBRztvQkFDSCxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO29CQUNsQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO29CQUNsQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLO2lCQUNyQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLE1BQU07Z0JBQUUsT0FBTztZQUVwQixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzdCLElBQUksTUFBTSxDQUFDLElBQUk7Z0JBQ2IsVUFBVSxHQUFHLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsVUFBVSxFQUFFLENBQUM7WUFDM0QsSUFBSSxNQUFNLENBQUMsS0FBSztnQkFDZCxVQUFVLEdBQUcsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxVQUFVLEVBQUUsQ0FBQztZQUM1RCxJQUFJLE1BQU0sQ0FBQyxJQUFJO2dCQUNiLFVBQVUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFVBQVUsRUFBRSxDQUFDO1lBRTFELElBQUksVUFBVSxLQUFLLEdBQUcsRUFBRTtnQkFDdEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUN0QixHQUFHO29CQUNILElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUs7b0JBQ2xDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUs7b0JBQ2xDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUs7aUJBQ3JDLENBQUMsQ0FBQztnQkFDSCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ3hCLEdBQUc7b0JBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztvQkFDbEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztvQkFDbEMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSztpQkFDckMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNoQyx1QkFBdUI7SUFDdkIsUUFBUSxtQkFDTixJQUFJLEVBQUUsS0FBSyxFQUNYLFFBQVEsRUFBRSxHQUFHLEVBQ2IsVUFBVSxFQUFFLEtBQUssRUFDakIsV0FBVyxFQUFFLElBQUksRUFDakIsc0JBQXNCLEVBQUUsSUFBSSxFQUM1QixHQUFHLEVBQUUsSUFBSSxJQUNOLFFBQVEsQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDLHNCQUFnQixFQUFFLEVBQUU7UUFDdkIsTUFBTSxNQUFNLEdBQUcsVUFBVSxnQkFBUSxFQUFFLEVBQUUsQ0FBQztRQUV0QyxJQUFJLENBQUMsc0JBQXNCLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtZQUN4RCxJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtnQkFDcEQsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO2dCQUNoQywyQ0FBMkM7Z0JBQzNDLE1BQU0sZ0RBQWdELENBQUM7Z0JBRXZELCtDQUErQztnQkFDL0MsRUFBRTtnQkFDRix5QkFBeUI7Z0JBQ3pCLFNBQVM7Z0JBQ1QsOENBQThDO2dCQUU5QyxNQUFNO2dCQUNOLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNsQjtpQkFBTSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7Z0JBQ2xDLHNCQUFzQixHQUFHLElBQUksQ0FBQztnQkFDOUIsa0JBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFDOUMsa0NBQWtDO2dCQUNsQywwQkFBMEI7YUFDM0I7U0FDRjtRQUVELE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQVUsQ0FBQztZQUM3QixFQUFFLEVBQUUsUUFBUTtTQUNiLENBQUMsQ0FBQztRQUVILE9BQU87YUFDSixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUNqQixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDbEI7UUFDSCxDQUFDLENBQUM7YUFDRCxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNsQixxQ0FBcUM7WUFDckMsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFTCxzQ0FBc0M7UUFDdEMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHO1lBQ3BCLEdBQUc7WUFDSCxPQUFPO1lBQ1AsUUFBUTtTQUNULENBQUM7UUFFRixxQkFBcUI7UUFDckIsT0FBTyxPQUFPLENBQUM7S0FDaEI7SUFFRCwyQkFBMkI7SUFDM0IscUNBQXFDO0lBQ3JDLG1CQUFtQjtJQUNuQixRQUFRO0lBQ1IscUJBQXFCO0lBQ3JCLCtDQUErQztJQUMvQyxtQ0FBbUM7SUFDbkMscUNBQXFDO0lBQ3JDLFFBQVE7SUFDUix1QkFBdUI7SUFDdkIsZ0NBQWdDO0lBQ2hDLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsVUFBVTtJQUNWLGNBQWM7SUFDZCxvQkFBb0I7SUFDcEIsSUFBSTtBQUNOLENBQUM7QUFVRCxpQkFBUyxNQUFNLENBQUMifQ==