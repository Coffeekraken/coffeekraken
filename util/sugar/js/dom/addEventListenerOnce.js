"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addEventListenerOnce;

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
 * @param    {Boolean}    [useCapture=false]    Use capture phase or not
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
function addEventListenerOnce($elm, event, callback = null, useCapture = false, options = {}) {
  return new Promise((resolve, reject) => {
    // event handler
    function eventHandler(e) {
      // call the callback
      if (callback) callback(e); // remove the event listener

      $elm.removeEventListener(event, eventHandler, useCapture, options); // resolve the promise

      resolve(e);
    } // add the listener to the element


    $elm.addEventListener(event, eventHandler, useCapture, options);
  });
}

module.exports = exports.default;