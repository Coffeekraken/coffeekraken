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
        define(["require", "exports", "../string/camelize", "../string/autoCast"], factory);
    }
})(function (require, exports) {
    "use strict";
    var camelize_1 = __importDefault(require("../string/camelize"));
    var autoCast_1 = __importDefault(require("../string/autoCast"));
    /**
     * @name      getStyleProperty
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Get a style property on the passed element through the computed style.
     * This function try to store the actual style to not trigger more that 1 redraw
     * each js execution loop.
     *
     * @param 		{HTMLElement} 					elm  		The element to get style from
     * @param 		{String} 						property 	The css property to get
     * @return 		{Mixed} 									The style value
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import getStyleProperty from '@coffeekraken/sugar/js/dom/getStyleProperty'
     * const opacity = getStyleProperty(myCoolHTMLElement, 'opacity');
     *
     * @see 		https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function getStyleProperty(elm, property) {
        // caching mecanisme
        setTimeout(function () {
            elm._sComputedStyle = null;
        });
        var computed = elm._sComputedStyle || window.getComputedStyle(elm);
        elm._sComputedStyle = computed;
        var prefixes = ['', 'webkit-', 'moz-', 'ms-', 'o-', 'khtml-'];
        for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            var value = computed[camelize_1.default("" + prefix + property)];
            if (value && value.trim() !== '')
                return autoCast_1.default(value);
        }
        return null;
    }
    return getStyleProperty;
});
//# sourceMappingURL=getStyleProperty.js.map