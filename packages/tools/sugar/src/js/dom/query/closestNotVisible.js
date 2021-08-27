// @ts-nocheck
import __isVisible from '../is/visible';
/**
 * @name        closestNotVisible
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @platform          ts
 * @status        beta
 *
 * Go up the dom three to find the first element that is not visible.
 * Not visible mean that has either an opacity to 0, a visibility to hidden or a display to none
 *
 * @param 		{HTMLElement} 					elm  		The element to start on
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import closestNotVisible from 'sugarcss/js/dom/closestNotVisible'
 * const closestElm = closestNotVisible(myCoolElement);
 * if (closestElm) {
 * 		// we have found en element that is not visible
 * }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function closestNotVisible(elm) {
    const originalElm = elm;
    elm = elm.parentNode;
    while (elm && elm != originalElm.ownerDocument) {
        if (!__isVisible(elm)) {
            return elm;
        }
        elm = elm.parentNode;
    }
    return null;
}
export default closestNotVisible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2VzdE5vdFZpc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbG9zZXN0Tm90VmlzaWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLGlCQUFpQixDQUFDLEdBQWdCO0lBQ3ZDLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUN4QixHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNyQixPQUFPLEdBQUcsSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRTtRQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCxHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztLQUN4QjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxlQUFlLGlCQUFpQixDQUFDIn0=