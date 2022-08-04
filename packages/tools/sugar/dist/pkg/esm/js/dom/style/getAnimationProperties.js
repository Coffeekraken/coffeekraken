// @ts-nocheck
import __getStyleProperty from './getStyleProperty';
import __convert from '../../../shared/time/convert';
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
function getAnimationProperties(elm) {
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
        duration: duration.split(',').map((value) => __convert(value, 'ms')),
        delay: `${delay}`.split(',').map((value) => __convert(value, 'ms')),
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
export default getAnimationProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGtCQUFrQixNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sU0FBUyxNQUFNLDhCQUE4QixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFFSCxtREFBbUQ7QUFDbkQsMkJBQTJCO0FBQzNCLHNCQUFzQjtBQUN0QixpQkFBaUI7QUFDakIsaUNBQWlDO0FBQ2pDLDBCQUEwQjtBQUMxQiw2QkFBNkI7QUFDN0Isd0JBQXdCO0FBQ3hCLElBQUk7QUFFSixTQUFTLHNCQUFzQixDQUFDLEdBQWdCOztJQUM1QywrQkFBK0I7SUFDL0IsTUFBTSxJQUFJLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdELE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUN2RSxNQUFNLGNBQWMsR0FDaEIsa0JBQWtCLENBQUMsR0FBRyxFQUFFLDJCQUEyQixDQUFDLElBQUksUUFBUSxDQUFDO0lBQ3JFLE1BQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNqRSxNQUFNLGNBQWMsR0FDaEIsa0JBQWtCLENBQUMsR0FBRyxFQUFFLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELE1BQU0sU0FBUyxHQUNYLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLFFBQVEsQ0FBQztJQUMvRCxNQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUMsSUFBSSxNQUFNLENBQUM7SUFDMUUsTUFBTSxTQUFTLEdBQ1gsa0JBQWtCLENBQUMsR0FBRyxFQUFFLHNCQUFzQixDQUFDLElBQUksU0FBUyxDQUFDO0lBRWpFLDhCQUE4QjtJQUM5QixNQUFNLEtBQUssR0FBRztRQUNWLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNyQixRQUFRLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEUsS0FBSyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRSxjQUFjLEVBQ1YsQ0FBQSxNQUFBLE1BQUEsY0FBYyxDQUFDLEtBQUssK0RBQUcsR0FBRyxDQUFDLG1DQUFJLGNBQWMsQ0FBQyxJQUFJO1lBQzlDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3BCLGNBQWMsRUFBRSxHQUFHLGNBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDOUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQy9CLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUM3QixTQUFTLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDbEMsQ0FBQztJQUNGLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztJQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDWixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3ZDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLEVBQUU7WUFDakMsYUFBYSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3BDLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxlQUFlLHNCQUFzQixDQUFDIn0=