// @ts-nocheck
import __matches from './matches';
/**
 * @name      previous
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Browse the passed element previous siblings to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					elm  		The element to start on
 * @param 		{String} 						selector 	A css selector to search for
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import previous from '@coffeekraken/sugar/js/dom/query/previous'
 * const previousElm = previous(myCoolElement, '.my-cool-class');
 * if (previousElm) {
 * 		// we have found en element that matches the selector
 * }
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function previous(elm, selector) {
    elm = elm.previousSibling;
    while (elm) {
        if (__matches(elm, selector)) {
            return elm;
        }
        elm = elm.previousSibling;
    }
    return false;
}
export default previous;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlvdXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmV2aW91cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxTQUFTLE1BQU0sV0FBVyxDQUFDO0FBRWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsUUFBUSxDQUFDLEdBQWdCLEVBQUUsUUFBZ0I7SUFDaEQsR0FBRyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUM7SUFDMUIsT0FBTyxHQUFHLEVBQUU7UUFDUixJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDMUIsT0FBTyxHQUFHLENBQUM7U0FDZDtRQUNELEdBQUcsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDO0tBQzdCO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=