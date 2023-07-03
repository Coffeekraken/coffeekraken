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
 * @snippet         __nodeToString($1)
 *
 * @example    js
 * import { __nodeToString } from '@coffeekraken/sugar/dom'
 * const myDomNode = document.querySelector('.my-dom-node')
 *  __nodeToString(myDomNode, false) // <div class="my-dom-node"></div>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __nodeToString(node, deep = true) {
    if (document !== undefined && document.createElement !== undefined) {
        const cont = document.createElement('div');
        cont.appendChild(node.cloneNode(deep));
        return cont.innerHTML;
    }
    return node;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGNBQWMsQ0FDbEMsSUFBaUIsRUFDakIsT0FBZ0IsSUFBSTtJQUVwQixJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxTQUFTLEVBQUU7UUFDaEUsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDekI7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=