const __SPromise = require('../promise/SPromise');

/**
 * @name        trigger
 * @namespace           node.event
 * @type          Function
 *
 * This function can ben used to trigger an event globally.
 * You can subscribe to these events using the "sugar.node.event.subscribe" function
 *
 * @param         {String}        name          The event name you want to trigger to
 * @param         {Mixed}        value          The value you want to send alongside the event
 *
 * @example       js
 * const trigger = require('@coffeekraken/sugar/node/event/trigger');
 * trigger('something', 'Hello world');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function trigger(name, value) {
  // check that the global SPromise exists
  if (!global._sugarEventSPromise)
    global._sugarEventSPromise = new __SPromise(() => {}).start();
  // trigger to the event
  global._sugarEventSPromise.trigger(name, value);
};
