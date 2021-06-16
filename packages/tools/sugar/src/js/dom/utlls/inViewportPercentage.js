// @ts-nocheck
import __isVisible from '../isVisible';
/**
 * @name      inViewportPercentage
 * @namespace            js.dom.utils
 * @type      Function
 * @platform      js
 * @status      beta
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydFBlcmNlbnRhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpblZpZXdwb3J0UGVyY2VudGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sY0FBYyxDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsb0JBQW9CLENBQUMsR0FBZ0I7SUFDNUMsd0JBQXdCO0lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQUUsT0FBTyxDQUFDLENBQUM7SUFFaEMsbUNBQW1DO0lBQ25DLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBRTdDLElBQUksZUFBZSxHQUFHLEdBQUcsRUFDdkIsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO0lBRXpCLG1CQUFtQjtJQUNuQixJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtRQUM5RCxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7S0FDeEI7U0FBTTtRQUNMLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUNqRCxJQUFJLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLGdCQUFnQixJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDeEMsZ0JBQWdCO2dCQUNkLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDOUQ7S0FDRjtJQUNELGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNoRCxJQUFJLGdCQUFnQixHQUFHLENBQUM7UUFBRSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFDL0MsSUFBSSxnQkFBZ0IsR0FBRyxHQUFHO1FBQUUsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO0lBRW5ELGtCQUFrQjtJQUNsQixJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtRQUM3RCxlQUFlLEdBQUcsR0FBRyxDQUFDO0tBQ3ZCO1NBQU07UUFDTCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDaEQsSUFBSSxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNyQixlQUFlLElBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUN0QyxlQUFlO2dCQUNiLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDM0Q7S0FDRjtJQUNELGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzlDLElBQUksZUFBZSxHQUFHLENBQUM7UUFBRSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLElBQUksZUFBZSxHQUFHLEdBQUc7UUFBRSxlQUFlLEdBQUcsR0FBRyxDQUFDO0lBRWpELG9DQUFvQztJQUNwQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7QUFDaEYsQ0FBQztBQUNELGVBQWUsb0JBQW9CLENBQUMifQ==