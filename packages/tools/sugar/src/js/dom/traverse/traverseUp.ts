// @ts-nocheck

/**
 * @name        traverseUp
 * @namespace            js.dom.traverse
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Go up the dom three until the callback function return true
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @param 		{Function} 				        callback 	The callback function to call on each element. If this returns on an element, it will be the returned element
 * @return 		{HTMLElement} 								The element found or null
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __traverseUp } from '@coffeekraken/sugar/dom'
 * const $elm = __traverseUp($myElement, elm => {
 *      return elm.classList.contains('my-class')
 * });
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __traverseUp(
    $elm: HTMLElement,
    callback: Function,
): HTMLElement {
    const originalElm = $elm;
    $elm = $elm.parentNode;
    while ($elm && $elm != originalElm.ownerDocument) {
        if (callback($elm)) {
            return $elm;
        }
        $elm = $elm.parentNode;
    }
    return null;
}
