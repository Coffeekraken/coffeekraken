// @ts-nocheck
import { __isScrollable } from '@coffeekraken/sugar/dom';
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
 * import { __closestScrollable } from '@coffeekraken/sugar/dom';
 * __closestScrollable($myElement);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __closestScrollable($elm, selector) {
    const res = __traverseUp($elm, ($e) => __isScrollable($e));
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLG1CQUFtQixDQUN2QyxJQUFpQixFQUNqQixRQUEyQjtJQUUzQixNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMifQ==