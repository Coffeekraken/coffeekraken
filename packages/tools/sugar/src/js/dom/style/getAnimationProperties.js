// @ts-nocheck
import __getStyleProperty from './getStyleProperty';
import __convert from '../../../shared/time/convert';
/**
 * @name      getAnimationProperties
 * @namespace            js.dom.style
 * @type      Function
 * @platform        js
 * @status          wip
 *
 * Get the css animation properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
 *
 * @todo      refactore
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import getAnimationProperties from '@coffeekraken/sugar/js/dom/getAnimationProperties'
 * const props = getAnimationProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	name : ['animation1'],
 * // 	duration : [200],
 * // 	delay : [0],
 * // 	timingFunction : ['linear'],
 * // 	iterationCount : [1],
 * // 	direction : ['forward'],
 * // 	totalDuration : 200
 * // }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// export interface IGetAnimationPropertiesObject {
//   name : ['animation1'],
//   duration : [200],
//   delay : [0],
//   timingFunction : ['linear'],
//   iterationCount : [1],
//   direction : ['forward'],
//   totalDuration : 200
// }
function getAnimationProperties(elm) {
    // get the animation properties
    const name = __getStyleProperty(elm, 'animation-name') || '';
    const duration = __getStyleProperty(elm, 'animation-duration') || '0s';
    const timingFunction = __getStyleProperty(elm, 'animation-timing-function') || 'linear';
    const delay = __getStyleProperty(elm, 'animation-delay') || '0s';
    const iterationCount = __getStyleProperty(elm, 'animation-iteration-count') || 1;
    const direction = __getStyleProperty(elm, 'animation-direction') || 'normal';
    // return the animation object
    const props = {
        name: name.split(','),
        duration: duration.split(',').map((value) => __convert(value, 'ms')),
        delay: `${delay}`.split(',').map((value) => __convert(value, 'ms')),
        timingFunction: timingFunction.split(','),
        iterationCount: `${iterationCount}`.split(','),
        direction: direction.split(',')
    };
    let totalDuration = 0;
    const i = 0;
    const delays = [0].concat(props.delay);
    [0].concat(props.duration).forEach((val) => {
        if (val + delays[i] > totalDuration) {
            totalDuration = val + delays[i];
        }
    });
    props.totalDuration = totalDuration;
    return props;
}
export default getAnimationProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QW5pbWF0aW9uUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEFuaW1hdGlvblByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sa0JBQWtCLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxTQUFTLE1BQU0sOEJBQThCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUVILG1EQUFtRDtBQUNuRCwyQkFBMkI7QUFDM0Isc0JBQXNCO0FBQ3RCLGlCQUFpQjtBQUNqQixpQ0FBaUM7QUFDakMsMEJBQTBCO0FBQzFCLDZCQUE2QjtBQUM3Qix3QkFBd0I7QUFDeEIsSUFBSTtBQUVKLFNBQVMsc0JBQXNCLENBQUMsR0FBZ0I7SUFDOUMsK0JBQStCO0lBQy9CLE1BQU0sSUFBSSxHQUFHLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3RCxNQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDdkUsTUFBTSxjQUFjLEdBQ2xCLGtCQUFrQixDQUFDLEdBQUcsRUFBRSwyQkFBMkIsQ0FBQyxJQUFJLFFBQVEsQ0FBQztJQUNuRSxNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDakUsTUFBTSxjQUFjLEdBQ2xCLGtCQUFrQixDQUFDLEdBQUcsRUFBRSwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxNQUFNLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUMsSUFBSSxRQUFRLENBQUM7SUFFN0UsOEJBQThCO0lBQzlCLE1BQU0sS0FBSyxHQUFHO1FBQ1osSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3JCLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRSxLQUFLLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25FLGNBQWMsRUFBRSxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUN6QyxjQUFjLEVBQUUsR0FBRyxjQUFjLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzlDLFNBQVMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNoQyxDQUFDO0lBQ0YsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDekMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsRUFBRTtZQUNuQyxhQUFhLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDcEMsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBQ0QsZUFBZSxzQkFBc0IsQ0FBQyJ9