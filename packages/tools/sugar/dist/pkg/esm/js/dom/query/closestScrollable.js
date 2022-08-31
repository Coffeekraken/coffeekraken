// @ts-nocheck
import __isScrollable from '../is/scrollable';
import __traverseUp from '../traverse/up';
/**
 * @name        closestScrollable
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Go up the dom three to find the first element that is scrollable
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import __closestScrollable from '@coffeekraken/sugar/js/node/query/closestScrollable';
 * __closestScrollable($myElement);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function closestScrollable($elm, selector) {
    const res = __traverseUp($elm, ($e) => __isScrollable($e));
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsaUJBQWlCLENBQ3JDLElBQWlCLEVBQ2pCLFFBQTJCO0lBRTNCLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQyJ9