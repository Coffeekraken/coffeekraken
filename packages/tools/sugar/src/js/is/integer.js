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
     * @name        isInteger
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if the passed value is an integer
     *
     * @param 		{Mixed} 		value 		The value to check
     * @return 		{Boolean} 					The check result
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import isInteger from '@coffeekraken/sugar/js/is/integer';
     * isInteger(10) => true
     * isInteger('hello') => false
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isInteger(data) {
        return (!isNaN(data) &&
            (function (x) {
                return (x | 0) === x;
            })(parseFloat(data)));
    }
    return isInteger;
});
//# sourceMappingURL=integer.js.map