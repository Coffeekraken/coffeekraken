import __SPromise from '../promise/SPromise';

/**
 * @name        addEventListener
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Add an event listener on an element and return the function to remove the event listener
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to add the event listener
 * @param    {String}    eventNames    The event names to listen to. Can be a simple string like "click", multiple events like "click,focus", or an array of events like ['click','hover']
 * @param    {Function}    callback    The callback function to call on event. The passed event
 * @param    {Boolean}    [useCapture=false]    A Boolean value that specifies whether the event should be executed in the capturing or in the bubbling phase
 * @return    {SPromise}                An SPromise instance on which you can listen for events or simply "cancel" the listeneing process
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
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
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function addEventListener(
  $elm,
  eventNames,
  callback = null,
  useCapture = false
) {
  if (!Array.isArray(eventNames))
    eventNames = eventNames.split(',').map((e) => e.trim());

  if (callback && typeof callback === 'function') callback = callback;
  else if (callback && typeof callback === 'boolean') useCapture = callback;

  const eventsStack = {};

  const promise = new __SPromise({
    id: 'addEventListener'
  }).on('cancel,finally', () => {
    eventNames.forEach((eventName) => {
      const stack = eventsStack[eventName];
      $elm.removeEventListener(eventName, stack.callback, stack.useCapture);
    });
  });

  eventNames.forEach((eventName) => {
    const internalCallback = (event) => {
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
