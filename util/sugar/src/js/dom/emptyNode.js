/**
 * @name        emptyNode
 * @namespace     sugar.js.dom
 * @type        Function
 *
 * Empty a node by removing each childs one after the other
 *
 * @param           {HTMLElement}         node          The node to empty
 * @return          {HTMLElement}                       The node that was passed to maintain chainability
 *
 * @example       js
 * @import emptyNode from '@coffeekraken/sugar/js/dom/emptyNode';
 * emptyNode(myCoolNode);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function emptyNode(node) {
  while (node.firstChild) {
     node.removeChild(node.firstChild);
  }
  return node;
}
