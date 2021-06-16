// @ts-nocheck
import __styleString2Object from '../styleString2Object';
import __styleObject2String from '../styleObject2String';
/**
 * @name      style
 * @namespace            js.dom.style
 * @type      Function
 * @platform      js
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBR2QsT0FBTyxvQkFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLG9CQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsS0FBSyxDQUFDLEdBQWdCLEVBQUUsUUFBYTtJQUM1QyxpQ0FBaUM7SUFDakMsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU1QyxJQUFJLFNBQVMsRUFBRTtRQUNiLFFBQVEsbUNBQ0gsb0JBQW9CLENBQUMsU0FBUyxDQUFDLEdBQy9CLFFBQVEsQ0FDWixDQUFDO0tBQ0g7SUFFRCxpQ0FBaUM7SUFDakMscUVBQXFFO0lBQ3JFLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRW5ELG1CQUFtQjtJQUNuQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDbkIsQ0FBQztBQUNELGVBQWUsS0FBSyxDQUFDIn0=