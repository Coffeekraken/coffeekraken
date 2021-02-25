// @ts-nocheck
/**
 * @name      isInViewport
 * @namespace           sugar.js.dom
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
 * import isInViewport from '@coffeekraken/sugar/js/dom/isInViewport'
 * if (isInViewport(myCoolHTMLElement) {
 * 		// i'm in the viewport
 * }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isInViewport(elm, offset = 50) {
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
export default isInViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNJblZpZXdwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNJblZpZXdwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxZQUFZLENBQUMsR0FBRyxFQUFFLE1BQU0sR0FBRyxFQUFFO0lBQ3BDLGdCQUFnQjtJQUNoQixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUM7SUFDdkIsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQztJQUMxQixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUM7SUFDeEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDOUIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzVCLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNoQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDbEMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsTUFBTSxlQUFlLEdBQ25CLE1BQU0sQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUM7SUFDOUQsTUFBTSxjQUFjLEdBQ2xCLE1BQU0sQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUM7SUFDNUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDekMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxlQUFlLEdBQUcsWUFBWSxJQUFJLENBQUMsQ0FBQztJQUMvRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsSUFBSSxDQUFDLENBQUM7SUFDaEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLEdBQUcsV0FBVyxJQUFJLENBQUMsQ0FBQztJQUMvRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsSUFBSSxDQUFDLENBQUM7SUFDL0MsT0FBTyxPQUFPLElBQUksVUFBVSxJQUFJLFFBQVEsSUFBSSxTQUFTLENBQUM7QUFDeEQsQ0FBQztBQUNELGVBQWUsWUFBWSxDQUFDIn0=