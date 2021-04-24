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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QW5pbWF0aW9uUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEFuaW1hdGlvblByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsd0VBQW9EO0lBQ3BELHNFQUFrRDtJQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQStCRztJQUNILFNBQVMsc0JBQXNCLENBQUMsR0FBRztRQUNqQywrQkFBK0I7UUFDL0IsSUFBTSxJQUFJLEdBQUcsMEJBQWtCLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdELElBQU0sUUFBUSxHQUFHLDBCQUFrQixDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUN2RSxJQUFNLGNBQWMsR0FDbEIsMEJBQWtCLENBQUMsR0FBRyxFQUFFLDJCQUEyQixDQUFDLElBQUksUUFBUSxDQUFDO1FBQ25FLElBQU0sS0FBSyxHQUFHLDBCQUFrQixDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUNqRSxJQUFNLGNBQWMsR0FDbEIsMEJBQWtCLENBQUMsR0FBRyxFQUFFLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVELElBQU0sU0FBUyxHQUFHLDBCQUFrQixDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLFFBQVEsQ0FBQztRQUU3RSw4QkFBOEI7UUFDOUIsSUFBTSxLQUFLLEdBQUc7WUFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDckIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsaUJBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQXRCLENBQXNCLENBQUM7WUFDcEUsS0FBSyxFQUFFLENBQUEsS0FBRyxLQUFPLENBQUEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsaUJBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQXRCLENBQXNCLENBQUM7WUFDbkUsY0FBYyxFQUFFLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ3pDLGNBQWMsRUFBRSxDQUFBLEtBQUcsY0FBZ0IsQ0FBQSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDOUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ2hDLENBQUM7UUFDRixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ3JDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLEVBQUU7Z0JBQ25DLGFBQWEsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNwQyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxrQkFBZSxzQkFBc0IsQ0FBQyJ9