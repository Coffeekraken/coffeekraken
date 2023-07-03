// @ts-nocheck
import __getStyleProperty from './getStyleProperty';
import __convertTime from '../../../shared/datetime/convertTime';
/**
 * @name      getAnimationProperties
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
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
 * @snippet         __getAnimationProperties($1)
 *
 * @example  	js
 * import { __getAnimationProperties } from '@coffeekraken/sugar/dom'
 * const props = __getAnimationProperties(myCoolHTMLElement);
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
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
export default function __getAnimationProperties(elm) {
    var _a, _b;
    // get the animation properties
    const name = __getStyleProperty(elm, 'animation-name') || '';
    const duration = __getStyleProperty(elm, 'animation-duration') || '0s';
    const timingFunction = __getStyleProperty(elm, 'animation-timing-function') || 'linear';
    const delay = __getStyleProperty(elm, 'animation-delay') || '0s';
    const iterationCount = __getStyleProperty(elm, 'animation-iteration-count') || 1;
    const direction = __getStyleProperty(elm, 'animation-direction') || 'normal';
    const fillMode = __getStyleProperty(elm, 'animation-fill-mode') || 'none';
    const playState = __getStyleProperty(elm, 'animation-play-state') || 'running';
    // return the animation object
    const props = {
        name: name.split(','),
        duration: duration
            .split(',')
            .map((value) => __convertTime(value, 'ms')),
        delay: `${delay}`.split(',').map((value) => __convertTime(value, 'ms')),
        timingFunction: ((_b = (_a = timingFunction.split) === null || _a === void 0 ? void 0 : _a.call(timingFunction, ',')) !== null && _b !== void 0 ? _b : timingFunction.name)
            ? [timingFunction.name]
            : ['linear'],
        iterationCount: `${iterationCount}`.split(','),
        direction: direction.split(','),
        fillMode: fillMode.split(','),
        playState: playState.split(','),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLGtCQUFrQixNQUFNLG9CQUFvQixDQUFDO0FBRXBELE9BQU8sYUFBYSxNQUFNLHNDQUFzQyxDQUFDO0FBRWpFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUVILG1EQUFtRDtBQUNuRCwyQkFBMkI7QUFDM0Isc0JBQXNCO0FBQ3RCLGlCQUFpQjtBQUNqQixpQ0FBaUM7QUFDakMsMEJBQTBCO0FBQzFCLDZCQUE2QjtBQUM3Qix3QkFBd0I7QUFDeEIsSUFBSTtBQUVKLE1BQU0sQ0FBQyxPQUFPLFVBQVUsd0JBQXdCLENBQUMsR0FBZ0I7O0lBQzdELCtCQUErQjtJQUMvQixNQUFNLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0QsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDLElBQUksSUFBSSxDQUFDO0lBQ3ZFLE1BQU0sY0FBYyxHQUNoQixrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsMkJBQTJCLENBQUMsSUFBSSxRQUFRLENBQUM7SUFDckUsTUFBTSxLQUFLLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLElBQUksSUFBSSxDQUFDO0lBQ2pFLE1BQU0sY0FBYyxHQUNoQixrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsTUFBTSxTQUFTLEdBQ1gsa0JBQWtCLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLElBQUksUUFBUSxDQUFDO0lBQy9ELE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLE1BQU0sQ0FBQztJQUMxRSxNQUFNLFNBQVMsR0FDWCxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLENBQUMsSUFBSSxTQUFTLENBQUM7SUFFakUsOEJBQThCO0lBQzlCLE1BQU0sS0FBSyxHQUFHO1FBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3JCLFFBQVEsRUFBRSxRQUFRO2FBQ2IsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQyxLQUFLLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLGNBQWMsRUFDVixDQUFBLE1BQUEsTUFBQSxjQUFjLENBQUMsS0FBSywrREFBRyxHQUFHLENBQUMsbUNBQUksY0FBYyxDQUFDLElBQUk7WUFDOUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDcEIsY0FBYyxFQUFFLEdBQUcsY0FBYyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUM5QyxTQUFTLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDL0IsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzdCLFNBQVMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNsQyxDQUFDO0lBQ0YsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNaLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDdkMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsRUFBRTtZQUNqQyxhQUFhLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDcEMsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyJ9