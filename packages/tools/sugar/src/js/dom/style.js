// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var styleString2Object_1 = __importDefault(require("./styleString2Object"));
    var styleObject2String_1 = __importDefault(require("./styleObject2String"));
    /**
     * @name      style
     * @namespace           sugar.js.dom
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
        var styleAttr = elm.getAttribute('style');
        if (styleAttr) {
            styleObj = __assign(__assign({}, styleString2Object_1.default(styleAttr)), styleObj);
        }
        // apply the style to the element
        // elm.setAttribute('style', __styleObject2String(current.styleObj));
        elm.style.cssText = styleObject2String_1.default(styleObj);
        // return the style
        return elm.style;
    }
    return style;
});
//# sourceMappingURL=module.js.map