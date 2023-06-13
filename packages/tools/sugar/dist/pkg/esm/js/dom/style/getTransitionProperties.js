// @ts-nocheck
import { __getStyleProperty } from '@coffeekraken/sugar/dom';
import __convertTime from '../../../shared/datetime/convertTime';
/**
 * @name      getTransitionProperties
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status        wip
 *
 * Get the css transition properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
 *
 * @todo      refactor
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __getTransitionProperties($1)
 *
 * @example  	js
 * import { getTransitionProperties } from '@coffeekraken/sugar/dom'
 * const props = __getTransitionProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	property : ['all'],
 * // 	duration : [200],
 * // 	delay : [0],
 * // 	timingFunction : ['linear'],
 * // 	totalDuration : 200
 * // }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function splitIfNeeded(what, separator) {
    var _a;
    if ((_a = what.includes) === null || _a === void 0 ? void 0 : _a.call(what, separator)) {
        return what.split(separator).map((item) => item.trim());
    }
    return [what];
}
function getTransitionProperties(elm) {
    // get the transition properties
    const property = __getStyleProperty(elm, 'transition-property');
    const duration = __getStyleProperty(elm, 'transition-duration') || 0;
    const timingFunction = __getStyleProperty(elm, 'transition-timing-function');
    const delay = __getStyleProperty(elm, 'transition-delay');
    // return the transition object
    const props = {
        property: splitIfNeeded(property, ','),
        duration: splitIfNeeded(duration, ',').map((value) => __convertTime(value, 'ms')),
        delay: splitIfNeeded(delay, ',').map((value) => __convertTime(value, 'ms')),
        timingFunction: splitIfNeeded(timingFunction, ','),
    };
    let totalDuration = 0;
    let i = 0;
    const delays = [0].concat(props.delay);
    [0].concat(props.duration).forEach((val) => {
        if (val + delays[i] > totalDuration) {
            totalDuration = val + delays[i];
        }
        i++;
    });
    props.totalDuration = totalDuration;
    return props;
}
export default getTransitionProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLGFBQWEsTUFBTSxzQ0FBc0MsQ0FBQztBQUVqRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBRUgsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFLFNBQVM7O0lBQ2xDLElBQUksTUFBQSxJQUFJLENBQUMsUUFBUSxxREFBRyxTQUFTLENBQUMsRUFBRTtRQUM1QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMzRDtJQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQixDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FBQyxHQUFnQjtJQUM3QyxnQ0FBZ0M7SUFDaEMsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDaEUsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUNyQyxHQUFHLEVBQ0gsNEJBQTRCLENBQy9CLENBQUM7SUFDRixNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUUxRCwrQkFBK0I7SUFDL0IsTUFBTSxLQUFLLEdBQUc7UUFDVixRQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7UUFDdEMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDakQsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FDN0I7UUFDRCxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUMzQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUM3QjtRQUNELGNBQWMsRUFBRSxhQUFhLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQztLQUNyRCxDQUFDO0lBQ0YsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDdkMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsRUFBRTtZQUNqQyxhQUFhLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQztRQUNELENBQUMsRUFBRSxDQUFDO0lBQ1IsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNwQyxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBQ0QsZUFBZSx1QkFBdUIsQ0FBQyJ9