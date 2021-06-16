// @ts-nocheck
import __offset from './offset';
/**
 * @name      offsetParent
 * @namespace            js.dom.offset
 * @type      Function
 * @platform      js
 * @status      beta
 *
 * Get the offset top and left of the passed element from his parent top left point
 *
 * @param 		{HTMLElement} 					elm  		The element to get the offset from
 * @return 		{top: number; left: number;} 									The offset top and left object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import offsetParent from '@coffeekraken/sugar/js/dom/offsetParent'
 * const offsetParentElm = offsetParent(myCoolElement);
 * // output : { top : 200, left : 300 }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function offsetParent(elm) {
    const parentOffset = __offset(elm.parentNode);
    const offset = __offset(elm);
    return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left
    };
}
export default offsetParent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2Zmc2V0UGFyZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2Zmc2V0UGFyZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxZQUFZLENBQUMsR0FBZ0I7SUFJcEMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsT0FBTztRQUNMLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxHQUFHO1FBQ2xDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJO0tBQ3RDLENBQUM7QUFDSixDQUFDO0FBQ0QsZUFBZSxZQUFZLENBQUMifQ==