"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addEventListener;

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        addEventListener
 * @namespace           sugar.js.dom
 * @type      Function
 *
 * Add an event listener on an element and return the function to remove the event listener
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to add the event listener
 * @param    {String}    eventNames    The event names to listen to. Can be a simple string like "click", multiple events like "click,focus", or an array of events like ['click','hover']
 * @param    {Function}    callback    The callback function to call on event. The passed event
 * @param    {Boolean}    [useCapture=false]    A Boolean value that specifies whether the event should be executed in the capturing or in the bubbling phase
 * @return    {SPromise}                An SPromise instance on which you can listen for events or simply "cancel" the listeneing process
 *
 * @example    js
 * import addEventListener from '@coffeekraken/sugar/js/dom/addEventListener'
 * const listener = addEventListener($myCoolElm, 'click', (event) => {
 *    // event.type; // => click
 * });
 * // remove the event listener
 * listener.cancel();
 *
 * // listen for more than one event at a time
 * addEventListener($myCoolElm, 'click,mouseover,mouseout', (event) => {
 *    // do something depending on the event.type property
 * }).on('mouseover', (event) => {
 *    // do something when the event is the mouseover one
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function addEventListener($elm, eventNames, callback, useCapture) {
  if (callback === void 0) {
    callback = null;
  }

  if (useCapture === void 0) {
    useCapture = false;
  }

  if (!Array.isArray(eventNames)) eventNames = eventNames.split(',').map(e => e.trim());
  if (callback && typeof callback === 'function') callback = callback;else if (callback && typeof callback === 'boolean') useCapture = callback;
  var eventsStack = {};
  var promise = new _SPromise.default((resolve, reject, trigger, cancel) => {}).on('cancel,finally', () => {
    eventNames.forEach(eventName => {
      var stack = eventsStack[eventName];
      $elm.removeEventListener(eventName, stack.callback, stack.useCapture);
    });
  });
  eventNames.forEach(eventName => {
    var internalCallback = event => {
      if (callback) callback.apply(this, [event]);
      promise.trigger(eventName, event);
    };

    eventsStack[eventName] = {
      callback: internalCallback,
      useCapture
    };
    $elm.addEventListener(eventName, internalCallback, useCapture);
  });
  return promise;
}

module.exports = exports.default;