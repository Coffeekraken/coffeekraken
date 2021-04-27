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
    Object.defineProperty(exports, "__esModule", { value: true });
    const isVisible_1 = __importDefault(require("./isVisible"));
    /**
     * @name        closestNotVisible
     * @namespace            js.dom
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
        const originalElm = elm;
        elm = elm.parentNode;
        while (elm && elm != originalElm.ownerDocument) {
            if (!isVisible_1.default(elm)) {
                return elm;
            }
            elm = elm.parentNode;
        }
        return null;
    }
    exports.default = closestNotVisible;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2VzdE5vdFZpc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbG9zZXN0Tm90VmlzaWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0REFBc0M7SUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxTQUFTLGlCQUFpQixDQUFDLEdBQUc7UUFDNUIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQ3JCLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFO1lBQzlDLElBQUksQ0FBQyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixPQUFPLEdBQUcsQ0FBQzthQUNaO1lBQ0QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7U0FDdEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxrQkFBZSxpQkFBaUIsQ0FBQyJ9