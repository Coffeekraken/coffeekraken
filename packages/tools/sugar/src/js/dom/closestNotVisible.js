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
        define(["require", "exports", "./isVisible"], factory);
    }
})(function (require, exports) {
    "use strict";
    var isVisible_1 = __importDefault(require("./isVisible"));
    /**
     * @name        closestNotVisible
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Go up the dom three to find the first element that is not visible.
     * Not visible mean that has either an opacity to 0, a visibility to hidden or a display to none
     *
     * @param 		{HTMLElement} 					elm  		The element to start on
     * @return 		{HTMLElement} 								The element found or null
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import closestNotVisible from 'sugarcss/js/dom/closestNotVisible'
     * const closestElm = closestNotVisible(myCoolElement);
     * if (closestElm) {
     * 		// we have found en element that is not visible
     * }
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function closestNotVisible(elm) {
        var originalElm = elm;
        elm = elm.parentNode;
        while (elm && elm != originalElm.ownerDocument) {
            if (!isVisible_1.default(elm)) {
                return elm;
            }
            elm = elm.parentNode;
        }
        return null;
    }
    return closestNotVisible;
});
