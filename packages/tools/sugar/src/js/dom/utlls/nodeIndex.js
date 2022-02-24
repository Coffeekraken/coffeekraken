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
export default nodeIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZUluZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm9kZUluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFpQjtJQUNoQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQ3pDLEtBQUssRUFBRSxDQUFDO0tBQ1g7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==