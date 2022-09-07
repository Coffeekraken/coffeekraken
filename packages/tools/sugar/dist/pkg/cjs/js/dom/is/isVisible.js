"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      isVisible
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the passed HTMLElement is visible or not.
 * Visible mean that it has not an opacity of 0, not a visibility of hidden and not a display of none
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
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isVisible(elm) {
    // assume that the script tag is always visible
    if (elm.nodeName.toLowerCase() === 'script')
        return true;
    // get style
    const style = window.getComputedStyle(elm, null), opacity = style['opacity'], visibility = style['visibility'], display = style['display'];
    return '0' !== opacity && 'none' !== display && 'hidden' !== visibility;
}
exports.default = isVisible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBd0IsU0FBUyxDQUFDLEdBQWdCO0lBQzlDLCtDQUErQztJQUMvQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRXpELFlBQVk7SUFDWixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUM1QyxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUMxQixVQUFVLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUNoQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9CLE9BQU8sR0FBRyxLQUFLLE9BQU8sSUFBSSxNQUFNLEtBQUssT0FBTyxJQUFJLFFBQVEsS0FBSyxVQUFVLENBQUM7QUFDNUUsQ0FBQztBQVZELDRCQVVDIn0=