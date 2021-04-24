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
            return what.split(separator).map(function (item) { return item.trim(); });
        }
        return [what];
    }
    function getTransitionProperties(elm) {
        // get the transition properties
        var property = getStyleProperty_1.default(elm, 'transition-property');
        var duration = getStyleProperty_1.default(elm, 'transition-duration') || 0;
        var timingFunction = getStyleProperty_1.default(elm, 'transition-timing-function');
        var delay = getStyleProperty_1.default(elm, 'transition-delay');
        // return the transition object
        var props = {
            property: splitIfNeeded(property, ','),
            duration: splitIfNeeded(duration, ',').map(function (value) {
                return convert_1.default(value, 'ms');
            }),
            delay: splitIfNeeded(delay, ',').map(function (value) { return convert_1.default(value, 'ms'); }),
            timingFunction: splitIfNeeded(timingFunction, ',')
        };
        var totalDuration = 0;
        var i = 0;
        var delays = [0].concat(props.delay);
        [0].concat(props.duration).forEach(function (val) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNpdGlvblByb3BlcnRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRUcmFuc2l0aW9uUHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBb0Q7SUFDcEQsc0VBQWtEO0lBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZCRztJQUVILFNBQVMsYUFBYSxDQUFDLElBQUksRUFBRSxTQUFTO1FBQ3BDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxTQUFTLHVCQUF1QixDQUFDLEdBQUc7UUFDbEMsZ0NBQWdDO1FBQ2hDLElBQU0sUUFBUSxHQUFHLDBCQUFrQixDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2hFLElBQU0sUUFBUSxHQUFHLDBCQUFrQixDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRSxJQUFNLGNBQWMsR0FBRywwQkFBa0IsQ0FBQyxHQUFHLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztRQUM3RSxJQUFNLEtBQUssR0FBRywwQkFBa0IsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUUxRCwrQkFBK0I7UUFDL0IsSUFBTSxLQUFLLEdBQUc7WUFDWixRQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7WUFDdEMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSztnQkFDL0MsT0FBQSxpQkFBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7WUFBdEIsQ0FBc0IsQ0FDdkI7WUFDRCxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxpQkFBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQztZQUN2RSxjQUFjLEVBQUUsYUFBYSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUM7U0FDbkQsQ0FBQztRQUNGLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDckMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsRUFBRTtnQkFDbkMsYUFBYSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakM7WUFDRCxDQUFDLEVBQUUsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDcEMsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0Qsa0JBQWUsdUJBQXVCLENBQUMifQ==