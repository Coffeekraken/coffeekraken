// @ts-nocheck

/**
 * @name        stringToHtml
 * @namespace            js.dom.html
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Return the html (dom) version of a string
 *
 * @param    {HTMLElement}    html    The string to convert to dom nodes
 * @return    {HTMLElement}    The dom nodes representation of the passed string
 *
 * @snippet         __stringToNode($1);
 *
 * @example    js
 * import { __stringToNode } from '@coffeekraken/sugar/dom'
 * const myString = '<p>Hello World</p>'
 * __stringToNode(myString) // <p>Hello World</p>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __stringToNode(string: string): HTMLElement | string {
    if (document !== undefined && document.createElement !== undefined) {
        const cont = document.createElement('div');
        cont.innerHTML = string;
        if (cont.children.length === 1) {
            return cont.children[0];
        } else {
            return cont;
        }
    }
    return string;
}
