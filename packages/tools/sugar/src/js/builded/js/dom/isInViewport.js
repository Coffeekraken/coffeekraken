// @ts-nocheck
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name      isInViewport
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Check if the passed HTMLElement is in the viewport or not
     *
     * @param 		{HTMLElement} 				elm  			The element to insert
     * @param 		{Object} 					[offset=50] 	An object of top, right, bottom and left offset used to detect the status or an object with top, right, bottom and left offsets
     * @return 		{Boolean}									If the element is in the viewport or not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import isInViewport from '@coffeekraken/sugar/js/dom/isInViewport'
     * if (isInViewport(myCoolHTMLElement) {
     * 		// i'm in the viewport
     * }
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isInViewport(elm, offset) {
        if (offset === void 0) { offset = 50; }
        // handle offset
        var offsetTop = offset;
        var offsetRight = offset;
        var offsetBottom = offset;
        var offsetLeft = offset;
        if (typeof offset === 'object') {
            offsetTop = offset.top || 0;
            offsetRight = offset.right || 0;
            offsetBottom = offset.bottom || 0;
            offsetLeft = offset.left || 0;
        }
        var containerHeight = window.innerHeight || document.documentElement.clientHeight;
        var containerWidth = window.innerWidth || document.documentElement.clientWidth;
        var rect = elm.getBoundingClientRect();
        var isTopIn = rect.top - containerHeight - offsetBottom <= 0;
        var isBottomIn = rect.bottom - offsetTop >= 0;
        var isLeftIn = rect.left - containerWidth - offsetRight <= 0;
        var isRightIn = rect.right - offsetLeft >= 0;
        return isTopIn && isBottomIn && isLeftIn && isRightIn;
    }
    exports.default = isInViewport;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNJblZpZXdwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZG9tL2lzSW5WaWV3cG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxZQUFZLENBQUMsR0FBRyxFQUFFLE1BQVc7UUFBWCx1QkFBQSxFQUFBLFdBQVc7UUFDcEMsZ0JBQWdCO1FBQ2hCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDekIsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBQzFCLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM5QixTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDNUIsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ2hDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUNsQyxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7U0FDL0I7UUFDRCxJQUFNLGVBQWUsR0FDbkIsTUFBTSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQztRQUM5RCxJQUFNLGNBQWMsR0FDbEIsTUFBTSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUM1RCxJQUFNLElBQUksR0FBRyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUN6QyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLGVBQWUsR0FBRyxZQUFZLElBQUksQ0FBQyxDQUFDO1FBQy9ELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsR0FBRyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQy9ELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxJQUFJLENBQUMsQ0FBQztRQUMvQyxPQUFPLE9BQU8sSUFBSSxVQUFVLElBQUksUUFBUSxJQUFJLFNBQVMsQ0FBQztJQUN4RCxDQUFDO0lBQ0Qsa0JBQWUsWUFBWSxDQUFDIn0=