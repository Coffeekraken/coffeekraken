// @ts-nocheck
import { __styleObjectToString, __styleStringToObject } from '@coffeekraken/sugar/css';
/**
 * @name      style
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Set or remove a css style property on an HTMLElement
 *
 * @param 		{HTMLElement} 			elm 			The element to process
 * @param 		{Object} 				styleObj 		An object of style to apply
 * @return 		(Object) 								The element applied style
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __style($1, $2)
 *
 * @example 	js
 * import { __style } from '@coffeekraken/sugar/dom'
 * __style(myCoolHTMLElement, {
 * 		paddingLeft : 20,
 * 		display : null
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __style(elm, styleObj) {
    // convert style string to object
    const styleAttr = elm.getAttribute('style');
    if (styleAttr) {
        styleObj = Object.assign(Object.assign({}, __styleStringToObject(styleAttr)), styleObj);
    }
    // apply the style to the element
    // elm.setAttribute('style', __styleObjectToString(current.styleObj));
    elm.style.cssText = __styleObjectToString(styleObj);
    // return the style
    return elm.style;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUN4QixNQUFNLHlCQUF5QixDQUFDO0FBRWpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPLENBQUMsR0FBZ0IsRUFBRSxRQUFhO0lBQzNELGlDQUFpQztJQUNqQyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLElBQUksU0FBUyxFQUFFO1FBQ1gsUUFBUSxtQ0FDRCxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsR0FDaEMsUUFBUSxDQUNkLENBQUM7S0FDTDtJQUVELGlDQUFpQztJQUNqQyxzRUFBc0U7SUFDdEUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFcEQsbUJBQW1CO0lBQ25CLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztBQUNyQixDQUFDIn0=