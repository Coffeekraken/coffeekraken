// @ts-nocheck
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
export default prependChild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGVuZENoaWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJlcGVuZENoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFlBQVksQ0FBQyxHQUFnQixFQUFFLE1BQW1CO0lBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1FBQ3BCLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDM0I7U0FBTTtRQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUMvQztJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUNELGVBQWUsWUFBWSxDQUFDIn0=