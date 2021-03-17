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
     * @name      isVisible
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Check if the passed HTMLElement is visible or not.
     * Visible mean that it has not an opacity of 0, not a visibility of hidden and not a display of none
     *
     * @param 		{HTMLElement} 				elm  		The element to check
     * @return 		{Boolean}								If the element is visible or not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import isVisible from '@coffeekraken/sugar/js/dom/isVisible'
     * if (isVisible(myCoolHTMLElement) {
     * 		// i'm visible
     * }
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isVisible(elm) {
        // assume that the script tag is always visible
        if (elm.nodeName.toLowerCase() === 'script')
            return true;
        // get style
        var style = window.getComputedStyle(elm, null), opacity = style['opacity'], visibility = style['visibility'], display = style['display'];
        return '0' !== opacity && 'none' !== display && 'hidden' !== visibility;
    }
    window.__isVisible = isVisible;
    exports.default = isVisible;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNWaXNpYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZG9tL2lzVmlzaWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxTQUFTLENBQUMsR0FBRztRQUNwQiwrQ0FBK0M7UUFDL0MsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQztRQUV6RCxZQUFZO1FBQ1osSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFDOUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFDMUIsVUFBVSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFDaEMsT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QixPQUFPLEdBQUcsS0FBSyxPQUFPLElBQUksTUFBTSxLQUFLLE9BQU8sSUFBSSxRQUFRLEtBQUssVUFBVSxDQUFDO0lBQzFFLENBQUM7SUFDRCxNQUFNLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztJQUMvQixrQkFBZSxTQUFTLENBQUMifQ==