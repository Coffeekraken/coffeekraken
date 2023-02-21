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
 * @param 		{HTMLElement} 				elm  		The element to check
 * @return 		{Boolean}								If the element is visible or not
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
 @since           2.0.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFFSCxTQUFTLFVBQVUsQ0FBQyxDQUFDO0lBQ2pCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1RSxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQUMsR0FBZ0I7SUFDOUMsK0NBQStDO0lBQy9DLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFekQsbURBQW1EO0lBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDbEIsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFFRCxZQUFZO0lBQ1osTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFDNUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQ3ZCLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUM3QixPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUM1QixPQUFPLEdBQUcsS0FBSyxPQUFPLElBQUksTUFBTSxLQUFLLE9BQU8sSUFBSSxRQUFRLEtBQUssVUFBVSxDQUFDO0FBQzVFLENBQUMifQ==