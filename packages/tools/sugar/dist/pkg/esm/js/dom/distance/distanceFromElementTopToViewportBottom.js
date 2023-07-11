import __scrollTop from '../distance/scrollTop.js';
import __offsetFromViewport from '../offset/offsetFromViewport.js';
/**
 * @name            distanceFromElementTopToViewportBottom
 * @namespace       js.dom.distance
 * @type            Function
 * @platform          js
 * @status          beta
 *
 * This function take an element as parameter and returns you to distance it has
 * from the element top to the viewport bottom in pixels
 *
 * @param       {HTMLElement}       elm             The element you want to get the distance from
 * @return      {Number}                            The calculated distance
 *
 * @snippet         __distanceFromElementTopToViewportBottom($1)
 *
 * @example         js
 * import { __distanceFromElementTopToViewportBottom } from '@coffeekraken/sugar/dom';
 * __distanceFromElementTopToViewportBottom(myElement); // => 23
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __distanceFromElementTopToViewportBottom(elm) {
    const offsets = __offsetFromViewport(elm);
    const scrollTop = __scrollTop();
    // @ts-ignore
    const viewportHeight = window.innerHeight;
    const distance = viewportHeight - offsets.top + scrollTop;
    return distance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sb0JBQW9CLE1BQU0saUNBQWlDLENBQUM7QUFFbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsd0NBQXdDLENBQzVELEdBQWdCO0lBRWhCLE1BQU0sT0FBTyxHQUFHLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sU0FBUyxHQUFHLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLGFBQWE7SUFDYixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQzFDLE1BQU0sUUFBUSxHQUFHLGNBQWMsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztJQUMxRCxPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDIn0=