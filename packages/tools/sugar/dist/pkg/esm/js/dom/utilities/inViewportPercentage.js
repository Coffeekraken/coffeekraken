// @ts-nocheck
import { __isVisible } from '@coffeekraken/sugar/dom';
/**
 * @name      inViewportPercentage
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
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
 * import { __inViewportPercentage } from '@coffeekraken/sugar/dom'
 * const percentage = __inViewportPercentage(myCoolHTMLElement);
 * // 20
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __inViewportPercentage(elm) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxzQkFBc0IsQ0FBQyxHQUFnQjtJQUMzRCx3QkFBd0I7SUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFBRSxPQUFPLENBQUMsQ0FBQztJQUVoQyxtQ0FBbUM7SUFDbkMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFFN0MsSUFBSSxlQUFlLEdBQUcsR0FBRyxFQUNyQixnQkFBZ0IsR0FBRyxHQUFHLENBQUM7SUFFM0IsbUJBQW1CO0lBQ25CLElBQUksUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO1FBQzVELGdCQUFnQixHQUFHLEdBQUcsQ0FBQztLQUMxQjtTQUFNO1FBQ0gsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ2pELElBQUksUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDbEIsZ0JBQWdCLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0Q7UUFDRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRTtZQUN0QyxnQkFBZ0I7Z0JBQ1osQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNsRTtLQUNKO0lBQ0QsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2hELElBQUksZ0JBQWdCLEdBQUcsQ0FBQztRQUFFLGdCQUFnQixHQUFHLENBQUMsQ0FBQztJQUMvQyxJQUFJLGdCQUFnQixHQUFHLEdBQUc7UUFBRSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7SUFFbkQsa0JBQWtCO0lBQ2xCLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO1FBQzNELGVBQWUsR0FBRyxHQUFHLENBQUM7S0FDekI7U0FBTTtRQUNILE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNoRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLGVBQWUsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5RDtRQUNELElBQUksUUFBUSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQ3BDLGVBQWU7Z0JBQ1gsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMvRDtLQUNKO0lBQ0QsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUMsSUFBSSxlQUFlLEdBQUcsQ0FBQztRQUFFLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFDN0MsSUFBSSxlQUFlLEdBQUcsR0FBRztRQUFFLGVBQWUsR0FBRyxHQUFHLENBQUM7SUFFakQsb0NBQW9DO0lBQ3BDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FDYixDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLGdCQUFnQixDQUFDLENBQzdELENBQUM7QUFDTixDQUFDIn0=