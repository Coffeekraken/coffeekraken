// @ts-nocheck
import __SEvent from '../../event/SEvent';
/**
 * @name      dispatchEvent
 * @namespace            js.dom.event
 * @type      Function
 * @platform          js
 * @status          stable
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function dispatchEvent($target, name, data = null) {
    // create new event
    const e = new __SEvent(name, {
        detail: data,
        bubbles: true,
        cancelable: true,
    });
    $target.dispatchEvent(e);
}
export default dispatchEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxvQkFBb0IsQ0FBQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsYUFBYSxDQUNsQixPQUFvQixFQUNwQixJQUFZLEVBQ1osT0FBWSxJQUFJO0lBRWhCLG1CQUFtQjtJQUNuQixNQUFNLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDekIsTUFBTSxFQUFFLElBQUk7UUFDWixPQUFPLEVBQUUsSUFBSTtRQUNiLFVBQVUsRUFBRSxJQUFJO0tBQ25CLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUNELGVBQWUsYUFBYSxDQUFDIn0=