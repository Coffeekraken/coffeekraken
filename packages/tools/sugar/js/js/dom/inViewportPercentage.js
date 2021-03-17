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
     * @namespace           sugar.js.dom
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydFBlcmNlbnRhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvZG9tL2luVmlld3BvcnRQZXJjZW50YWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBEQUFzQztJQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsb0JBQW9CLENBQUMsR0FBRztRQUMvQix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLG1CQUFXLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFFaEMsbUNBQW1DO1FBQ25DLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRTdDLElBQUksZUFBZSxHQUFHLEdBQUcsRUFDdkIsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO1FBRXpCLG1CQUFtQjtRQUNuQixJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtZQUM5RCxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7U0FDeEI7YUFBTTtZQUNMLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUNqRCxJQUFJLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFO2dCQUNwQixnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3RDtZQUNELElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFO2dCQUN4QyxnQkFBZ0I7b0JBQ2QsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM5RDtTQUNGO1FBQ0QsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hELElBQUksZ0JBQWdCLEdBQUcsQ0FBQztZQUFFLGdCQUFnQixHQUFHLENBQUMsQ0FBQztRQUMvQyxJQUFJLGdCQUFnQixHQUFHLEdBQUc7WUFBRSxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7UUFFbkQsa0JBQWtCO1FBQ2xCLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQzdELGVBQWUsR0FBRyxHQUFHLENBQUM7U0FDdkI7YUFBTTtZQUNMLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNoRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixlQUFlLElBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUQ7WUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRTtnQkFDdEMsZUFBZTtvQkFDYixDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzNEO1NBQ0Y7UUFDRCxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM5QyxJQUFJLGVBQWUsR0FBRyxDQUFDO1lBQUUsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUM3QyxJQUFJLGVBQWUsR0FBRyxHQUFHO1lBQUUsZUFBZSxHQUFHLEdBQUcsQ0FBQztRQUVqRCxvQ0FBb0M7UUFDcEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFDRCxrQkFBZSxvQkFBb0IsQ0FBQyJ9