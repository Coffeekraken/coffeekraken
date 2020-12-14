// @ts-nocheck
// @shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @name                  hex2rgba
     * @namespace           sugar.js.color
     * @type                  Function
     * @stable
     *
     * Hex to RGBA
     *
     * @param	              {string}       	hex         		The hex string to convert
     * @return            	{object} 			                  	The rgba object representation
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import hex2rgba from '@coffeekraken/sugar/js/color/hex2rgba';
     * hex2rgba('#ff00ff');
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function hex2rgba(hex) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        var a = 1;
        if (hex.length == 8) {
            a = (1 / 255) * parseInt(hex.substring(6, 8), 16);
        }
        return {
            r: r,
            g: g,
            b: b,
            a: a
        };
    }
    return hex2rgba;
});
//# sourceMappingURL=module.js.map