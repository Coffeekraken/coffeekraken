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
     * @name      getTransitionProperties
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Get the css transition properties from an HTMLElement in an object format
     *
     * @param 		{HTMLElement} 					elm  		The element to get the properties from
     * @return 		{Object} 									The animation properties
     *
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
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function splitIfNeeded(what, separator) {
        if (what.indexOf(separator) !== -1) {
            return what.split(separator).map((item) => item.trim());
        }
        return [what];
    }
    function getTransitionProperties(elm) {
        // get the transition properties
        const property = getStyleProperty_1.default(elm, 'transition-property');
        const duration = getStyleProperty_1.default(elm, 'transition-duration') || 0;
        const timingFunction = getStyleProperty_1.default(elm, 'transition-timing-function');
        const delay = getStyleProperty_1.default(elm, 'transition-delay');
        // return the transition object
        const props = {
            property: splitIfNeeded(property, ','),
            duration: splitIfNeeded(duration, ',').map((value) => convert_1.default(value, 'ms')),
            delay: splitIfNeeded(delay, ',').map((value) => convert_1.default(value, 'ms')),
            timingFunction: splitIfNeeded(timingFunction, ',')
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNpdGlvblByb3BlcnRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvZG9tL2dldFRyYW5zaXRpb25Qcm9wZXJ0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBFQUFvRDtJQUNwRCx3RUFBa0Q7SUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBRUgsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFLFNBQVM7UUFDcEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxTQUFTLHVCQUF1QixDQUFDLEdBQUc7UUFDbEMsZ0NBQWdDO1FBQ2hDLE1BQU0sUUFBUSxHQUFHLDBCQUFrQixDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sUUFBUSxHQUFHLDBCQUFrQixDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRSxNQUFNLGNBQWMsR0FBRywwQkFBa0IsQ0FBQyxHQUFHLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztRQUM3RSxNQUFNLEtBQUssR0FBRywwQkFBa0IsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUUxRCwrQkFBK0I7UUFDL0IsTUFBTSxLQUFLLEdBQUc7WUFDWixRQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7WUFDdEMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbkQsaUJBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQ3ZCO1lBQ0QsS0FBSyxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxpQkFBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2RSxjQUFjLEVBQUUsYUFBYSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUM7U0FDbkQsQ0FBQztRQUNGLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3pDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLEVBQUU7Z0JBQ25DLGFBQWEsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1lBQ0QsQ0FBQyxFQUFFLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELGtCQUFlLHVCQUF1QixDQUFDIn0=