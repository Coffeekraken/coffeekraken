"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const convertTime_1 = __importDefault(require("../../../shared/datetime/convertTime"));
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
    const property = (0, dom_1.__getStyleProperty)(elm, 'transition-property');
    const duration = (0, dom_1.__getStyleProperty)(elm, 'transition-duration') || 0;
    const timingFunction = (0, dom_1.__getStyleProperty)(elm, 'transition-timing-function');
    const delay = (0, dom_1.__getStyleProperty)(elm, 'transition-delay');
    // return the transition object
    const props = {
        property: splitIfNeeded(property, ','),
        duration: splitIfNeeded(duration, ',').map((value) => (0, convertTime_1.default)(value, 'ms')),
        delay: splitIfNeeded(delay, ',').map((value) => (0, convertTime_1.default)(value, 'ms')),
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
exports.default = getTransitionProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUE2RDtBQUM3RCx1RkFBaUU7QUFFakU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUVILFNBQVMsYUFBYSxDQUFDLElBQUksRUFBRSxTQUFTOztJQUNsQyxJQUFJLE1BQUEsSUFBSSxDQUFDLFFBQVEscURBQUcsU0FBUyxDQUFDLEVBQUU7UUFDNUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDM0Q7SUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQUVELFNBQVMsdUJBQXVCLENBQUMsR0FBZ0I7SUFDN0MsZ0NBQWdDO0lBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUEsd0JBQWtCLEVBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDaEUsTUFBTSxRQUFRLEdBQUcsSUFBQSx3QkFBa0IsRUFBQyxHQUFHLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckUsTUFBTSxjQUFjLEdBQUcsSUFBQSx3QkFBa0IsRUFDckMsR0FBRyxFQUNILDRCQUE0QixDQUMvQixDQUFDO0lBQ0YsTUFBTSxLQUFLLEdBQUcsSUFBQSx3QkFBa0IsRUFBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUUxRCwrQkFBK0I7SUFDL0IsTUFBTSxLQUFLLEdBQUc7UUFDVixRQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7UUFDdEMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDakQsSUFBQSxxQkFBYSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FDN0I7UUFDRCxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUMzQyxJQUFBLHFCQUFhLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUM3QjtRQUNELGNBQWMsRUFBRSxhQUFhLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQztLQUNyRCxDQUFDO0lBQ0YsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDdkMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsRUFBRTtZQUNqQyxhQUFhLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQztRQUNELENBQUMsRUFBRSxDQUFDO0lBQ1IsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNwQyxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBQ0Qsa0JBQWUsdUJBQXVCLENBQUMifQ==