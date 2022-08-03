"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      prependChild
 * @namespace            js.dom.manipulate
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Prepend an HTMLElement into another HTMLElement
 *
 * @param 		{HTMLElement} 				elm  		The element to prepend
 * @param 		{HTMLElement} 				refElm 		The element in which to prepend the new element
 * @return    {HTMLElement}               The prepended element
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import prependChild from '@coffeekraken/sugar/js/dom/prependChild'
 * prependChild(myElementToInsert, theReferenceElement);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function prependChild(elm, refElm) {
    if (!refElm.firstChild) {
        refElm.appendChild(elm);
    }
    else {
        refElm.insertBefore(elm, refElm.firstChild);
    }
    return elm;
}
exports.default = prependChild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsWUFBWSxDQUFDLEdBQWdCLEVBQUUsTUFBbUI7SUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7UUFDcEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMzQjtTQUFNO1FBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQy9DO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0Qsa0JBQWUsWUFBWSxDQUFDIn0=