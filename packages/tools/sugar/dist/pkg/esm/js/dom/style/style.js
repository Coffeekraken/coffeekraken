// @ts-nocheck
import __styleString2Object from '../styleString2Object';
import __styleObject2String from '../styleObject2String';
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
 * @example 	js
 * import style from '@coffeekraken/sugar/js/dom/style'
 * style(myCoolHTMLElement, {
 * 		paddingLeft : 20,
 * 		display : null
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function style(elm, styleObj) {
    // convert style string to object
    const styleAttr = elm.getAttribute('style');
    if (styleAttr) {
        styleObj = Object.assign(Object.assign({}, __styleString2Object(styleAttr)), styleObj);
    }
    // apply the style to the element
    // elm.setAttribute('style', __styleObject2String(current.styleObj));
    elm.style.cssText = __styleObject2String(styleObj);
    // return the style
    return elm.style;
}
export default style;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFHZCxPQUFPLG9CQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sb0JBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxLQUFLLENBQUMsR0FBZ0IsRUFBRSxRQUFhO0lBQzFDLGlDQUFpQztJQUNqQyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLElBQUksU0FBUyxFQUFFO1FBQ1gsUUFBUSxtQ0FDRCxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsR0FDL0IsUUFBUSxDQUNkLENBQUM7S0FDTDtJQUVELGlDQUFpQztJQUNqQyxxRUFBcUU7SUFDckUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFbkQsbUJBQW1CO0lBQ25CLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztBQUNyQixDQUFDO0FBQ0QsZUFBZSxLQUFLLENBQUMifQ==