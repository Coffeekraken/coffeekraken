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
     * @name      matches
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Polyfill for the Element.matches function
     *
     * @param 		{HTMLElement} 			elm  			The element to check
     * @param 		{String} 				selector 		The selector to check on the element
     * @return 		{Boolean} 								If the element match the selector or not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import matches from '@coffeekraken/sugar/js/dom/matches'
     * if (matches(myCoolHTMLElement, '.my-cool-css-selector')) {
     * 		// the element match the selector
     * }
     *
     * @see 		https://developer.mozilla.org/en/docs/Web/API/Element/matches
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function matches(el, selector) {
        if (el.nodeName == '#comment' || el.nodeName == '#text') {
            return false;
        }
        const p = Element.prototype;
        const f = p.matches ||
            p.webkitMatchesSelector ||
            p.mozMatchesSelector ||
            p.msMatchesSelector ||
            function (s) {
                return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
            };
        return f.call(el, selector);
    }
    exports.default = matches;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGNoZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxTQUFTLE9BQU8sQ0FBQyxFQUFFLEVBQUUsUUFBUTtRQUMzQixJQUFJLEVBQUUsQ0FBQyxRQUFRLElBQUksVUFBVSxJQUFJLEVBQUUsQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFFO1lBQ3ZELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxHQUNMLENBQUMsQ0FBQyxPQUFPO1lBQ1QsQ0FBQyxDQUFDLHFCQUFxQjtZQUN2QixDQUFDLENBQUMsa0JBQWtCO1lBQ3BCLENBQUMsQ0FBQyxpQkFBaUI7WUFDbkIsVUFBVSxDQUFDO2dCQUNULE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQztRQUNKLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELGtCQUFlLE9BQU8sQ0FBQyJ9