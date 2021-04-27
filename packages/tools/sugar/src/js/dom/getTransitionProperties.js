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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNpdGlvblByb3BlcnRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRUcmFuc2l0aW9uUHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwRUFBb0Q7SUFDcEQsd0VBQWtEO0lBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZCRztJQUVILFNBQVMsYUFBYSxDQUFDLElBQUksRUFBRSxTQUFTO1FBQ3BDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUN6RDtRQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsU0FBUyx1QkFBdUIsQ0FBQyxHQUFHO1FBQ2xDLGdDQUFnQztRQUNoQyxNQUFNLFFBQVEsR0FBRywwQkFBa0IsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUNoRSxNQUFNLFFBQVEsR0FBRywwQkFBa0IsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckUsTUFBTSxjQUFjLEdBQUcsMEJBQWtCLENBQUMsR0FBRyxFQUFFLDRCQUE0QixDQUFDLENBQUM7UUFDN0UsTUFBTSxLQUFLLEdBQUcsMEJBQWtCLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFMUQsK0JBQStCO1FBQy9CLE1BQU0sS0FBSyxHQUFHO1lBQ1osUUFBUSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQ25ELGlCQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUN2QjtZQUNELEtBQUssRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsaUJBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdkUsY0FBYyxFQUFFLGFBQWEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDO1NBQ25ELENBQUM7UUFDRixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN6QyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxFQUFFO2dCQUNuQyxhQUFhLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztZQUNELENBQUMsRUFBRSxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNwQyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDRCxrQkFBZSx1QkFBdUIsQ0FBQyJ9