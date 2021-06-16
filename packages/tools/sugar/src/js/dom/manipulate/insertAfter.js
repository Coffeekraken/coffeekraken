// @ts-nocheck
/**
 * @name      insertAfter
 * @namespace            js.dom.manipulate
 * @type      Function
 * @platform      js
 * @status        beta
 *
 * Insert an HTMLElement after another HTMLElement
 *
 * @param 		{HTMLElement} 				elm  		The element to insert
 * @param 		{HTMLElement} 				refElm 		The element after which to insert the passed element
 * @return    {HTMLElement}               The inserted node
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
export default insertAfter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0QWZ0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnNlcnRBZnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxXQUFXLENBQUMsR0FBZ0IsRUFBRSxNQUFtQjtJQUN4RCwwQkFBMEI7SUFDMUIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUN2QyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BDO1NBQU07UUFDTCxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDbEQ7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9