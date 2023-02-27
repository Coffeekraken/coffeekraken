"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
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
 * @snippet         __inViewportPercentage($1)
 *
 * @example  	js
 * import { __inViewportPercentage } from '@coffeekraken/sugar/dom'
 * const percentage = __inViewportPercentage(myCoolHTMLElement);
 * // 20
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __inViewportPercentage(elm) {
    // if not visible at all
    if (!(0, dom_1.__isVisible)(elm))
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
exports.default = __inViewportPercentage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQXdCLHNCQUFzQixDQUFDLEdBQWdCO0lBQzNELHdCQUF3QjtJQUN4QixJQUFJLENBQUMsSUFBQSxpQkFBVyxFQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRWhDLG1DQUFtQztJQUNuQyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUU3QyxJQUFJLGVBQWUsR0FBRyxHQUFHLEVBQ3JCLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztJQUUzQixtQkFBbUI7SUFDbkIsSUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7UUFDNUQsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO0tBQzFCO1NBQU07UUFDSCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDakQsSUFBSSxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRTtZQUNsQixnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvRDtRQUNELElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQ3RDLGdCQUFnQjtnQkFDWixDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xFO0tBQ0o7SUFDRCxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDaEQsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDO1FBQUUsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLElBQUksZ0JBQWdCLEdBQUcsR0FBRztRQUFFLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztJQUVuRCxrQkFBa0I7SUFDbEIsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUU7UUFDM0QsZUFBZSxHQUFHLEdBQUcsQ0FBQztLQUN6QjtTQUFNO1FBQ0gsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2hELElBQUksUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDbkIsZUFBZSxJQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDcEMsZUFBZTtnQkFDWCxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQy9EO0tBQ0o7SUFDRCxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM5QyxJQUFJLGVBQWUsR0FBRyxDQUFDO1FBQUUsZUFBZSxHQUFHLENBQUMsQ0FBQztJQUM3QyxJQUFJLGVBQWUsR0FBRyxHQUFHO1FBQUUsZUFBZSxHQUFHLEdBQUcsQ0FBQztJQUVqRCxvQ0FBb0M7SUFDcEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUNiLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsQ0FDN0QsQ0FBQztBQUNOLENBQUM7QUFoREQseUNBZ0RDIn0=