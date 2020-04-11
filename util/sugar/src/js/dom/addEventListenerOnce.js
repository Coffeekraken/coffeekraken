import __SPromise from '../promise/SPromise';
import __addEventListener from './addEventListener';

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
export default function addEventListenerOnce(
  $elm,
  event,
  callback = null,
  options = {}
) {
  const sPromise = __addEventListener($elm, event, callback, options);
  sPromise.then(() => {
    sPromise.release();
  }).start();
  return sPromise;
}
