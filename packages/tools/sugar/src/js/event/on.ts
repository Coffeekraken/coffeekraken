// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';

/**
 * @name        on
 * @namespace            js.event
 * @type          Function
 * @platform          js
 * @platform          ts
 * @status      beta
 *
 * This function allows you to subscribe to global events triggered by the "sugar.js.event.dispatch" function
 * It use under the hood an SPromise instance
 *
 * @param         {String}        name          The event name you want to subscribe to
 * @param         {Function}      callback      The callback function you want to call
 * @return        {Function}                    Return an "unsubscribe" function callable when you want to stop executing the callback
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import on from '@coffeekraken/sugar/js/event/on';
 * on('something', () => {
 *    // do something
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function on(name: string, callback: Function): void {
  // check that the global SPromise exists
  if (!window._sugarEventSPromise)
    window._sugarEventSPromise = new __SPromise({
      id: 'sugarEventSPromise'
    });
  // subscribe to the event
  window._sugarEventSPromise.on(name, callback);
  // return the unsubscribe function
  return () => {
    window._sugarEventSPromise.off(name, callback);
  };
}
export default on;
