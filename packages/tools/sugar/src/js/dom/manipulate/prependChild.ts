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
 * @snippet         __prependChild($1, $2);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __prependChild } from '@coffeekraken/sugar/dom'
 * __prependChild(myElementToInsert, theReferenceElement);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __prependChild(
    elm: HTMLElement,
    refElm: HTMLElement,
): HTMLElement {
    if (!refElm.firstChild) {
        refElm.appendChild(elm);
    } else {
        refElm.insertBefore(elm, refElm.firstChild);
    }
    return elm;
}
