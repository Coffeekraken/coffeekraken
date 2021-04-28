// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./getStyleProperty", "../../shared/time/convert"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const getStyleProperty_1 = __importDefault(require("./getStyleProperty"));
    const convert_1 = __importDefault(require("../../shared/time/convert"));
    /**
     * @name      getAnimationProperties
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Get the css animation properties from an HTMLElement in an object format
     *
     * @param 		{HTMLElement} 					elm  		The element to get the properties from
     * @return 		{Object} 									The animation properties
     *
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
    function getAnimationProperties(elm) {
        // get the animation properties
        const name = getStyleProperty_1.default(elm, 'animation-name') || '';
        const duration = getStyleProperty_1.default(elm, 'animation-duration') || '0s';
        const timingFunction = getStyleProperty_1.default(elm, 'animation-timing-function') || 'linear';
        const delay = getStyleProperty_1.default(elm, 'animation-delay') || '0s';
        const iterationCount = getStyleProperty_1.default(elm, 'animation-iteration-count') || 1;
        const direction = getStyleProperty_1.default(elm, 'animation-direction') || 'normal';
        // return the animation object
        const props = {
            name: name.split(','),
            duration: duration.split(',').map((value) => convert_1.default(value, 'ms')),
            delay: `${delay}`.split(',').map((value) => convert_1.default(value, 'ms')),
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
    exports.default = getAnimationProperties;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QW5pbWF0aW9uUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vZ2V0QW5pbWF0aW9uUHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwRUFBb0Q7SUFDcEQsd0VBQWtEO0lBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BK0JHO0lBQ0gsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHO1FBQ2pDLCtCQUErQjtRQUMvQixNQUFNLElBQUksR0FBRywwQkFBa0IsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0QsTUFBTSxRQUFRLEdBQUcsMEJBQWtCLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDLElBQUksSUFBSSxDQUFDO1FBQ3ZFLE1BQU0sY0FBYyxHQUNsQiwwQkFBa0IsQ0FBQyxHQUFHLEVBQUUsMkJBQTJCLENBQUMsSUFBSSxRQUFRLENBQUM7UUFDbkUsTUFBTSxLQUFLLEdBQUcsMEJBQWtCLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLElBQUksSUFBSSxDQUFDO1FBQ2pFLE1BQU0sY0FBYyxHQUNsQiwwQkFBa0IsQ0FBQyxHQUFHLEVBQUUsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUQsTUFBTSxTQUFTLEdBQUcsMEJBQWtCLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLElBQUksUUFBUSxDQUFDO1FBRTdFLDhCQUE4QjtRQUM5QixNQUFNLEtBQUssR0FBRztZQUNaLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNyQixRQUFRLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLGlCQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BFLEtBQUssRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLGlCQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25FLGNBQWMsRUFBRSxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUN6QyxjQUFjLEVBQUUsR0FBRyxjQUFjLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQzlDLFNBQVMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNoQyxDQUFDO1FBQ0YsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNaLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDekMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsRUFBRTtnQkFDbkMsYUFBYSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELGtCQUFlLHNCQUFzQixDQUFDIn0=