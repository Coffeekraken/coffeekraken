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
     * @name                        parseRgba
     * @namespace           sugar.js.color
     * @type                        Function
     * @stable
     *
     * Parse RGBA string and return an object
     *
     * @param 	          {string}	            rgbaString		            The rgba string (rgba(r,g,b,a)) to parse
     * @return 	          {object} 				                              	The rgba object representation
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example           js
     * import parseRgba from '@coffeekraken/sugar/js/color/parseRgba';
     * parseRgba('rgba(20,10,100,20)');
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function parseRgba(rgbaString) {
        rgbaString = rgbaString.toLowerCase();
        var string = rgbaString
            .replace('rgba(', '')
            .replace(')', '')
            .replace(/\s/g, '');
        var array = string.split(',');
        return {
            r: parseInt(array[0]),
            g: parseInt(array[1]),
            b: parseInt(array[2]),
            a: parseInt(array[3])
        };
    }
    return parseRgba;
});
//# sourceMappingURL=parseRgba.js.map