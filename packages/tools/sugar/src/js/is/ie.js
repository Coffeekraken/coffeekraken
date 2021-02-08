// @ts-nocheck
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
     * @name        isIe
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Detect if is ie (internet explorer)
     *
     * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
     * @return    {Boolean}    true if is ie, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import isIe from '@coffeekraken/sugar/js/is/ie'
     * if (isIe()) {
     *   // do something cool
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isIe(ua) {
        if (ua === void 0) { ua = navigator.userAgent; }
        return ua.indexOf('MSIE') > -1;
    }
    return isIe;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUNILFNBQVMsSUFBSSxDQUFDLEVBQXdCO1FBQXhCLG1CQUFBLEVBQUEsS0FBSyxTQUFTLENBQUMsU0FBUztRQUNwQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNELE9BQVMsSUFBSSxDQUFDIn0=