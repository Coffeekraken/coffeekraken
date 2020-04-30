const __SPromise = require('../promise/SPromise');
const __readline = require('readline');
const __uniqid = require('../string/uniqid');

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
 * - splitKey (*) {String}: Specify the split key to use in the sequences like "ctrl+a"
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

  let keypressedInTimeout = false;

  return new __SPromise(
    (resolve, reject, trigger, cancel) => {
      // save the trigger function in the stack
      hotkeyStack[uniqid] = {
        trigger,
        key
      };

      // add the listener if needed
      if (!isListenerAlreadyAdded) {
        isListenerAlreadyAdded = true;
        // Allows us to listen for events from stdin
        __readline.emitKeypressEvents(process.stdin);
        // Raw mode gets rid of standard keypress events and other
        // functionality Node.js adds by default
        process.stdin.setRawMode(true);
        // Start the keypress listener for the process
        process.stdin.on('keypress', (str, key) => {
          if (!key) return;
          if (keypressedInTimeout) return;
          keypressedInTimeout = true;
          setTimeout(() => {
            keypressedInTimeout = false;
          });
          // "Raw" mode so we must do our own kill switch
          if (key.sequence === '\u0003') {
            process.exit();
          }
          // process the full key
          const sequence = key.full.split('-').map((k) => {
            if (key.ctrl && k === 'C') return 'ctrl';
            if (key.shift && k === 'S') return 'shift';
            return k;
          });
          // check with wich handler this key correspond
          Object.keys(hotkeyStack).forEach((id) => {
            const hotkeyObj = hotkeyStack[id];
            if (sequence.join(settings.splitKey) === hotkeyObj.key) {
              hotkeyObj.trigger('key', key);
            }
          });
        });
      }
    },
    {
      stacks: 'key'
    }
  )
    .on('finally,cancel', () => {
      // delete the callback from the stack
      delete hotkeyStack[uniqid];
    })
    .start();
};
