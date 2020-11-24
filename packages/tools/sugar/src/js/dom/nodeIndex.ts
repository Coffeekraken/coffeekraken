// @ts-nocheck

/**
 * @name      nodeIndex
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Return the inde of the passed node inside the html
 *
 * @param    {HTMLElement}    node    The node to get the index for
 * @return    {Integer}    The index of the node inside the html
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import nodeIndex from '@coffeekraken/sugar/js/dom/nodeIndex'
 * // assuming:
 * // <li>item #1</li>
 * // <li class="match">item #2</li>
 * // <li>item #3</li>
 * nodeIndex(document.querySelector('.match')) // 1
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function nodeIndex(node) {
  let index = 0;
  while ((node = node.previousElementSibling)) {
    index++;
  }
  return index;
}
export = nodeIndex;