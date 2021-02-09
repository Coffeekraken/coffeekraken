// @ts-nocheck

import __SEvent from '../event/SEvent';

/**
 * @name      dispatchEvent
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Helper to quickly display an event with some optional data attached to it
 *
 * @param 		{HTMLElement} 					$target  		The element to dispatch the event from
 * @param 		{String} 						name 			The event name to dispatch
 * @param 		{Mixed} 						data 			The data to attache to the event
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import dispatchEvent from '@coffeekraken/sugar/js/dom/dispatchEvent'
 * dispatchEvent(myCoolHTMLElement, 'myCoolEventName', {
 * 		var1 : 'value1'
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function dispatchEvent($target, name, data = null) {
  // create new event
  const e = new __SEvent(name, {
    detail: data,
    bubbles: true,
    cancelable: true
  });
  $target.dispatchEvent(e);
}
export default dispatchEvent;
