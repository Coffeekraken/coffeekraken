const __SPromise = require('../promise/SPromise');

/**
 * @name        on
 * @namespace           js.event
 * @type          Function
 *
 * This function allows you to subscribe to global events triggered by the "sugar.js.event.dispatch" function
 * It use under the hood an SPromise instance
 *
 * @param         {String}        name          The event name you want to subscribe to
 * @param         {Function}      callback      The callback function you want to call
 * @return        {Function}                    Return an "unsubscribe" function callable when you want to stop executing the callback
 *
 * @example       js
 * const on = require('@coffeekraken/sugar/js/event/on');
 * on('something', () => {
 *    // do something
 * });
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function on(name, callback) {
  // check that the global SPromise exists
  if (!global._sugarEventSPromise)
    global._sugarEventSPromise = new __SPromise({
      id: 'sugarEventSPromise'
    });
  // subscribe to the event
  global._sugarEventSPromise.on(name, callback);
  // return the unsubscribe function
  return () => {
    global._sugarEventSPromise.off(name, callback);
  };
};
