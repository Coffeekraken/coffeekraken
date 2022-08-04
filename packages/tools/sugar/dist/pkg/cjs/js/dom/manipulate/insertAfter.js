"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      insertAfter
 * @namespace            js.dom.manipulate
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Insert an HTMLElement after another HTMLElement
 *
 * @param 		{HTMLElement} 				elm  		The element to insert
 * @param 		{HTMLElement} 				refElm 		The element after which to insert the passed element
 * @return    {HTMLElement}               The inserted node
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import insertAfter from '@coffeekraken/sugar/js/dom/insertAfter'
 * insertAfter(myElementToInsert, theReferenceElement);
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function insertAfter(elm, refElm) {
    // next sibling of ref elm
    const nextSibling = refElm.nextSibling;
    if (!nextSibling) {
        refElm.parentNode.appendChild(elm);
    }
    else {
        refElm.parentNode.insertBefore(elm, nextSibling);
    }
    return elm;
}
exports.default = insertAfter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsV0FBVyxDQUFDLEdBQWdCLEVBQUUsTUFBbUI7SUFDdEQsMEJBQTBCO0lBQzFCLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDdkMsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNkLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3RDO1NBQU07UUFDSCxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDcEQ7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFDRCxrQkFBZSxXQUFXLENBQUMifQ==