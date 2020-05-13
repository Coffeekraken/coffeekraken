const __SPromise = require('../promise/SPromise');
const __uniqid = require('../string/uniqid');
const __keypress = require('keypress');

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
    element: null,
    once: false,
    splitKey: '+',
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
      if (keyObj && keyObj.ctrl && keyObj.name == 'c') {
        _terminate();
      }

      // loop on each promises registered
      Object.keys(hotkeyStack).forEach((id) => {
        const obj = hotkeyStack[id];
        if (!obj || !obj.key) return;
        obj.key
          .toString()
          .split(',')
          .map((m) => m.trim())
          .forEach((key) => {
            if (ch && ch.toString() === key) {
              obj.promise.trigger('key', key);
              obj.promise.trigger('press', key);
              return;
            }

            if (!keyObj) return;

            const ctrlWanted = key
                .toLowerCase()
                .includes(`ctrl${settings.splitKey}`),
              shiftWanted = key
                .toLowerCase()
                .includes(`shift${settings.splitKey}`),
              altWanted = key.toLowerCase().includes(`alt${settings.splitKey}`);

            let prefix = ctrlWanted ? `ctrl${settings.splitKey}` : '';
            prefix = shiftWanted ? `shift${settings.splitKey}` : prefix;
            prefix = altWanted ? `alt${settings.splitKey}` : prefix;

            if (`${prefix}${keyObj.name}` === key) {
              obj.promise.trigger('key', key);
              obj.promise.trigger('press', key);
            }
          });
      });
    });
  }

  const promise = new __SPromise((resolve, reject, trigger, cancel) => {}, {
    stacks: 'key'
  })
    .on('key', (key) => {
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
    promise
  };

  // return the promise
  return promise;
};
