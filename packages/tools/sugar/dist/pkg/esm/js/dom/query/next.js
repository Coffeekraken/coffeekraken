// @ts-nocheck
import __matches from './matches';
/**
 * @name      next
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Browse the passed element next siblings to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					elm  		The element to start on
 * @param 		{String} 						selector 	A css selector to search for
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import next from '@coffeekraken/sugar/js/dom/query/next'
 * const nextElm = next(myCoolElement, '.my-cool-class');
 * if (nextElm) {
 * 		// we have found en element that matches the selector
 * }
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function next(elm, selector) {
    elm = elm.nextSibling;
    while (elm) {
        if (__matches(elm, selector)) {
            return elm;
        }
        elm = elm.nextSibling;
    }
    return false;
}
export default next;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxXQUFXLENBQUM7QUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxJQUFJLENBQUMsR0FBZ0IsRUFBRSxRQUFnQjtJQUM1QyxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUN0QixPQUFPLEdBQUcsRUFBRTtRQUNSLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsRUFBRTtZQUMxQixPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQ0QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7S0FDekI7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBQ0QsZUFBZSxJQUFJLENBQUMifQ==