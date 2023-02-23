// @ts-nocheck
/**
 * @name      isVisible
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the passed HTMLElement is visible or not.
 * Visible mean that it has not an opacity of 0, not a visibility of hidden and not a display of none and `return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);`
 *
 * @param 		{HTMLElement} 				$elm  		The element to check
 * @return 		{Boolean}								If the element is visible or not
 *
 * @snippet         __isVisible($1);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import { __isVisible } from '@coffeekraken/sugar/dom'
 * if (isVisible(myCoolHTMLElement) {
 * 		// i'm visible
 * }
 *
 * @see             https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function _isVisible(e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
export default function isVisible(elm) {
    // assume that the script tag is always visible
    if (elm.nodeName.toLowerCase() === 'script')
        return true;
    // check if visible through offsets and clientRects
    if (!_isVisible(elm)) {
        return false;
    }
    // get style
    const style = window.getComputedStyle(elm, null), opacity = style.opacity, visibility = style.visibility, display = style.display;
    return '0' !== opacity && 'none' !== display && 'hidden' !== visibility;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUVILFNBQVMsVUFBVSxDQUFDLENBQUM7SUFDakIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzVFLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxHQUFnQjtJQUM5QywrQ0FBK0M7SUFDL0MsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVE7UUFBRSxPQUFPLElBQUksQ0FBQztJQUV6RCxtREFBbUQ7SUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNsQixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELFlBQVk7SUFDWixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUM1QyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFDdkIsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQzdCLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzVCLE9BQU8sR0FBRyxLQUFLLE9BQU8sSUFBSSxNQUFNLEtBQUssT0FBTyxJQUFJLFFBQVEsS0FBSyxVQUFVLENBQUM7QUFDNUUsQ0FBQyJ9