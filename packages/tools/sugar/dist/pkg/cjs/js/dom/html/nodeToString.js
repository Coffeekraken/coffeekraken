"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
function __nodeToString(node, deep = true) {
    if (document !== undefined && document.createElement !== undefined) {
        const cont = document.createElement('div');
        cont.appendChild(node.cloneNode(deep));
        return cont.innerHTML;
    }
    return node;
}
exports.default = __nodeToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUF3QixjQUFjLENBQ2xDLElBQWlCLEVBQ2pCLE9BQWdCLElBQUk7SUFFcEIsSUFBSSxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1FBQ2hFLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3pCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQVZELGlDQVVDIn0=