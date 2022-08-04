// @ts-nocheck
import __isVisible from '../is/visible';
/**
 * @name        closestNotVisible
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Go up the dom three to find the first element that is not visible.
 * Not visible mean that has either an opacity to 0, a visibility to hidden or a display to none
 *
 * @param 		{HTMLElement} 					elm  		The element to start on
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import closestNotVisible from '@coffeekraken/sugar/js/dom/query/closestNotVisible'
 * const closestElm = closestNotVisible(myCoolElement);
 * if (closestElm) {
 * 		// we have found en element that is not visible
 * }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function closestNotVisible(elm) {
    const originalElm = elm;
    elm = elm.parentNode;
    while (elm && elm != originalElm.ownerDocument) {
        if (!__isVisible(elm)) {
            return elm;
        }
        elm = elm.parentNode;
    }
    return null;
}
export default closestNotVisible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxHQUFnQjtJQUN2QyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7SUFDeEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7SUFDckIsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUU7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQixPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQ0QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7S0FDeEI7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxpQkFBaUIsQ0FBQyJ9