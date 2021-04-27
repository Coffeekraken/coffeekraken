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
        define(["require", "exports", "./styleString2Object", "./styleObject2String"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const styleString2Object_1 = __importDefault(require("./styleString2Object"));
    const styleObject2String_1 = __importDefault(require("./styleObject2String"));
    /**
     * @name      style
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Set or remove a css style property on an HTMLElement
     *
     * @param 		{HTMLElement} 			elm 			The element to process
     * @param 		{Object} 				styleObj 		An object of style to apply
     * @return 		(Object) 								The element applied style
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import style from '@coffeekraken/sugar/js/dom/style'
     * style(myCoolHTMLElement, {
     * 		paddingLeft : 20,
     * 		display : null
     * });
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function style(elm, styleObj) {
        // convert style string to object
        const styleAttr = elm.getAttribute('style');
        if (styleAttr) {
            styleObj = Object.assign(Object.assign({}, styleString2Object_1.default(styleAttr)), styleObj);
        }
        // apply the style to the element
        // elm.setAttribute('style', __styleObject2String(current.styleObj));
        elm.style.cssText = styleObject2String_1.default(styleObj);
        // return the style
        return elm.style;
    }
    exports.default = style;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFHZCw4RUFBd0Q7SUFDeEQsOEVBQXdEO0lBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxLQUFLLENBQUMsR0FBRyxFQUFFLFFBQVE7UUFDMUIsaUNBQWlDO1FBQ2pDLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUMsSUFBSSxTQUFTLEVBQUU7WUFDYixRQUFRLG1DQUNILDRCQUFvQixDQUFDLFNBQVMsQ0FBQyxHQUMvQixRQUFRLENBQ1osQ0FBQztTQUNIO1FBRUQsaUNBQWlDO1FBQ2pDLHFFQUFxRTtRQUNyRSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyw0QkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVuRCxtQkFBbUI7UUFDbkIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQ25CLENBQUM7SUFDRCxrQkFBZSxLQUFLLENBQUMifQ==