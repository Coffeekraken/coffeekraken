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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydFBlcmNlbnRhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9kb20vaW5WaWV3cG9ydFBlcmNlbnRhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMERBQXNDO0lBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyxvQkFBb0IsQ0FBQyxHQUFHO1FBQy9CLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsbUJBQVcsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUVoQyxtQ0FBbUM7UUFDbkMsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFN0MsSUFBSSxlQUFlLEdBQUcsR0FBRyxFQUN2QixnQkFBZ0IsR0FBRyxHQUFHLENBQUM7UUFFekIsbUJBQW1CO1FBQ25CLElBQUksUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQzlELGdCQUFnQixHQUFHLEdBQUcsQ0FBQztTQUN4QjthQUFNO1lBQ0wsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ2pELElBQUksUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0JBQ3BCLGdCQUFnQixJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdEO1lBQ0QsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7Z0JBQ3hDLGdCQUFnQjtvQkFDZCxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzlEO1NBQ0Y7UUFDRCxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEQsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDO1lBQUUsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksZ0JBQWdCLEdBQUcsR0FBRztZQUFFLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztRQUVuRCxrQkFBa0I7UUFDbEIsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDN0QsZUFBZSxHQUFHLEdBQUcsQ0FBQztTQUN2QjthQUFNO1lBQ0wsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2hELElBQUksUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7Z0JBQ3JCLGVBQWUsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1RDtZQUNELElBQUksUUFBUSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFO2dCQUN0QyxlQUFlO29CQUNiLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDM0Q7U0FDRjtRQUNELGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlDLElBQUksZUFBZSxHQUFHLENBQUM7WUFBRSxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLElBQUksZUFBZSxHQUFHLEdBQUc7WUFBRSxlQUFlLEdBQUcsR0FBRyxDQUFDO1FBRWpELG9DQUFvQztRQUNwQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUNELGtCQUFlLG9CQUFvQixDQUFDIn0=