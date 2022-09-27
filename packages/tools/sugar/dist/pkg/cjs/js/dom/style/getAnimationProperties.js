"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const dom_1 = require("@coffeekraken/sugar/dom");
const convertTime_1 = __importDefault(require("../../../shared/datetime/convertTime"));
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
function __getAnimationProperties(elm) {
    var _a, _b;
    // get the animation properties
    const name = (0, dom_1.__getStyleProperty)(elm, 'animation-name') || '';
    const duration = (0, dom_1.__getStyleProperty)(elm, 'animation-duration') || '0s';
    const timingFunction = (0, dom_1.__getStyleProperty)(elm, 'animation-timing-function') || 'linear';
    const delay = (0, dom_1.__getStyleProperty)(elm, 'animation-delay') || '0s';
    const iterationCount = (0, dom_1.__getStyleProperty)(elm, 'animation-iteration-count') || 1;
    const direction = (0, dom_1.__getStyleProperty)(elm, 'animation-direction') || 'normal';
    const fillMode = (0, dom_1.__getStyleProperty)(elm, 'animation-fill-mode') || 'none';
    const playState = (0, dom_1.__getStyleProperty)(elm, 'animation-play-state') || 'running';
    // return the animation object
    const props = {
        name: name.split(','),
        duration: duration
            .split(',')
            .map((value) => (0, convertTime_1.default)(value, 'ms')),
        delay: `${delay}`.split(',').map((value) => (0, convertTime_1.default)(value, 'ms')),
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
exports.default = __getAnimationProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLGlEQUE2RDtBQUM3RCx1RkFBaUU7QUFFakU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUVILG1EQUFtRDtBQUNuRCwyQkFBMkI7QUFDM0Isc0JBQXNCO0FBQ3RCLGlCQUFpQjtBQUNqQixpQ0FBaUM7QUFDakMsMEJBQTBCO0FBQzFCLDZCQUE2QjtBQUM3Qix3QkFBd0I7QUFDeEIsSUFBSTtBQUVKLFNBQXdCLHdCQUF3QixDQUFDLEdBQWdCOztJQUM3RCwrQkFBK0I7SUFDL0IsTUFBTSxJQUFJLEdBQUcsSUFBQSx3QkFBa0IsRUFBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0QsTUFBTSxRQUFRLEdBQUcsSUFBQSx3QkFBa0IsRUFBQyxHQUFHLEVBQUUsb0JBQW9CLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDdkUsTUFBTSxjQUFjLEdBQ2hCLElBQUEsd0JBQWtCLEVBQUMsR0FBRyxFQUFFLDJCQUEyQixDQUFDLElBQUksUUFBUSxDQUFDO0lBQ3JFLE1BQU0sS0FBSyxHQUFHLElBQUEsd0JBQWtCLEVBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLElBQUksSUFBSSxDQUFDO0lBQ2pFLE1BQU0sY0FBYyxHQUNoQixJQUFBLHdCQUFrQixFQUFDLEdBQUcsRUFBRSwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCxNQUFNLFNBQVMsR0FDWCxJQUFBLHdCQUFrQixFQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLFFBQVEsQ0FBQztJQUMvRCxNQUFNLFFBQVEsR0FBRyxJQUFBLHdCQUFrQixFQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLE1BQU0sQ0FBQztJQUMxRSxNQUFNLFNBQVMsR0FDWCxJQUFBLHdCQUFrQixFQUFDLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQyxJQUFJLFNBQVMsQ0FBQztJQUVqRSw4QkFBOEI7SUFDOUIsTUFBTSxLQUFLLEdBQUc7UUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDckIsUUFBUSxFQUFFLFFBQVE7YUFDYixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFBLHFCQUFhLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9DLEtBQUssRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUEscUJBQWEsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsY0FBYyxFQUNWLENBQUEsTUFBQSxNQUFBLGNBQWMsQ0FBQyxLQUFLLCtEQUFHLEdBQUcsQ0FBQyxtQ0FBSSxjQUFjLENBQUMsSUFBSTtZQUM5QyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNwQixjQUFjLEVBQUUsR0FBRyxjQUFjLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzlDLFNBQVMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUMvQixRQUFRLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDN0IsU0FBUyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0tBQ2xDLENBQUM7SUFDRixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUN2QyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxFQUFFO1lBQ2pDLGFBQWEsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNwQyxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBekNELDJDQXlDQyJ9