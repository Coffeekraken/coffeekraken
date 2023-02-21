// @ts-nocheck
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
 * import { __dispatchEvent } from '@coffeekraken/sugar/js/dom/dispatchEvent'
 *  __dispatchEvent(myCoolHTMLElement, 'myCoolEventName', {
 * 		var1 : 'value1'
 * });
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __dispatchEvent($target, name, data = null) {
    // create new event
    const e = new CustomEvent(name, {
        detail: data,
        bubbles: true,
        cancelable: true,
    });
    $target.dispatchEvent(e);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZUFBZSxDQUNuQyxPQUFvQixFQUNwQixJQUFZLEVBQ1osT0FBWSxJQUFJO0lBRWhCLG1CQUFtQjtJQUNuQixNQUFNLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7UUFDNUIsTUFBTSxFQUFFLElBQUk7UUFDWixPQUFPLEVBQUUsSUFBSTtRQUNiLFVBQVUsRUFBRSxJQUFJO0tBQ25CLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0IsQ0FBQyJ9