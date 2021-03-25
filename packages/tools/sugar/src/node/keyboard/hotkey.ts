import __SPromise from '@coffeekraken/s-promise';
import __keypress from 'keypress';
import __uniqid from '../../shared/string/uniqid';
import __SInterface from '@coffeekraken/s-interface';
// import __SIpc from '../ipc/SIpc';
import __isChildProcess from '../is/childProcess';

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
const isSystemWideAlreadyAdded = false;

export interface IHotkeySettings {
  once: boolean;
}

export class HotkeySettingsInterface extends __SInterface {
  static definition = {
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
}

function _handleKeypress(ch, keyObj) {
  if (keyObj && keyObj.ctrl && keyObj.name == 'c') {
    // process.stdin.pause();
    // @ts-ignore
    process.emit('custom_exit', 'killed');
  }

  // loop on each promises registered
  Object.keys(hotkeyStack).forEach((id) => {
    const obj = hotkeyStack[id];
    if (!obj || !obj.key) return;
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

        if (!keyObj) return;

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

function hotkey(key, settings?: Partial<IHotkeySettings>) {
  const set: IHotkeySettings = HotkeySettingsInterface.apply(settings).value;

  const promise = new __SPromise({
    id: 'hotkey'
  });

  if (!__isChildProcess()) {
    const uniqid = `hotkey.${__uniqid()}`;

    if (!isListenerAlreadyAdded) {
      isListenerAlreadyAdded = true;
      __keypress(process.stdin);
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

export { HotkeySettingsInterface as SettingsInterface };
export default hotkey;
