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
    var matches_1 = __importDefault(require("./matches"));
    /**
     * @name      next
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Browse the passed element next siblings to find the first element that matches the passed selector
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
     * import next from '@coffeekraken/sugar/js/dom/next'
     * const nextElm = next(myCoolElement, '.my-cool-class');
     * if (nextElm) {
     * 		// we have found en element that matches the selector
     * }
     *
     * @since       1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function next(elm, selector) {
        elm = elm.nextSibling;
        while (elm) {
            if (matches_1.default(elm, selector)) {
                return elm;
            }
            elm = elm.nextSibling;
        }
        return false;
    }
    return next;
});
//# sourceMappingURL=next.js.map