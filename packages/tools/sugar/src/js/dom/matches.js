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
     * @name      matches
     * @namespace           sugar.js.dom
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
        var p = Element.prototype;
        var f = p.matches ||
            p.webkitMatchesSelector ||
            p.mozMatchesSelector ||
            p.msMatchesSelector ||
            function (s) {
                return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
            };
        return f.call(el, selector);
    }
    return matches;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hdGNoZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsT0FBTyxDQUFDLEVBQUUsRUFBRSxRQUFRO1FBQzNCLElBQUksRUFBRSxDQUFDLFFBQVEsSUFBSSxVQUFVLElBQUksRUFBRSxDQUFDLFFBQVEsSUFBSSxPQUFPLEVBQUU7WUFDdkQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDNUIsSUFBTSxDQUFDLEdBQ0wsQ0FBQyxDQUFDLE9BQU87WUFDVCxDQUFDLENBQUMscUJBQXFCO1lBQ3ZCLENBQUMsQ0FBQyxrQkFBa0I7WUFDcEIsQ0FBQyxDQUFDLGlCQUFpQjtZQUNuQixVQUFVLENBQUM7Z0JBQ1QsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDcEUsQ0FBQyxDQUFDO1FBQ0osT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsT0FBUyxPQUFPLENBQUMifQ==