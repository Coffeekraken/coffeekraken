"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addEventListener;

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        addEventListener
 * @namespace       sugar.js.dom
 * @type      Function
 *
 * Add an event listener on an element and return the function to remove the event listener
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to add the event listener
 * @param    {String}    eventName    THe event name to listen to
 * @param    {Function}    callback    The callback function to call on event
 * @param    {object}    [options={}]    An options object that specifies characteristics about the event listener
 * @return    {Function}    The remove event listener function
 *
 * @example    js
 * import addEventListener from '@coffeekraken/sugar/js/dom/addEventListener'
 * const removeEventListener = addEventListener($myCoolElm, 'click', this._myCoolFunction, this)
 * // remove the event listener
 * removeEventListener()
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function addEventListener($elm, eventName, callback = null, options = {}) {
  let listenerFn = null;
  return new _SPromise.default((resolve, reject, trigger, cancel) => {
    listenerFn = (...args) => {
      if (callback) callback.apply(this, [...args]);
      trigger('then', ...args);
    };

    $elm.addEventListener(eventName, listenerFn, options);
  }).on('cancel,finally', () => {
    $elm.removeEventListener(eventName, listenerFn, options);
  });
}

module.exports = exports.default;