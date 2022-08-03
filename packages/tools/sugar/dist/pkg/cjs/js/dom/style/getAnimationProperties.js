"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getStyleProperty_1 = __importDefault(require("./getStyleProperty"));
const convert_1 = __importDefault(require("../../../shared/time/convert"));
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
    const name = (0, getStyleProperty_1.default)(elm, 'animation-name') || '';
    const duration = (0, getStyleProperty_1.default)(elm, 'animation-duration') || '0s';
    const timingFunction = (0, getStyleProperty_1.default)(elm, 'animation-timing-function') || 'linear';
    const delay = (0, getStyleProperty_1.default)(elm, 'animation-delay') || '0s';
    const iterationCount = (0, getStyleProperty_1.default)(elm, 'animation-iteration-count') || 1;
    const direction = (0, getStyleProperty_1.default)(elm, 'animation-direction') || 'normal';
    const fillMode = (0, getStyleProperty_1.default)(elm, 'animation-fill-mode') || 'none';
    const playState = (0, getStyleProperty_1.default)(elm, 'animation-play-state') || 'running';
    // return the animation object
    const props = {
        name: name.split(','),
        duration: duration.split(',').map((value) => (0, convert_1.default)(value, 'ms')),
        delay: `${delay}`.split(',').map((value) => (0, convert_1.default)(value, 'ms')),
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
exports.default = getAnimationProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBFQUFvRDtBQUNwRCwyRUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUVILG1EQUFtRDtBQUNuRCwyQkFBMkI7QUFDM0Isc0JBQXNCO0FBQ3RCLGlCQUFpQjtBQUNqQixpQ0FBaUM7QUFDakMsMEJBQTBCO0FBQzFCLDZCQUE2QjtBQUM3Qix3QkFBd0I7QUFDeEIsSUFBSTtBQUVKLFNBQVMsc0JBQXNCLENBQUMsR0FBZ0I7O0lBQzVDLCtCQUErQjtJQUMvQixNQUFNLElBQUksR0FBRyxJQUFBLDBCQUFrQixFQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3RCxNQUFNLFFBQVEsR0FBRyxJQUFBLDBCQUFrQixFQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUN2RSxNQUFNLGNBQWMsR0FDaEIsSUFBQSwwQkFBa0IsRUFBQyxHQUFHLEVBQUUsMkJBQTJCLENBQUMsSUFBSSxRQUFRLENBQUM7SUFDckUsTUFBTSxLQUFLLEdBQUcsSUFBQSwwQkFBa0IsRUFBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDakUsTUFBTSxjQUFjLEdBQ2hCLElBQUEsMEJBQWtCLEVBQUMsR0FBRyxFQUFFLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELE1BQU0sU0FBUyxHQUNYLElBQUEsMEJBQWtCLEVBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLElBQUksUUFBUSxDQUFDO0lBQy9ELE1BQU0sUUFBUSxHQUFHLElBQUEsMEJBQWtCLEVBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLElBQUksTUFBTSxDQUFDO0lBQzFFLE1BQU0sU0FBUyxHQUNYLElBQUEsMEJBQWtCLEVBQUMsR0FBRyxFQUFFLHNCQUFzQixDQUFDLElBQUksU0FBUyxDQUFDO0lBRWpFLDhCQUE4QjtJQUM5QixNQUFNLEtBQUssR0FBRztRQUNWLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNyQixRQUFRLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUEsaUJBQVMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEUsS0FBSyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBQSxpQkFBUyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRSxjQUFjLEVBQ1YsQ0FBQSxNQUFBLE1BQUEsY0FBYyxDQUFDLEtBQUssK0RBQUcsR0FBRyxDQUFDLG1DQUFJLGNBQWMsQ0FBQyxJQUFJO1lBQzlDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3BCLGNBQWMsRUFBRSxHQUFHLGNBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDOUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQy9CLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUM3QixTQUFTLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDbEMsQ0FBQztJQUNGLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztJQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDWixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3ZDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLEVBQUU7WUFDakMsYUFBYSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3BDLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxrQkFBZSxzQkFBc0IsQ0FBQyJ9