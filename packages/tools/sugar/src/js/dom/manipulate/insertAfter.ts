// @ts-nocheck

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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function insertAfter(elm: HTMLElement, refElm: HTMLElement): HTMLElement {
    // next sibling of ref elm
    const nextSibling = refElm.nextSibling;
    if (!nextSibling) {
        refElm.parentNode.appendChild(elm);
    } else {
        refElm.parentNode.insertBefore(elm, nextSibling);
    }
    return elm;
}
export default insertAfter;
