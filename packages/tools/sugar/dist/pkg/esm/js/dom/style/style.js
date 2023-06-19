// @ts-nocheck
import __styleObjectToString from '../../../shared/css/transform/styleObjectToString';
import __styleStringToObject from '../../../shared/css/transform/styleStringToObject';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLHFCQUFxQixNQUFNLG1EQUFtRCxDQUFDO0FBQ3RGLE9BQU8scUJBQXFCLE1BQU0sbURBQW1ELENBQUM7QUFFdEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLE9BQU8sQ0FBQyxHQUFnQixFQUFFLFFBQWE7SUFDM0QsaUNBQWlDO0lBQ2pDLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsSUFBSSxTQUFTLEVBQUU7UUFDWCxRQUFRLG1DQUNELHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxHQUNoQyxRQUFRLENBQ2QsQ0FBQztLQUNMO0lBRUQsaUNBQWlDO0lBQ2pDLHNFQUFzRTtJQUN0RSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVwRCxtQkFBbUI7SUFDbkIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQ3JCLENBQUMifQ==