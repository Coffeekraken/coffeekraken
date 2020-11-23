import __SPromise from '../promise/SPromise';

/**
 * @name        dispatch
 * @namespace           sugar.node.event
 * @type          Function
 *
 * This function can ben used to dispatch an event globally.
 * You can subscribe to these events using the "sugar.node.event.subscribe" function
 *
 * @param         {String}        name          The event name you want to dispatch to
 * @param         {Mixed}        value          The value you want to send alongside the event
 *
 * @example       js
 * import dispatch from '@coffeekraken/sugar/node/event/dispatch';
 * dispatch('something', 'Hello world');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function dispatch(name, value) {
  // check that the global SPromise exists
  if (!global._sugarEventSPromise)
    global._sugarEventSPromise = new __SPromise({
      id: 'sugarEventSPromise'
    });
  // dispatch to the event
  global._sugarEventSPromise.trigger(name, value);
}
