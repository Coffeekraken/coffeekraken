// @ts-nocheck
/**
 * @name      offset
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
 * import offset from '@coffeekraken/sugar/js/dom/offset'
 * const offsetElm = offset(myCoolElement);
 * // output : { top : 200, left : 300 }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function offset(elm) {
    const box = elm.getBoundingClientRect(), body = document.body, docEl = document.documentElement, scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop, scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft, clientTop = docEl.clientTop || body.clientTop || 0, clientLeft = docEl.clientLeft || body.clientLeft || 0, top = box.top + scrollTop - clientTop, left = box.left + scrollLeft - clientLeft;
    return {
        top: Math.round(top),
        left: Math.round(left),
    };
}
export default offset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLE1BQU0sQ0FBQyxHQUFnQjtJQUk1QixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMscUJBQXFCLEVBQUUsRUFDbkMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQ3BCLEtBQUssR0FBRyxRQUFRLENBQUMsZUFBZSxFQUNoQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQ25FLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsRUFDdEUsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQ2xELFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUNyRCxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxTQUFTLEdBQUcsU0FBUyxFQUNyQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQzlDLE9BQU87UUFDSCxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0tBQ3pCLENBQUM7QUFDTixDQUFDO0FBQ0QsZUFBZSxNQUFNLENBQUMifQ==