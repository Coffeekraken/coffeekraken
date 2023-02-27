"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
 * @snippet         __dispatchEvent($1, $2, $3)
 *
 * @example  	js
 * import { __dispatchEvent } from '@coffeekraken/sugar/js/dom/dispatchEvent'
 *  __dispatchEvent(myCoolHTMLElement, 'myCoolEventName', {
 * 		var1 : 'value1'
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __dispatchEvent($target, name, data = null) {
    // create new event
    const e = new CustomEvent(name, {
        detail: data,
        bubbles: true,
        cancelable: true,
    });
    $target.dispatchEvent(e);
}
exports.default = __dispatchEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsY0FBYztBQUNkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUF3QixlQUFlLENBQ25DLE9BQW9CLEVBQ3BCLElBQVksRUFDWixPQUFZLElBQUk7SUFFaEIsbUJBQW1CO0lBQ25CLE1BQU0sQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksRUFBRTtRQUM1QixNQUFNLEVBQUUsSUFBSTtRQUNaLE9BQU8sRUFBRSxJQUFJO1FBQ2IsVUFBVSxFQUFFLElBQUk7S0FDbkIsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBWkQsa0NBWUMifQ==