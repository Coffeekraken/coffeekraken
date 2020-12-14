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
    return isInViewport;
});
//# sourceMappingURL=module.js.map