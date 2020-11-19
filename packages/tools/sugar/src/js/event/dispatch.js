import __SPromise from '../promise/SPromise';

/**
 * @name        trigger
 * @namespace           sugar.js.event
 * @type          Function
 *
 * This function can ben used to trigger an event globally.
 * You can subscribe to these events using the "sugar.js.event.subscribe" function
 *
 * @param         {String}        name          The event name you want to trigger to
 * @param         {Mixed}        value          The value you want to send alongside the event
 *
 * @example       js
 * const trigger = require('@coffeekraken/sugar/js/event/trigger');
 * trigger('something', 'Hello world');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function trigger(name, value) {
  // check that the global SPromise exists
  if (!window._sugarEventSPromise)
    window._sugarEventSPromise = new __SPromise({
      id: 'sugarEventSPromise'
    });
  // trigger to the event
  window._sugarEventSPromise.trigger(name, value);
}
