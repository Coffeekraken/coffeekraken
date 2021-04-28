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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNJblZpZXdwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2RvbS9pc0luVmlld3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsWUFBWSxDQUFDLEdBQUcsRUFBRSxNQUFNLEdBQUcsRUFBRTtRQUNwQyxnQkFBZ0I7UUFDaEIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUN6QixJQUFJLFlBQVksR0FBRyxNQUFNLENBQUM7UUFDMUIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzlCLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUM1QixXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7WUFDaEMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQ2xDLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztTQUMvQjtRQUNELE1BQU0sZUFBZSxHQUNuQixNQUFNLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDO1FBQzlELE1BQU0sY0FBYyxHQUNsQixNQUFNLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO1FBQzVELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsZUFBZSxHQUFHLFlBQVksSUFBSSxDQUFDLENBQUM7UUFDL0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLElBQUksQ0FBQyxDQUFDO1FBQ2hELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxHQUFHLFdBQVcsSUFBSSxDQUFDLENBQUM7UUFDL0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLElBQUksQ0FBQyxDQUFDO1FBQy9DLE9BQU8sT0FBTyxJQUFJLFVBQVUsSUFBSSxRQUFRLElBQUksU0FBUyxDQUFDO0lBQ3hELENBQUM7SUFDRCxrQkFBZSxZQUFZLENBQUMifQ==