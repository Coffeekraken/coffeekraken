// @ts-nocheck
import __getStyleProperty from './getStyleProperty';
import __convert from '../../../shared/time/convert';
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
 * @example  	js
 * import getTransitionProperties from '@coffeekraken/sugar/js/dom/getTransitionProperties'
 * const props = getTransitionProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	property : ['all'],
 * // 	duration : [200],
 * // 	delay : [0],
 * // 	timingFunction : ['linear'],
 * // 	totalDuration : 200
 * // }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function splitIfNeeded(what, separator) {
    if (what.indexOf(separator) !== -1) {
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
        duration: splitIfNeeded(duration, ',').map((value) => __convert(value, 'ms')),
        delay: splitIfNeeded(delay, ',').map((value) => __convert(value, 'ms')),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNpdGlvblByb3BlcnRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRUcmFuc2l0aW9uUHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxrQkFBa0IsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLFNBQVMsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUVILFNBQVMsYUFBYSxDQUFDLElBQUksRUFBRSxTQUFTO0lBQ2xDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNoQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMzRDtJQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQixDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FBQyxHQUFnQjtJQUM3QyxnQ0FBZ0M7SUFDaEMsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDaEUsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUNyQyxHQUFHLEVBQ0gsNEJBQTRCLENBQy9CLENBQUM7SUFDRixNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUUxRCwrQkFBK0I7SUFDL0IsTUFBTSxLQUFLLEdBQUc7UUFDVixRQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7UUFDdEMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDakQsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FDekI7UUFDRCxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsY0FBYyxFQUFFLGFBQWEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDO0tBQ3JELENBQUM7SUFDRixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUN2QyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxFQUFFO1lBQ2pDLGFBQWEsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsQ0FBQyxFQUFFLENBQUM7SUFDUixDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3BDLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxlQUFlLHVCQUF1QixDQUFDIn0=