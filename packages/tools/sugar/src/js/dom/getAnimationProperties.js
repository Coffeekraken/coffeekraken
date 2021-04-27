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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QW5pbWF0aW9uUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEFuaW1hdGlvblByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMEVBQW9EO0lBQ3BELHdFQUFrRDtJQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQStCRztJQUNILFNBQVMsc0JBQXNCLENBQUMsR0FBRztRQUNqQywrQkFBK0I7UUFDL0IsTUFBTSxJQUFJLEdBQUcsMEJBQWtCLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdELE1BQU0sUUFBUSxHQUFHLDBCQUFrQixDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUN2RSxNQUFNLGNBQWMsR0FDbEIsMEJBQWtCLENBQUMsR0FBRyxFQUFFLDJCQUEyQixDQUFDLElBQUksUUFBUSxDQUFDO1FBQ25FLE1BQU0sS0FBSyxHQUFHLDBCQUFrQixDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUNqRSxNQUFNLGNBQWMsR0FDbEIsMEJBQWtCLENBQUMsR0FBRyxFQUFFLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVELE1BQU0sU0FBUyxHQUFHLDBCQUFrQixDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLFFBQVEsQ0FBQztRQUU3RSw4QkFBOEI7UUFDOUIsTUFBTSxLQUFLLEdBQUc7WUFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDckIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxpQkFBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwRSxLQUFLLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxpQkFBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuRSxjQUFjLEVBQUUsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDekMsY0FBYyxFQUFFLEdBQUcsY0FBYyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUM5QyxTQUFTLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDaEMsQ0FBQztRQUNGLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3pDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLEVBQUU7Z0JBQ25DLGFBQWEsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNwQyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxrQkFBZSxzQkFBc0IsQ0FBQyJ9