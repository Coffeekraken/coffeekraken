// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./matches"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var matches_1 = __importDefault(require("./matches"));
    /**
     * @name      previous
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Browse the passed element previous siblings to find the first element that matches the passed selector
     *
     * @param 		{HTMLElement} 					elm  		The element to start on
     * @param 		{String} 						selector 	A css selector to search for
     * @return 		{HTMLElement} 								The element found or null
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import previous from '@coffeekraken/sugar/js/dom/previous'
     * const previousElm = previous(myCoolElement, '.my-cool-class');
     * if (previousElm) {
     * 		// we have found en element that matches the selector
     * }
     *
     * @since       1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function previous(elm, selector) {
        elm = elm.previousSibling;
        while (elm) {
            if (matches_1.default(elm, selector)) {
                return elm;
            }
            elm = elm.previousSibling;
        }
        return false;
    }
    exports.default = previous;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlvdXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmV2aW91cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzREFBa0M7SUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUTtRQUM3QixHQUFHLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQztRQUMxQixPQUFPLEdBQUcsRUFBRTtZQUNWLElBQUksaUJBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sR0FBRyxDQUFDO2FBQ1o7WUFDRCxHQUFHLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQztTQUMzQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELGtCQUFlLFFBQVEsQ0FBQyJ9