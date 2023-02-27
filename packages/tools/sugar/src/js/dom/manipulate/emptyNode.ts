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
 * @snippet         __emptyNode($1)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * @import { __emptyNode } from '@coffeekraken/sugar/dom';
 * __emptyNode (myCoolNode);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __emptyNode(node: HTMLElement): HTMLElement {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    return node;
}
