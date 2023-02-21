// @ts-nocheck
import { __matches } from '@coffeekraken/sugar/dom';
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
 * import { __querySelectorUp } from '@coffeekraken/sugar/dom'
 * const closestElm =  __querySelectorUp(myCoolElement, '.my-cool-class');
 * if (closestElm) {
 * 		// we have found en element that matches the selector
 * }
 * // the selector param can be a function that need to return either true or false like so:
 *  __querySelectorUp(myCoolElement, (elm) => {
 *   return elm.hasAttribute('my-cool-attribute')
 * })
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __querySelectorUp($elm, selector) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsaUJBQWlCLENBQ3JDLElBQWlCLEVBQ2pCLFFBQTJCO0lBRTNCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQztJQUN6QixJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN2QixPQUFPLElBQUksSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRTtRQUM5QyxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtZQUNoQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7U0FDbkM7YUFBTSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQ2xFLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUMxQjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==