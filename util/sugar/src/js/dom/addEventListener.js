/**
 * @name        addEventListener
 * @namespace       sugar.js.dom
 * @type      Function
 *
 * Add an event listener on an element and return the function to remove the event listener
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to add the event listener
 * @param    {String}    eventName    THe event name to listen to
 * @param    {Function}    callback    The callback function to call on event
 * @param    {Boolean}    [useCapture=false]    Use capture phase or not
 * @param    {object}    [options={}]    An options object that specifies characteristics about the event listener
 * @return    {Function}    The remove event listener function
 *
 * @example    js
 * import addEventListener from '@coffeekraken/sugar/js/dom/addEventListener'
 * const removeEventListener = addEventListener($myCoolElm, 'click', this._myCoolFunction, this)
 * // remove the event listener
 * removeEventListener()
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function addEventListener(
  $elm,
  eventName,
  callback = null,
  useCapture = false,
  options = {}
) {
  // add the event listener
  $elm.addEventListener(eventName, callback, useCapture, options);
  // return the removeEventListener function
  return () => {
    $elm.removeEventListener(eventName, callback, useCapture, options);
  };
}
