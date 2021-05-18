// @ts-nocheck
/**
 * @name      visible
 * @namespace            js.dom.is
 * @type      Function
 * @stable
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
 * import visible from '@coffeekraken/sugar/js/dom/is/visible'
 * if (visible(myCoolHTMLElement) {
 * 		// i'm visible
 * }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function visible(elm) {
    // assume that the script tag is always visible
    if (elm.nodeName.toLowerCase() === 'script')
        return true;
    // get style
    const style = window.getComputedStyle(elm, null), opacity = style['opacity'], visibility = style['visibility'], display = style['display'];
    return '0' !== opacity && 'none' !== display && 'hidden' !== visibility;
}
window.__visible = visible;
export default visible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpc2libGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxHQUFHO0lBQ2xCLCtDQUErQztJQUMvQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRXpELFlBQVk7SUFDWixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUM5QyxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUMxQixVQUFVLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUNoQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdCLE9BQU8sR0FBRyxLQUFLLE9BQU8sSUFBSSxNQUFNLEtBQUssT0FBTyxJQUFJLFFBQVEsS0FBSyxVQUFVLENBQUM7QUFDMUUsQ0FBQztBQUNELE1BQU0sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0FBQzNCLGVBQWUsT0FBTyxDQUFDIn0=