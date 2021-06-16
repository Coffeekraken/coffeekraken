import __scrollTop from '../scroll/scrollTop';
import __offset from '../offset/offset';
/**
 * @name            fromElementTopToViewportBottom
 * @namespace       js.dom.distance
 * @type            Function
 * @platform        js
 * @status          beta
 *
 * This function take an element as parameter and returns you to distance it has
 * from the element top to the viewport bottom in pixels
 *
 * @param       {HTMLElement}       elm             The element you want to get the distance from
 * @return      {Number}                            The calculated distance
 *
 * @example         js
 * import distanceFromElementTopToViewportBottom from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportBottom';
 * distanceFromElementTopViewportBottom(myElement); // => 23
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function fromElementTopToViewportBottom(elm) {
    const offsets = __offset(elm);
    const scrollTop = __scrollTop();
    // @ts-ignore
    const viewportHeight = window.innerHeight;
    const distance = viewportHeight - offsets.top + scrollTop;
    return distance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbUVsZW1lbnRUb3BUb1ZpZXdwb3J0Qm90dG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbUVsZW1lbnRUb3BUb1ZpZXdwb3J0Qm90dG9tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sUUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSw4QkFBOEIsQ0FBQyxHQUFnQjtJQUNyRSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsTUFBTSxTQUFTLEdBQUcsV0FBVyxFQUFFLENBQUM7SUFDaEMsYUFBYTtJQUNiLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDMUMsTUFBTSxRQUFRLEdBQUcsY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO0lBQzFELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMifQ==