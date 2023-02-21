// @ts-nocheck
/**
 * @name      offsetFromViewport
 * @namespace            js.dom.offset
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Get the offset top and left of the passed element from the document top left point
 *
 * @param 		{HTMLElement} 					elm  		The element to get the offset from
 * @return 		{top: number; left: number;} 									The offset top and left object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __offsetFromViewport } from '@coffeekraken/sugar/dom'
 * const __offsetFromViewport = offset(myCoolElement);
 * // output : { top : 200, left : 300 }
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __offsetFromViewport(elm) {
    const box = elm.getBoundingClientRect(), body = document.body, docEl = document.documentElement, scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop, scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft, clientTop = docEl.clientTop || body.clientTop || 0, clientLeft = docEl.clientLeft || body.clientLeft || 0, top = box.top + scrollTop - clientTop, left = box.left + scrollLeft - clientLeft;
    return {
        top: Math.round(top),
        left: Math.round(left),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLG9CQUFvQixDQUFDLEdBQWdCO0lBSXpELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxFQUNuQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFDcEIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxlQUFlLEVBQ2hDLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsRUFDbkUsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUN0RSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFDbEQsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQ3JELEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxTQUFTLEVBQ3JDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDOUMsT0FBTztRQUNILEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7S0FDekIsQ0FBQztBQUNOLENBQUMifQ==