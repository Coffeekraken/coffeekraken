// @ts-nocheck
import __matches from './matches';
/**
 * @name        querySelectorUp
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Go up the dom three to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @param 		{String|Function} 				selector 	A css selector to search for or a check function that will be used
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import querySelectorUp from '@coffeekraken/sugar/js/dom/query/querySelectorUp'
 * const closestElm = querySelectorUp(myCoolElement, '.my-cool-class');
 * if (closestElm) {
 * 		// we have found en element that matches the selector
 * }
 * // the selector param can be a function that need to return either true or false like so:
 * querySelectorUp(myCoolElement, (elm) => {
 *   return elm.hasAttribute('my-cool-attribute')
 * })
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function querySelectorUp($elm, selector) {
    const originalElm = $elm;
    $elm = $elm.parentNode;
    while ($elm && $elm != originalElm.ownerDocument) {
        if (typeof selector === 'function') {
            if (selector($elm))
                return $elm;
        }
        else if (typeof selector === 'string' && __matches($elm, selector)) {
            return $elm;
        }
        $elm = $elm.parentNode;
    }
    return null;
}
export default querySelectorUp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvclVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicXVlcnlTZWxlY3RvclVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxXQUFXLENBQUM7QUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILFNBQVMsZUFBZSxDQUFDLElBQWlCLEVBQUUsUUFBMkI7SUFDbkUsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3ZCLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFO1FBQzlDLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ2hDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQztTQUNuQzthQUFNLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDbEUsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQzFCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNELGVBQWUsZUFBZSxDQUFDIn0=