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
     * @namespace            js.dom
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
        const style = window.getComputedStyle(elm, null), opacity = style['opacity'], visibility = style['visibility'], display = style['display'];
        return '0' !== opacity && 'none' !== display && 'hidden' !== visibility;
    }
    window.__isVisible = isVisible;
    exports.default = isVisible;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNWaXNpYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2RvbS9pc1Zpc2libGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILFNBQVMsU0FBUyxDQUFDLEdBQUc7UUFDcEIsK0NBQStDO1FBQy9DLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFekQsWUFBWTtRQUNaLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQzlDLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQzFCLFVBQVUsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQ2hDLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0IsT0FBTyxHQUFHLEtBQUssT0FBTyxJQUFJLE1BQU0sS0FBSyxPQUFPLElBQUksUUFBUSxLQUFLLFVBQVUsQ0FBQztJQUMxRSxDQUFDO0lBQ0QsTUFBTSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7SUFDL0Isa0JBQWUsU0FBUyxDQUFDIn0=