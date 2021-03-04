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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNWaXNpYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNWaXNpYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLFNBQVMsQ0FBQyxHQUFHO1FBQ3BCLCtDQUErQztRQUMvQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRXpELFlBQVk7UUFDWixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUM5QyxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUMxQixVQUFVLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUNoQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sR0FBRyxLQUFLLE9BQU8sSUFBSSxNQUFNLEtBQUssT0FBTyxJQUFJLFFBQVEsS0FBSyxVQUFVLENBQUM7SUFDMUUsQ0FBQztJQUNELE1BQU0sQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0lBQy9CLGtCQUFlLFNBQVMsQ0FBQyJ9