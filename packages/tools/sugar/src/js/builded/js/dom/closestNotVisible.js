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
    exports.default = closestNotVisible;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2VzdE5vdFZpc2libGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9kb20vY2xvc2VzdE5vdFZpc2libGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMERBQXNDO0lBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHO1FBQzVCLElBQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN4QixHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztRQUNyQixPQUFPLEdBQUcsSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRTtZQUM5QyxJQUFJLENBQUMsbUJBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDckIsT0FBTyxHQUFHLENBQUM7YUFDWjtZQUNELEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Qsa0JBQWUsaUJBQWlCLENBQUMifQ==