// @ts-nocheck
/**
 * @name      inViewport
 * @namespace            js.dom.is
 * @type      Function
 * @stable
 *
 * Check if the passed HTMLElement is in the viewport or not
 *
 * @param 		{HTMLElement} 				elm  			The element to insert
 * @param 		{Object} 					[offset=50] 	An object of top, right, bottom and left offset used to detect the status or an object with top, right, bottom and left offsets
 * @return 		{Boolean}									If the element is in the viewport or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import inViewport from '@coffeekraken/sugar/js/dom/is/inViewport'
 * if (inViewport(myCoolHTMLElement) {
 * 		// i'm in the viewport
 * }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function inViewport(elm, offset = 50) {
    // handle offset
    let offsetTop = offset;
    let offsetRight = offset;
    let offsetBottom = offset;
    let offsetLeft = offset;
    if (typeof offset === 'object') {
        offsetTop = offset.top || 0;
        offsetRight = offset.right || 0;
        offsetBottom = offset.bottom || 0;
        offsetLeft = offset.left || 0;
    }
    const containerHeight = window.innerHeight || document.documentElement.clientHeight;
    const containerWidth = window.innerWidth || document.documentElement.clientWidth;
    const rect = elm.getBoundingClientRect();
    const isTopIn = rect.top - containerHeight - offsetBottom <= 0;
    const isBottomIn = rect.bottom - offsetTop >= 0;
    const isLeftIn = rect.left - containerWidth - offsetRight <= 0;
    const isRightIn = rect.right - offsetLeft >= 0;
    return isTopIn && isBottomIn && isLeftIn && isRightIn;
}
export default inViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluVmlld3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLEVBQUU7SUFDbEMsZ0JBQWdCO0lBQ2hCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUN2QixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUM7SUFDekIsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDO0lBQzFCLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQztJQUN4QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUM5QixTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDNUIsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ2hDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUNsQyxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7S0FDL0I7SUFDRCxNQUFNLGVBQWUsR0FDbkIsTUFBTSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQztJQUM5RCxNQUFNLGNBQWMsR0FDbEIsTUFBTSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztJQUM1RCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUN6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLGVBQWUsR0FBRyxZQUFZLElBQUksQ0FBQyxDQUFDO0lBQy9ELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQztJQUNoRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsR0FBRyxXQUFXLElBQUksQ0FBQyxDQUFDO0lBQy9ELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxJQUFJLENBQUMsQ0FBQztJQUMvQyxPQUFPLE9BQU8sSUFBSSxVQUFVLElBQUksUUFBUSxJQUFJLFNBQVMsQ0FBQztBQUN4RCxDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==