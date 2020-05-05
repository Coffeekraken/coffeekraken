const __SPromise = require('../promise/SPromise');
const __readline = require('readline');
const __uniqid = require('../string/uniqid');
const __terminalKit = require('terminal-kit').terminal;

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
 * - keyup (false) {Boolean}: Detect on keyup
 * - keydown (true) {Boolean}: Detect on keydown
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
    keyup: false,
    keydown: true,
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
        __terminalKit.grabInput(false);
        process.exit();
      }, 100);
    }
    __terminalKit.grabInput({ mouse: 'button' });
    __terminalKit.on('key', function (name, matches, data) {
      if (name === 'CTRL_C') {
        _terminate();
      }
      // loop on each promises registered
      Object.keys(hotkeyStack).forEach((id) => {
        const obj = hotkeyStack[id];
        if (name === obj.key.split(settings.splitKey).join('_').toUpperCase()) {
          obj.promise.trigger('key', name);
        }
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
