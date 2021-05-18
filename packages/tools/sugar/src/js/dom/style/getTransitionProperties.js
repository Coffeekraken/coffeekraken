// @ts-nocheck
import __getStyleProperty from './getStyleProperty';
import __convert from '../../../shared/time/convert';
/**
 * @name      getTransitionProperties
 * @namespace            js.dom.style
 * @type      Function
 * @stable
 *
 * Get the css transition properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
 *
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
        timingFunction: splitIfNeeded(timingFunction, ',')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNpdGlvblByb3BlcnRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRUcmFuc2l0aW9uUHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxrQkFBa0IsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLFNBQVMsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFFSCxTQUFTLGFBQWEsQ0FBQyxJQUFJLEVBQUUsU0FBUztJQUNwQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDbEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDekQ7SUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMsdUJBQXVCLENBQUMsR0FBRztJQUNsQyxnQ0FBZ0M7SUFDaEMsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDaEUsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO0lBQzdFLE1BQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBRTFELCtCQUErQjtJQUMvQixNQUFNLEtBQUssR0FBRztRQUNaLFFBQVEsRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQztRQUN0QyxRQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNuRCxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUN2QjtRQUNELEtBQUssRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RSxjQUFjLEVBQUUsYUFBYSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUM7S0FDbkQsQ0FBQztJQUNGLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztJQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3pDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLEVBQUU7WUFDbkMsYUFBYSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakM7UUFDRCxDQUFDLEVBQUUsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDcEMsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBQ0QsZUFBZSx1QkFBdUIsQ0FBQyJ9