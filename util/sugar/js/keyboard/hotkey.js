"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _hotkeysJs = _interopRequireDefault(require("hotkeys-js"));

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_hotkeysJs.default.filter = function (event) {
  return true;
}; // TODO tests

/**
 * @name 		hotkey
 * @namespace           js.keyboard
 * @type      Function
 *
 * Simple function to add a hotkey like "ctrl+a" and an handler function that will be called when the hotkey has been pressed
 * The following keys are supported:
 * - shift, option, alt, ctrl, control, command
 * - backspace, tab, clear, enter, return, esc, escape, space, up, down, left, right, home, end, pageup, pagedown, del, delete
 * - from f1 to f19
 * - all the letters keys
 *
 * You can pass an option object to your hotkey function call.
 *
 * @param        {String}       hotkey          The hotkey to detect
 * @param         {Object}      [settings={}]    An option object to configure your hotkey. Here's the list of available settings:
 * - element (null) {HTMLElement}: Specify an HTMLElement to detect keyboard events from
 * - keyup (false) {Boolean}: Detect on keyup
 * - keydown (true) {Boolean}: Detect on keydown
 * - once (false) {Boolean}: Specify if you want to detect the keyboard event just once
 * - splitKey (*) {String}: Specify the split key to use in the sequences like "ctrl+a"
 * @return      {SPromise}                       An SPromise instance on which you can register for "key" stack event
 *
 * @example    js
 * import hotkey from '@coffeekraken/sugar/js/keyboard/hotkey'
 * const promise = hotkey('ctrl+a');
 * promise.on('ctrl+a', (e) => {
 *    // do something...
 * });
 * promise.cancel();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function _default(hotkey, settings = {}) {
  return new _SPromise.default((resolve, reject, trigger, cancel) => {
    // merge default settings with passed ones:
    settings = {
      element: null,
      keyup: false,
      keydown: true,
      once: false,
      splitKey: '+',
      ...settings
    }; // init the hotkey

    (0, _hotkeysJs.default)(hotkey, settings, (e, h) => {
      // call the handler function
      trigger('key', e); // unsubscribe if once is truc

      if (settings.once) cancel();
    });
  }).on('finally,cancel', () => {
    _hotkeysJs.default.unbind(hotkey);
  }).start();
}

module.exports = exports.default;