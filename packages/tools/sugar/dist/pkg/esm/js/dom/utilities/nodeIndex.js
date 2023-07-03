// @ts-nocheck
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
 * @snippet         __nodeIndex($1)
 *
 * @example    js
 * import { __nodeIndex } from '@coffeekraken/sugar/dom'
 * // assuming:
 * // <li>item #1</li>
 * // <li class="match">item #2</li>
 * // <li>item #3</li>
 *  __nodeIndex(document.querySelector('.match')) // 1
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __nodeIndex(node) {
    let index = 0;
    while ((node = node.previousElementSibling)) {
        index++;
    }
    return index;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUFDLElBQWlCO0lBQ2pELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7UUFDekMsS0FBSyxFQUFFLENBQUM7S0FDWDtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMifQ==