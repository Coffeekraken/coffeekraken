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
        define(["require", "exports", "./isVisible"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isVisible_1 = __importDefault(require("./isVisible"));
    /**
     * @name      inViewportPercentage
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Return how many percent the passed element is visible in the viewport
     *
     * @param 		{HTMLElement} 				elm  		The element to get the in viewport percentage from
     * @return 		{Number} 								The percentage visible in the viewport
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import inViewportPercentage from '@coffeekraken/sugar/js/dom/inViewportPercentage'
     * const percentage = inViewportPercentage(myCoolHTMLElement);
     * // 20
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function inViewportPercentage(elm) {
        // if not visible at all
        if (!isVisible_1.default(elm))
            return 0;
        // calculate the visible percentage
        var bounding = elm.getBoundingClientRect();
        var percentageWidth = 100, percentageHeight = 100;
        // percentageHeight
        if (bounding.top >= 0 && bounding.bottom <= window.innerHeight) {
            percentageHeight = 100;
        }
        else {
            var elmHeight = bounding.bottom - bounding.top;
            if (bounding.top < 0) {
                percentageHeight -= (100 / elmHeight) * (bounding.top * -1);
            }
            if (bounding.bottom > window.innerHeight) {
                percentageHeight -=
                    (100 / elmHeight) * (bounding.bottom - window.innerHeight);
            }
        }
        percentageHeight = Math.round(percentageHeight);
        if (percentageHeight < 0)
            percentageHeight = 0;
        if (percentageHeight > 100)
            percentageHeight = 100;
        // percentageWidth
        if (bounding.left >= 0 && bounding.right <= window.innerWidth) {
            percentageWidth = 100;
        }
        else {
            var elmWidth = bounding.right - bounding.left;
            if (bounding.left < 0) {
                percentageWidth -= (100 / elmWidth) * (bounding.left * -1);
            }
            if (bounding.right > window.innerWidth) {
                percentageWidth -=
                    (100 / elmWidth) * (bounding.right - window.innerWidth);
            }
        }
        percentageWidth = Math.round(percentageWidth);
        if (percentageWidth < 0)
            percentageWidth = 0;
        if (percentageWidth > 100)
            percentageWidth = 100;
        // calculate the percentage in total
        return Math.round((100 / (100 * 100)) * (percentageWidth * percentageHeight));
    }
    exports.default = inViewportPercentage;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydFBlcmNlbnRhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpblZpZXdwb3J0UGVyY2VudGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCwwREFBc0M7SUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxTQUFTLG9CQUFvQixDQUFDLEdBQUc7UUFDL0Isd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxtQkFBVyxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRWhDLG1DQUFtQztRQUNuQyxJQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QyxJQUFJLGVBQWUsR0FBRyxHQUFHLEVBQ3ZCLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztRQUV6QixtQkFBbUI7UUFDbkIsSUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDOUQsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO1NBQ3hCO2FBQU07WUFDTCxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDakQsSUFBSSxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRTtnQkFDcEIsZ0JBQWdCLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0Q7WUFDRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRTtnQkFDeEMsZ0JBQWdCO29CQUNkLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDOUQ7U0FDRjtRQUNELGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoRCxJQUFJLGdCQUFnQixHQUFHLENBQUM7WUFBRSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxnQkFBZ0IsR0FBRyxHQUFHO1lBQUUsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO1FBRW5ELGtCQUFrQjtRQUNsQixJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUM3RCxlQUFlLEdBQUcsR0FBRyxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDaEQsSUFBSSxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtnQkFDckIsZUFBZSxJQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVEO1lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQ3RDLGVBQWU7b0JBQ2IsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMzRDtTQUNGO1FBQ0QsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUMsSUFBSSxlQUFlLEdBQUcsQ0FBQztZQUFFLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxlQUFlLEdBQUcsR0FBRztZQUFFLGVBQWUsR0FBRyxHQUFHLENBQUM7UUFFakQsb0NBQW9DO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ0Qsa0JBQWUsb0JBQW9CLENBQUMifQ==