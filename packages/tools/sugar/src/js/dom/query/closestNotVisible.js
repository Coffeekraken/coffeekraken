// @ts-nocheck
import __isVisible from '../is/visible';
/**
 * @name        closestNotVisible
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
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
 * import closestNotVisible from 'sugarcss/js/dom/query/closestNotVisible'
 * const closestElm = closestNotVisible(myCoolElement);
 * if (closestElm) {
 * 		// we have found en element that is not visible
 * }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2VzdE5vdFZpc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbG9zZXN0Tm90VmlzaWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsaUJBQWlCLENBQUMsR0FBZ0I7SUFDdkMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0lBQ3hCLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQ3JCLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxHQUFHLENBQUM7U0FDZDtRQUNELEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO0tBQ3hCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNELGVBQWUsaUJBQWlCLENBQUMifQ==