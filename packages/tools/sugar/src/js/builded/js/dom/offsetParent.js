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
        define(["require", "exports", "./offset"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var offset_1 = __importDefault(require("./offset"));
    /**
     * @name      offsetParent
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Get the offset top and left of the passed element from his parent top left point
     *
     * @param 		{HTMLElement} 					elm  		The element to get the offset from
     * @return 		{Object} 									The offset top and left object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import offsetParent from '@coffeekraken/sugar/js/dom/offsetParent'
     * const offsetParentElm = offsetParent(myCoolElement);
     * // output : { top : 200, left : 300 }
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function offsetParent(elm) {
        var parentOffset = offset_1.default(elm.parentNode);
        var offset = offset_1.default(elm);
        return {
            top: offset.top - parentOffset.top,
            left: offset.left - parentOffset.left
        };
    }
    exports.default = offsetParent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2Zmc2V0UGFyZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZG9tL29mZnNldFBhcmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxvREFBZ0M7SUFDaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxTQUFTLFlBQVksQ0FBQyxHQUFHO1FBQ3ZCLElBQU0sWUFBWSxHQUFHLGdCQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLElBQU0sTUFBTSxHQUFHLGdCQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsT0FBTztZQUNMLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxHQUFHO1lBQ2xDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJO1NBQ3RDLENBQUM7SUFDSixDQUFDO0lBQ0Qsa0JBQWUsWUFBWSxDQUFDIn0=