// @ts-nocheck

/**
 * @name        emptyNode
 * @namespace           sugar.js.dom
 * @type        Function
 * @stable
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
 * @import emptyNode from '@coffeekraken/sugar/js/dom/emptyNode';
 * emptyNode(myCoolNode);
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function emptyNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  return node;
}
export default emptyNode;
