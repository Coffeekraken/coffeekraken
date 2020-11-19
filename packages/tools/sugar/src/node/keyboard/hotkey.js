const __SPromise = require('../promise/SPromise');
const __uniqid = require('../string/uniqid');
const __keypress = require('keypress');
const __activeSpace = require('../core/activeSpace');
const __SIpc = require('../ipc/SIpc');
const __isChildProcess = require('../is/childProcess');
// const __ioHook = require('iohook');

/**
 * @name                hotkey
 * @namespace           sugar.node.keyboard
 * @type                Function
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
 * @example         js
 * const hotkey = require('@coffeekraken/sugar/node/keyboard/hotkey');
 * const promise = hotkey('ctrl+a').on('key', (e) => {
 *    // do something...
 * });
 * promise.cancel();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const hotkeyStack = {};
let isListenerAlreadyAdded = false;
let isSystemWideAlreadyAdded = false;

function _handleKeypress(ch, keyObj) {
  if (keyObj && keyObj.ctrl && keyObj.name == 'c') {
    // process.stdin.pause();
    process.emit('custom_exit');
  }

  // loop on each promises registered
  Object.keys(hotkeyStack).forEach((id) => {
    const obj = hotkeyStack[id];
    if (!obj || !obj.key) return;
    // check if an activeSpace is specified
    if (obj.settings.disableWhenEditingForm) {
      if (__activeSpace.is('**.form.*')) return;
    }
    if (obj.settings.activeSpace) {
      if (!__activeSpace.is(obj.settings.activeSpace)) return;
    }
    // check if an "active" function exists
    if (obj.settings.active && typeof obj.settings.active === 'function') {
      if (!obj.settings.active(obj.key)) return;
    }

    obj.key
      .toString()
      .split(',')
      .map((m) => m.trim())
      .forEach((key) => {
        if (ch && ch.toString() === key) {
          obj.promise.trigger('key', {
            key,
            ctrl: keyObj ? keyObj.ctrl : false,
            meta: keyObj ? keyObj.meta : false,
            shift: keyObj ? keyObj.shift : false
          });
          obj.promise.trigger('press', {
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
          pressedKey = `ctrl${obj.settings.splitKey}${pressedKey}`;
        if (keyObj.shift)
          pressedKey = `shift${obj.settings.splitKey}${pressedKey}`;
        if (keyObj.meta)
          pressedKey = `alt${obj.settings.splitKey}${pressedKey}`;

        if (pressedKey === key) {
          obj.promise.trigger('key', {
            key,
            ctrl: keyObj ? keyObj.ctrl : false,
            meta: keyObj ? keyObj.meta : false,
            shift: keyObj ? keyObj.shift : false
          });
          obj.promise.trigger('press', {
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
  settings = {
    once: false,
    splitKey: '+',
    systemWide: false,
    activeSpace: null,
    disableWhenEditingForm: true,
    ipc: true,
    ...settings
  };

  if (!__isChildProcess()) {
    const uniqid = `hotkey.${__uniqid()}`;

    if (!isListenerAlreadyAdded || !isSystemWideAlreadyAdded) {
      if (settings.systemWide && !isSystemWideAlreadyAdded) {
        isSystemWideAlreadyAdded = true;
        // @TODO      implement system wide hotkeys
        throw `System wide hotkeys are not implemented yet...`;
        // console.log('CCC');
        // // __ioHook.on('keydown', function (event) {
        // //   console.log(event);
        // //   __ioHook.start();
        // // });
        // __ioHook.registerShortcut([30], (keys) => {
        //   console.log('SOM', keys);
        // });
        __ioHook.start();
      } else if (!isListenerAlreadyAdded) {
        isListenerAlreadyAdded = true;
        __keypress(process.stdin);
        process.stdin.on('keypress', _handleKeypress);
        // process.stdin.setRawMode(true);
        // process.stdin.resume();
      }
    }

    const promise = new __SPromise({
      id: 'hotkey'
    })
      .on('press', (key) => {
        if (settings.once) {
          promise.cancel();
        }
      })
      .on('finally', () => {
        // delete the callback from the stack
        delete hotkeyStack[uniqid];
      });

    // save the trigger function in the stack
    hotkeyStack[uniqid] = {
      key,
      promise,
      settings
    };

    // return the promise
    return promise;
  } else if (settings.ipc) {
    const promise = new __SPromise({
      id: 'hotkey'
    });
    // child process
    __SIpc.on(`keypress.${key}`, (keyObj) => {
      promise.trigger('key', keyObj);
      promise.trigger('press', keyObj);
    });
    setTimeout(() => {
      __SIpc.trigger(`keypress`, {
        key,
        settings
      });
    }, 2000);
    return promise;
  }
}

if (!__isChildProcess()) {
  __SIpc.on('keypress', (keyObj) => {
    hotkey(keyObj.key).on('press', (pressedKeyObj) => {
      __SIpc.trigger(`keypress.${keyObj.key}`, pressedKeyObj);
    });
  });
}

module.exports = hotkey;
