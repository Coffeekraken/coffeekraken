// @ts-nocheck
/**
 * @name      prependChild
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Prepend an HTMLElement into another HTMLElement
 *
 * @param 		{HTMLElement} 				elm  		The element to prepend
 * @param 		{HTMLElement} 				refElm 		The element in which to prepend the new element
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
}
export default prependChild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGVuZENoaWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJlcGVuZENoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxZQUFZLENBQUMsR0FBRyxFQUFFLE1BQU07SUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7UUFDdEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6QjtTQUFNO1FBQ0wsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzdDO0FBQ0gsQ0FBQztBQUNELGVBQWUsWUFBWSxDQUFDIn0=