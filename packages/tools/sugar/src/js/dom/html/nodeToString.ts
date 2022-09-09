// @ts-nocheck

/**
 * @name            nodeToString
 * @namespace            js.dom.html
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Return the string version of a dom node or the dom node and his children
 *
 * @param    {HTMLElement}    node    The HTMLElement to convert to string
 * @param    {Boolean}    [deep=true]    Include or not his children
 * @return    {String}    The string version of the dom node
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __nodeToString } from '@coffeekraken/sugar/dom'
 * const myDomNode = document.querySelector('.my-dom-node')
 *  __nodeToString(myDomNode, false) // <div class="my-dom-node"></div>
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __nodeToString(
    node: HTMLElement,
    deep: boolean = true,
): string {
    if (document !== undefined && document.createElement !== undefined) {
        const cont = document.createElement('div');
        cont.appendChild(node.cloneNode(deep));
        return cont.innerHTML;
    }
    return node;
}
