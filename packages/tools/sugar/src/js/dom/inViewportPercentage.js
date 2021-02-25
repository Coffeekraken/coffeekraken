// @ts-nocheck
import __isVisible from './isVisible';
/**
 * @name      inViewportPercentage
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Return how many percent the passed element is visible in the viewport
 *
 * @param 		{HTMLElement} 				elm  		The element to get the in viewport percentage from
 * @return 		{Number} 								The percentage visible in the viewport
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import inViewportPercentage from '@coffeekraken/sugar/js/dom/inViewportPercentage'
 * const percentage = inViewportPercentage(myCoolHTMLElement);
 * // 20
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function inViewportPercentage(elm) {
    // if not visible at all
    if (!__isVisible(elm))
        return 0;
    // calculate the visible percentage
    const bounding = elm.getBoundingClientRect();
    let percentageWidth = 100, percentageHeight = 100;
    // percentageHeight
    if (bounding.top >= 0 && bounding.bottom <= window.innerHeight) {
        percentageHeight = 100;
    }
    else {
        const elmHeight = bounding.bottom - bounding.top;
        if (bounding.top < 0) {
            percentageHeight -= (100 / elmHeight) * (bounding.top * -1);
        }
        if (bounding.bottom > window.innerHeight) {
            percentageHeight -=
                (100 / elmHeight) * (bounding.bottom - window.innerHeight);
        }
    }
    percentageHeight = Math.round(percentageHeight);
    if (percentageHeight < 0)
        percentageHeight = 0;
    if (percentageHeight > 100)
        percentageHeight = 100;
    // percentageWidth
    if (bounding.left >= 0 && bounding.right <= window.innerWidth) {
        percentageWidth = 100;
    }
    else {
        const elmWidth = bounding.right - bounding.left;
        if (bounding.left < 0) {
            percentageWidth -= (100 / elmWidth) * (bounding.left * -1);
        }
        if (bounding.right > window.innerWidth) {
            percentageWidth -=
                (100 / elmWidth) * (bounding.right - window.innerWidth);
        }
    }
    percentageWidth = Math.round(percentageWidth);
    if (percentageWidth < 0)
        percentageWidth = 0;
    if (percentageWidth > 100)
        percentageWidth = 100;
    // calculate the percentage in total
    return Math.round((100 / (100 * 100)) * (percentageWidth * percentageHeight));
}
export default inViewportPercentage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydFBlcmNlbnRhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpblZpZXdwb3J0UGVyY2VudGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxvQkFBb0IsQ0FBQyxHQUFHO0lBQy9CLHdCQUF3QjtJQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRWhDLG1DQUFtQztJQUNuQyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUU3QyxJQUFJLGVBQWUsR0FBRyxHQUFHLEVBQ3ZCLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztJQUV6QixtQkFBbUI7SUFDbkIsSUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7UUFDOUQsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO0tBQ3hCO1NBQU07UUFDTCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDakQsSUFBSSxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRTtZQUNwQixnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3RDtRQUNELElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQ3hDLGdCQUFnQjtnQkFDZCxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzlEO0tBQ0Y7SUFDRCxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDaEQsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDO1FBQUUsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLElBQUksZ0JBQWdCLEdBQUcsR0FBRztRQUFFLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztJQUVuRCxrQkFBa0I7SUFDbEIsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUU7UUFDN0QsZUFBZSxHQUFHLEdBQUcsQ0FBQztLQUN2QjtTQUFNO1FBQ0wsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2hELElBQUksUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDckIsZUFBZSxJQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDdEMsZUFBZTtnQkFDYixDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzNEO0tBQ0Y7SUFDRCxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM5QyxJQUFJLGVBQWUsR0FBRyxDQUFDO1FBQUUsZUFBZSxHQUFHLENBQUMsQ0FBQztJQUM3QyxJQUFJLGVBQWUsR0FBRyxHQUFHO1FBQUUsZUFBZSxHQUFHLEdBQUcsQ0FBQztJQUVqRCxvQ0FBb0M7SUFDcEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0FBQ2hGLENBQUM7QUFDRCxlQUFlLG9CQUFvQixDQUFDIn0=