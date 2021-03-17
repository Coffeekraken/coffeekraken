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
    var getStyleProperty_1 = __importDefault(require("./getStyleProperty"));
    var convert_1 = __importDefault(require("../../shared/time/convert"));
    /**
     * @name      getAnimationProperties
     * @namespace           sugar.js.dom
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
        var name = getStyleProperty_1.default(elm, 'animation-name') || '';
        var duration = getStyleProperty_1.default(elm, 'animation-duration') || '0s';
        var timingFunction = getStyleProperty_1.default(elm, 'animation-timing-function') || 'linear';
        var delay = getStyleProperty_1.default(elm, 'animation-delay') || '0s';
        var iterationCount = getStyleProperty_1.default(elm, 'animation-iteration-count') || 1;
        var direction = getStyleProperty_1.default(elm, 'animation-direction') || 'normal';
        // return the animation object
        var props = {
            name: name.split(','),
            duration: duration.split(',').map(function (value) { return convert_1.default(value, 'ms'); }),
            delay: ("" + delay).split(',').map(function (value) { return convert_1.default(value, 'ms'); }),
            timingFunction: timingFunction.split(','),
            iterationCount: ("" + iterationCount).split(','),
            direction: direction.split(',')
        };
        var totalDuration = 0;
        var i = 0;
        var delays = [0].concat(props.delay);
        [0].concat(props.duration).forEach(function (val) {
            if (val + delays[i] > totalDuration) {
                totalDuration = val + delays[i];
            }
        });
        props.totalDuration = totalDuration;
        return props;
    }
    exports.default = getAnimationProperties;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QW5pbWF0aW9uUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9kb20vZ2V0QW5pbWF0aW9uUHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBb0Q7SUFDcEQsc0VBQWtEO0lBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BK0JHO0lBQ0gsU0FBUyxzQkFBc0IsQ0FBQyxHQUFHO1FBQ2pDLCtCQUErQjtRQUMvQixJQUFNLElBQUksR0FBRywwQkFBa0IsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0QsSUFBTSxRQUFRLEdBQUcsMEJBQWtCLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDLElBQUksSUFBSSxDQUFDO1FBQ3ZFLElBQU0sY0FBYyxHQUNsQiwwQkFBa0IsQ0FBQyxHQUFHLEVBQUUsMkJBQTJCLENBQUMsSUFBSSxRQUFRLENBQUM7UUFDbkUsSUFBTSxLQUFLLEdBQUcsMEJBQWtCLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLElBQUksSUFBSSxDQUFDO1FBQ2pFLElBQU0sY0FBYyxHQUNsQiwwQkFBa0IsQ0FBQyxHQUFHLEVBQUUsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUQsSUFBTSxTQUFTLEdBQUcsMEJBQWtCLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLElBQUksUUFBUSxDQUFDO1FBRTdFLDhCQUE4QjtRQUM5QixJQUFNLEtBQUssR0FBRztZQUNaLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNyQixRQUFRLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxpQkFBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQztZQUNwRSxLQUFLLEVBQUUsQ0FBQSxLQUFHLEtBQU8sQ0FBQSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxpQkFBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQztZQUNuRSxjQUFjLEVBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDekMsY0FBYyxFQUFFLENBQUEsS0FBRyxjQUFnQixDQUFBLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUM5QyxTQUFTLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDaEMsQ0FBQztRQUNGLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDckMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsRUFBRTtnQkFDbkMsYUFBYSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELGtCQUFlLHNCQUFzQixDQUFDIn0=