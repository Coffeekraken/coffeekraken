"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addEventListenerOnce;

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

var _addEventListener = _interopRequireDefault(require("./addEventListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        addEventListenerOnce
 * @namespace       sugar.js.dom
 * @type      Function
 *
 * Add an event listener that will be trigerred only once
 *
 * @param    {HTMLElement}    $elm    The element to add the event listener on
 * @param    {String}    event    The event to listen for
 * @param    {Function}    [callback=null]    The callback function to call on event
 * @param    {object}    [options={}]    An options object that specifies characteristics about the event listener
 * @return    {Promise}                   A promise that will be resolved once the event has been called
 *
 * @example    js
 * import addEventListenerOnce from '@coffeekraken/sugar/js/dom/addEventListenerOnce'
 * addEventListenerOnce(myElm, 'click', (e) => {
 *     // do something on click
 * });
 * addEventListenerOnce(myElm, 'click').then(e => {
 *    // do something on click
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function addEventListenerOnce($elm, event, callback = null, options = {}) {
  const sPromise = (0, _addEventListener.default)($elm, event, callback, options);
  sPromise.then(() => {
    sPromise.cancel();
  }).start();
  return sPromise;
}

module.exports = exports.default;