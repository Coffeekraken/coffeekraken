// @ts-nocheck
import { __offsetFromViewport } from '@coffeekraken/sugar/dom';
/**
 * @name      offsetFromParent
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
 * import { __offsetFromParent } from '@coffeekraken/sugar/dom'
 * const offsetFromParentElm = __offsetFromParent(myCoolElement);
 * // output : { top : 200, left : 300 }
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __offsetFromParent(elm) {
    const parentOffset = __offsetFromViewport(elm.parentNode);
    const offset = __offsetFromViewport(elm);
    return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGtCQUFrQixDQUFDLEdBQWdCO0lBSXZELE1BQU0sWUFBWSxHQUFHLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxRCxNQUFNLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QyxPQUFPO1FBQ0gsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLEdBQUc7UUFDbEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUk7S0FDeEMsQ0FBQztBQUNOLENBQUMifQ==