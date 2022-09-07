// @ts-nocheck
/**
 * @name        emptyNode
 * @namespace            js.dom.manipulate
 * @type        Function
 * @platform          js
 * @status        beta
 *
 * Empty a node by removing each childs one after the other
 *
 * @param           {HTMLElement}         node          The node to empty
 * @return          {HTMLElement}                       The node that was passed to maintain chainability
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * @import { __emptyNode } from '@coffeekraken/sugar/dom';
 * __emptyNode (myCoolNode);
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __emptyNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    return node;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUFDLElBQWlCO0lBQ2pELE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNyQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==