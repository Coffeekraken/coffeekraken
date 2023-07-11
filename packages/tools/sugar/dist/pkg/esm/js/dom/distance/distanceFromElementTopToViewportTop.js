import __scrollTop from '../distance/scrollTop.js';
import __offsetFromViewport from '../offset/offsetFromViewport.js';
/**
 * @name            distanceFromElementTopToViewportTop
 * @namespace       js.dom.distance
 * @type            Function
 * @platform          js
 * @status          betas
 *
 * This function take an element as parameter and returns you to distance it has
 * from the element top to the viewport top in pixels
 *
 * @param       {HTMLElement}       elm             The element you want to get the distance from
 * @return      {Number}                            The calculated distance
 *
 * @snippet         __distanceFromElementTopToViewportTop($1)
 *
 * @example         js
 * import { __distanceFromElementTopToViewportTop } from '@coffeekraken/sugar/dom';
 * __distanceFromElementTopToViewportTop(myElement); // => 23
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __distanceFromElementTopToViewportTop(elm) {
    const offsets = __offsetFromViewport(elm);
    const scrollTop = __scrollTop();
    // @ts-ignore
    return offsets.top - scrollTop;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sb0JBQW9CLE1BQU0saUNBQWlDLENBQUM7QUFFbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUscUNBQXFDLENBQ3pELEdBQWdCO0lBRWhCLE1BQU0sT0FBTyxHQUFHLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sU0FBUyxHQUFHLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLGFBQWE7SUFDYixPQUFPLE9BQU8sQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO0FBQ25DLENBQUMifQ==