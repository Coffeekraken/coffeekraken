const __SPromise = require('../promise/SPromise');
const __uniqid = require('../string/uniqid');
const __keypress = require('keypress');
const __activeSpace = require('../core/activeSpace');

/**
 * @name                hotkey
 * @namespace           node.keyboard
 * @type                Function
 *
 * This function allows you to add keyboard listening process and subscribe to some sequences
 * using the SPromise instance returned.
 *
 * @param        {String}       hotkey          The hotkey to detect
 * @param         {Object}      [settings={}]    An option object to configure your hotkey. Here's the list of available settings:
 * - once (false) {Boolean}: Specify if you want to detect the keyboard event just once
 * - splitKey (+) {String}: Specify the split key to use in the sequences like "ctrl+a"
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
module.exports = function hotkey(key, settings = {}) {
  // extends the settings
  settings = {
    once: false,
    splitKey: '+',
    activeSpace: null,
    disableWhenEditingForm: true,
    ...settings
  };

  // generate a new uniqid for this listener
  const uniqid = __uniqid();

  if (!isListenerAlreadyAdded) {
    isListenerAlreadyAdded = true;

    function _terminate() {
      setTimeout(function () {
        process.exit();
      }, 100);
    }

    __keypress(process.stdin);

    process.stdin.on('keypress', function (ch, keyObj) {
      // if (keyObj && keyObj.ctrl && keyObj.name == 'c') {
      //   // _terminate();
      // }

      // loop on each promises registered
      Object.keys(hotkeyStack).forEach((id) => {
        const obj = hotkeyStack[id];
        if (!obj || !obj.key) return;
        // check if an activeSpace is specified
        if (obj.settings.disableWhenEditingForm) {
          if (__activeSpace.is('**.form.*')) return;
        }
        if (obj.settings.activeSpace) {
          console.log('act', obj.settings.activeSpace);
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
                shifr: keyObj ? keyObj.shifr : false
              });
              obj.promise.trigger('press', {
                key,
                ctrl: keyObj ? keyObj.ctrl : false,
                meta: keyObj ? keyObj.meta : false,
                shifr: keyObj ? keyObj.shifr : false
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
                shifr: keyObj ? keyObj.shifr : false
              });
              obj.promise.trigger('press', {
                key,
                ctrl: keyObj ? keyObj.ctrl : false,
                meta: keyObj ? keyObj.meta : false,
                shifr: keyObj ? keyObj.shifr : false
              });
            }
          });
      });
    });
  }

  const promise = new __SPromise((resolve, reject, trigger, cancel) => {}, {})
    .on('key,press', (key) => {
      if (settings.once) {
        promise.cancel();
      }
    })
    .on('finally,cancel', () => {
      // delete the callback from the stack
      delete hotkeyStack[uniqid];
    })
    .start();

  // save the trigger function in the stack
  hotkeyStack[uniqid] = {
    key,
    promise,
    settings
  };

  // return the promise
  return promise;
};
