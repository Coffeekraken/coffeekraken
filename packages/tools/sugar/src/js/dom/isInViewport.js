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
     * @namespace            js.dom
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
    function isInViewport(elm, offset = 50) {
        // handle offset
        let offsetTop = offset;
        let offsetRight = offset;
        let offsetBottom = offset;
        let offsetLeft = offset;
        if (typeof offset === 'object') {
            offsetTop = offset.top || 0;
            offsetRight = offset.right || 0;
            offsetBottom = offset.bottom || 0;
            offsetLeft = offset.left || 0;
        }
        const containerHeight = window.innerHeight || document.documentElement.clientHeight;
        const containerWidth = window.innerWidth || document.documentElement.clientWidth;
        const rect = elm.getBoundingClientRect();
        const isTopIn = rect.top - containerHeight - offsetBottom <= 0;
        const isBottomIn = rect.bottom - offsetTop >= 0;
        const isLeftIn = rect.left - containerWidth - offsetRight <= 0;
        const isRightIn = rect.right - offsetLeft >= 0;
        return isTopIn && isBottomIn && isLeftIn && isRightIn;
    }
    exports.default = isInViewport;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNJblZpZXdwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNJblZpZXdwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUUsTUFBTSxHQUFHLEVBQUU7UUFDcEMsZ0JBQWdCO1FBQ2hCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDekIsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBQzFCLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM5QixTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDNUIsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ2hDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUNsQyxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7U0FDL0I7UUFDRCxNQUFNLGVBQWUsR0FDbkIsTUFBTSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQztRQUM5RCxNQUFNLGNBQWMsR0FDbEIsTUFBTSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUM1RCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUN6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLGVBQWUsR0FBRyxZQUFZLElBQUksQ0FBQyxDQUFDO1FBQy9ELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUNoRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsR0FBRyxXQUFXLElBQUksQ0FBQyxDQUFDO1FBQy9ELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxJQUFJLENBQUMsQ0FBQztRQUMvQyxPQUFPLE9BQU8sSUFBSSxVQUFVLElBQUksUUFBUSxJQUFJLFNBQVMsQ0FBQztJQUN4RCxDQUFDO0lBQ0Qsa0JBQWUsWUFBWSxDQUFDIn0=