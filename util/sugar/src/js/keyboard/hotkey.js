import hotkeys from 'hotkeys-js';
hotkeys.filter = function (event) {
  return true;
}

// TODO tests

/**
 * @name 		hotkey
 * @namespace       sugar.js.keyboard
 * @type      Function
 *
 * Simple function to add a hotkey like "ctrl+a" and an handler function that will be called when the hotkey has been pressed
 * The following keys are supported:
 * - shift, option, alt, ctrl, control, command
 * - backspace, tab, clear, enter, return, esc, escape, space, up, down, left, right, home, end, pageup, pagedown, del, delete
 * - from f1 to f19
 * - all the letters keys
 *
 * You can pass an option object to your hotkey function call. Here's the option object format:
 * {
 *    element: {HTMLElement}, // default: null
 *    keyup: {Boolean}, // default: false
 *    keydown: {Boolean}, // default: true
 *    splitKey: {String} // default: '+'
 * }
 *
 * @param        {String}       hotkey          The hotkey to detect
 * @param         {Function}    handler         The handler function called when the hotkey is pressed. It take as parameter the 'event' object and the 'handler' one.
 * @param         {Object}      [options={}]    An option object to configure your hotkey
 * @return      {Function}                       A function to call when you want to delete the hotkey listener
 *
 * @example    js
 * import hotkey from '@coffeekraken/sugar/js/keyboard/hotkey'
 * const delete = hotkey('ctrl+a', (event, handler) => {
 *    console.log('ctrl + a has been pressed');
 * });
 * // when you want to stop the listener
 * delete();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function (hotkey, handler, options = {}) {
  // merge default options with passed ones:
  options = {
    element: null,
    keyup: false,
    keydown: true,
    splitKey: '+',
    ...options
  };
  // init the hotkey
  hotkeys(hotkey, options, (e, h) => {
    // call the handler function
    handler(e, h);
  });
  // return the "delete" function to call when want to delete the hotkey listening
  return function () {
    hotkeys.unbind(hotkey);
  };
}
