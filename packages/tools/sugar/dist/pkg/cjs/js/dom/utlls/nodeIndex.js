"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      nodeIndex
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @status      beta
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function nodeIndex(node) {
    let index = 0;
    while ((node = node.previousElementSibling)) {
        index++;
    }
    return index;
}
exports.default = nodeIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQWlCO0lBQ2hDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7UUFDekMsS0FBSyxFQUFFLENBQUM7S0FDWDtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==