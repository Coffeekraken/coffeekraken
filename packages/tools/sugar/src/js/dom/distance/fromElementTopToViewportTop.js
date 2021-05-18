import __scrollTop from '../scroll/scrollTop';
import __offset from '../offset/offset';
/**
 * @name            fromElementTopToViewportTop
 * @namespace       js.dom.distance
 * @type            Function
 *
 * This function take an element as parameter and returns you to distance it has
 * from the element top to the viewport top in pixels
 *
 * @param       {HTMLElement}       elm             The element you want to get the distance from
 * @return      {Number}                            The calculated distance
 *
 * @example         js
 * import distanceFromElementTopToViewportTop from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportTop';
 * distanceFromElementTopViewportBottom(myElement); // => 23
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function fromElementTopToViewportTop(elm) {
    const offsets = __offset(elm);
    const scrollTop = __scrollTop();
    // @ts-ignore
    return offsets.top - scrollTop;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbUVsZW1lbnRUb3BUb1ZpZXdwb3J0VG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbUVsZW1lbnRUb3BUb1ZpZXdwb3J0VG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sUUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsMkJBQTJCLENBQUMsR0FBRztJQUNyRCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsTUFBTSxTQUFTLEdBQUcsV0FBVyxFQUFFLENBQUM7SUFDaEMsYUFBYTtJQUNiLE9BQU8sT0FBTyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7QUFDakMsQ0FBQyJ9