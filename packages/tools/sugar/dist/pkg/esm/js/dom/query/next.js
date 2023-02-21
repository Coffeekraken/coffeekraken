// @ts-nocheck
import { __matches } from '@coffeekraken/sugar/dom';
/**
 * @name      next
 * @namespace            js.dom.query
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Browse the passed element next siblings to find the first element that matches the passed selector
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
 * import { __next } from '@coffeekraken/sugar/dom'
 * const nextElm =  __next(myCoolElement, '.my-cool-class');
 * if (nextElm) {
 * 		// we have found en element that matches the selector
 * }
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __next(elm, selector) {
    elm = elm.nextSibling;
    while (elm) {
        if (__matches(elm, selector)) {
            return elm;
        }
        elm = elm.nextSibling;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQzFCLEdBQWdCLEVBQ2hCLFFBQWdCO0lBRWhCLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQ3RCLE9BQU8sR0FBRyxFQUFFO1FBQ1IsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQzFCLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFDRCxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztLQUN6QjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMifQ==