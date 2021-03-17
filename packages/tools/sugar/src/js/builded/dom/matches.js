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
    exports.default = matches;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2RvbS9tYXRjaGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxPQUFPLENBQUMsRUFBRSxFQUFFLFFBQVE7UUFDM0IsSUFBSSxFQUFFLENBQUMsUUFBUSxJQUFJLFVBQVUsSUFBSSxFQUFFLENBQUMsUUFBUSxJQUFJLE9BQU8sRUFBRTtZQUN2RCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUM1QixJQUFNLENBQUMsR0FDTCxDQUFDLENBQUMsT0FBTztZQUNULENBQUMsQ0FBQyxxQkFBcUI7WUFDdkIsQ0FBQyxDQUFDLGtCQUFrQjtZQUNwQixDQUFDLENBQUMsaUJBQWlCO1lBQ25CLFVBQVUsQ0FBQztnQkFDVCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNwRSxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxrQkFBZSxPQUFPLENBQUMifQ==