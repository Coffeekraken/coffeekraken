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
 @since           2.0.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUE2RDtBQUM3RCx1RkFBaUU7QUFFakU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFFSCxTQUFTLGFBQWEsQ0FBQyxJQUFJLEVBQUUsU0FBUzs7SUFDbEMsSUFBSSxNQUFBLElBQUksQ0FBQyxRQUFRLHFEQUFHLFNBQVMsQ0FBQyxFQUFFO1FBQzVCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzNEO0lBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xCLENBQUM7QUFFRCxTQUFTLHVCQUF1QixDQUFDLEdBQWdCO0lBQzdDLGdDQUFnQztJQUNoQyxNQUFNLFFBQVEsR0FBRyxJQUFBLHdCQUFrQixFQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQ2hFLE1BQU0sUUFBUSxHQUFHLElBQUEsd0JBQWtCLEVBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sY0FBYyxHQUFHLElBQUEsd0JBQWtCLEVBQ3JDLEdBQUcsRUFDSCw0QkFBNEIsQ0FDL0IsQ0FBQztJQUNGLE1BQU0sS0FBSyxHQUFHLElBQUEsd0JBQWtCLEVBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFFMUQsK0JBQStCO0lBQy9CLE1BQU0sS0FBSyxHQUFHO1FBQ1YsUUFBUSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDO1FBQ3RDLFFBQVEsRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQ2pELElBQUEscUJBQWEsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQzdCO1FBQ0QsS0FBSyxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDM0MsSUFBQSxxQkFBYSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FDN0I7UUFDRCxjQUFjLEVBQUUsYUFBYSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUM7S0FDckQsQ0FBQztJQUNGLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztJQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDVixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3ZDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLEVBQUU7WUFDakMsYUFBYSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkM7UUFDRCxDQUFDLEVBQUUsQ0FBQztJQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDcEMsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUNELGtCQUFlLHVCQUF1QixDQUFDIn0=