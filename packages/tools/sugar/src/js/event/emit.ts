// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';

/**
 * @name        emit
 * @namespace           sugar.js.event
 * @type          Function
 * @stable
 *
 * This function can ben used to emit an event globally.
 * You can subscribe to these events using the "sugar.js.event.subscribe" function
 *
 * @param         {String}        name          The event name you want to trigger to
 * @param         {Mixed}        value          The value you want to send alongside the event
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import emit from '@coffeekraken/sugar/js/event/emit';
 * emit('something', 'Hello world');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function emit(name, value) {
  // check that the global SPromise exists
  if (!window._sugarEventSPromise)
    window._sugarEventSPromise = new __SPromise({
      id: 'sugarEventSPromise'
    });
  // emit to the event
  window._sugarEventSPromise.emit(name, value);
}
export default emit;
