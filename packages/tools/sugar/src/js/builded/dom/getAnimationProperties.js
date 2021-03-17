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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QW5pbWF0aW9uUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2RvbS9nZXRBbmltYXRpb25Qcm9wZXJ0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdFQUFvRDtJQUNwRCxzRUFBa0Q7SUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0ErQkc7SUFDSCxTQUFTLHNCQUFzQixDQUFDLEdBQUc7UUFDakMsK0JBQStCO1FBQy9CLElBQU0sSUFBSSxHQUFHLDBCQUFrQixDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3RCxJQUFNLFFBQVEsR0FBRywwQkFBa0IsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDdkUsSUFBTSxjQUFjLEdBQ2xCLDBCQUFrQixDQUFDLEdBQUcsRUFBRSwyQkFBMkIsQ0FBQyxJQUFJLFFBQVEsQ0FBQztRQUNuRSxJQUFNLEtBQUssR0FBRywwQkFBa0IsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDakUsSUFBTSxjQUFjLEdBQ2xCLDBCQUFrQixDQUFDLEdBQUcsRUFBRSwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RCxJQUFNLFNBQVMsR0FBRywwQkFBa0IsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUMsSUFBSSxRQUFRLENBQUM7UUFFN0UsOEJBQThCO1FBQzlCLElBQU0sS0FBSyxHQUFHO1lBQ1osSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLGlCQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUF0QixDQUFzQixDQUFDO1lBQ3BFLEtBQUssRUFBRSxDQUFBLEtBQUcsS0FBTyxDQUFBLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLGlCQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUF0QixDQUFzQixDQUFDO1lBQ25FLGNBQWMsRUFBRSxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUN6QyxjQUFjLEVBQUUsQ0FBQSxLQUFHLGNBQWdCLENBQUEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQzlDLFNBQVMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNoQyxDQUFDO1FBQ0YsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUNyQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxFQUFFO2dCQUNuQyxhQUFhLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDcEMsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0Qsa0JBQWUsc0JBQXNCLENBQUMifQ==