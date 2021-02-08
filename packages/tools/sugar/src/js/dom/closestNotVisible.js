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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2VzdE5vdFZpc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbG9zZXN0Tm90VmlzaWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztJQUVkLDBEQUFzQztJQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsaUJBQWlCLENBQUMsR0FBRztRQUM1QixJQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDeEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7UUFDckIsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUU7WUFDOUMsSUFBSSxDQUFDLG1CQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JCLE9BQU8sR0FBRyxDQUFDO2FBQ1o7WUFDRCxHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztTQUN0QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE9BQVMsaUJBQWlCLENBQUMifQ==