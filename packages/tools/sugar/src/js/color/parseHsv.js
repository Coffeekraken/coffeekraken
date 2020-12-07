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
     * @name                parseHsv
     * @namespace           sugar.js.color
     * @type                Function
     * @stable
     *
     * Parse HSV
     *
     * @param         	{string}	          	hsvString		        	The hsv string (hsv(h,s,v)) to parse
     * @return        	{object}					                        		The hsv object representation
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import parseHsv from '@coffeekraken/sugar/js/color/parseHsv';
     * parseHsv('hsv(10,10,10)');
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function parseHsv(hsvString) {
        hsvString = hsvString.toLowerCase();
        var string = hsvString
            .replace('hsv(', '')
            .replace(')', '')
            .replace(/\s/g, '');
        var array = string.split(',');
        return {
            h: parseFloat(array[0]),
            s: parseFloat(array[1]),
            v: parseFloat(array[2])
        };
    }
    return parseHsv;
});
//# sourceMappingURL=parseHsv.js.map