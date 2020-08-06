import __SPromise from '../promise/SPromise';
import __addEventListener from './addEventListener';

/**
 * @name        addEventListenerOnce
 * @namespace           js.dom
 * @type      Function
 *
 * Add an event listener that will be trigerred only once
 *
 * @param    {HTMLElement}    $elm    The element to add the event listener on
 * @param    {String}    event    The event to listen for
 * @param    {Function}    [callback=null]    The callback function to call on event
 * @param    {Boolean}    [useCapture=false]    A Boolean value that specifies whether the event should be executed in the capturing or in the bubbling phase
 * @return    {Promise}                   A promise that will be resolved once the event has been called
 *
 * @example    js
 * import addEventListenerOnce from '@coffeekraken/sugar/js/dom/addEventListenerOnce'
 * addEventListenerOnce(myElm, 'click', (e) => {
 *     // do something on click
 * });
 * addEventListenerOnce(myElm, 'click').on('click', (e) => {
 *
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function addEventListenerOnce(
  $elm,
  eventNames,
  callback = null,
  useCapture = false
) {
  if (!Array.isArray(eventNames)) eventNames = [eventNames];

  const globalPromise = new __SPromise(() => {}).start();

  const eventsStack = {};

  globalPromise.on('cancel,finally', () => {
    eventNames.forEach((eventName) => {
      eventsStack[eventName].promise.cancel();
    });
  });

  eventNames.forEach((eventName) => {
    const promise = __addEventListener($elm, eventName, null, useCapture);

    eventsStack[eventName] = {
      promise
    };

    promise.on(eventNames, (event) => {
      if (callback && typeof callback === 'function') {
        callback.apply(this, [event]);
      }
      globalPromise.trigger(eventName, event);
      promise.cancel();
    });
  });

  return globalPromise;
}
