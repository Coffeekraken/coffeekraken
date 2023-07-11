// @ts-nocheck
import __convertTime from '../../../shared/datetime/convertTime.js';
import __getStyleProperty from './getStyleProperty.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSx5Q0FBeUMsQ0FBQztBQUNwRSxPQUFPLGtCQUFrQixNQUFNLHVCQUF1QixDQUFDO0FBRXZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFFSCxTQUFTLGFBQWEsQ0FBQyxJQUFJLEVBQUUsU0FBUzs7SUFDbEMsSUFBSSxNQUFBLElBQUksQ0FBQyxRQUFRLHFEQUFHLFNBQVMsQ0FBQyxFQUFFO1FBQzVCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzNEO0lBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xCLENBQUM7QUFFRCxTQUFTLHVCQUF1QixDQUFDLEdBQWdCO0lBQzdDLGdDQUFnQztJQUNoQyxNQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUNoRSxNQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckUsTUFBTSxjQUFjLEdBQUcsa0JBQWtCLENBQ3JDLEdBQUcsRUFDSCw0QkFBNEIsQ0FDL0IsQ0FBQztJQUNGLE1BQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBRTFELCtCQUErQjtJQUMvQixNQUFNLEtBQUssR0FBRztRQUNWLFFBQVEsRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQztRQUN0QyxRQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNqRCxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUM3QjtRQUNELEtBQUssRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQzNDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQzdCO1FBQ0QsY0FBYyxFQUFFLGFBQWEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDO0tBQ3JELENBQUM7SUFDRixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUN2QyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxFQUFFO1lBQ2pDLGFBQWEsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsQ0FBQyxFQUFFLENBQUM7SUFDUixDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3BDLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxlQUFlLHVCQUF1QixDQUFDIn0=