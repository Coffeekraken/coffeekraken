// @ts-nocheck
/**
 * @name      visible
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpc2libGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxPQUFPLENBQUMsR0FBZ0I7SUFDN0IsK0NBQStDO0lBQy9DLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFekQsWUFBWTtJQUNaLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQzVDLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQzFCLFVBQVUsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQ2hDLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0IsT0FBTyxHQUFHLEtBQUssT0FBTyxJQUFJLE1BQU0sS0FBSyxPQUFPLElBQUksUUFBUSxLQUFLLFVBQVUsQ0FBQztBQUM1RSxDQUFDO0FBQ0QsTUFBTSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7QUFDM0IsZUFBZSxPQUFPLENBQUMifQ==