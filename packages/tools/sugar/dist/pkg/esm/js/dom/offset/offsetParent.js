// @ts-nocheck
import { __offsetFromViewport } from '@coffeekraken/sugar/dom';
/**
 * @name      offsetParent
 * @namespace            js.dom.offset
 * @type      Function
 * @platform          js
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function offsetParent(elm) {
    const parentOffset = __offsetFromViewport(elm.parentNode);
    const offset = __offsetFromViewport(elm);
    return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left,
    };
}
export default offsetParent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFlBQVksQ0FBQyxHQUFnQjtJQUlsQyxNQUFNLFlBQVksR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUQsTUFBTSxNQUFNLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekMsT0FBTztRQUNILEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxHQUFHO1FBQ2xDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJO0tBQ3hDLENBQUM7QUFDTixDQUFDO0FBQ0QsZUFBZSxZQUFZLENBQUMifQ==