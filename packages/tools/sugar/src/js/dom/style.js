// @ts-nocheck
import __styleString2Object from './styleString2Object';
import __styleObject2String from './styleObject2String';
/**
 * @name      style
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBR2QsT0FBTyxvQkFBb0IsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLG9CQUFvQixNQUFNLHNCQUFzQixDQUFDO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxLQUFLLENBQUMsR0FBRyxFQUFFLFFBQVE7SUFDMUIsaUNBQWlDO0lBQ2pDLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsSUFBSSxTQUFTLEVBQUU7UUFDYixRQUFRLG1DQUNILG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxHQUMvQixRQUFRLENBQ1osQ0FBQztLQUNIO0lBRUQsaUNBQWlDO0lBQ2pDLHFFQUFxRTtJQUNyRSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVuRCxtQkFBbUI7SUFDbkIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQ25CLENBQUM7QUFDRCxlQUFlLEtBQUssQ0FBQyJ9