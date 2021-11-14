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
function visible(elm: HTMLElement): boolean {
    // assume that the script tag is always visible
    if (elm.nodeName.toLowerCase() === 'script') return true;

    // get style
    const style = window.getComputedStyle(elm, null),
        opacity = style['opacity'],
        visibility = style['visibility'],
        display = style['display'];
    return '0' !== opacity && 'none' !== display && 'hidden' !== visibility;
}
window.__visible = visible;
export default visible;
