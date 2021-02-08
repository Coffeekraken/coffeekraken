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
     * @name        isOpera
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Detect if is opera
     *
     * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
     * @return    {Boolean}    true if is opera, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import isOpera from '@coffeekraken/sugar/js/is/opera'
     * if (isOpera()) {
     *   // do something cool
     * }
     *
     * @since         1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isOpera(ua) {
        if (ua === void 0) { ua = navigator.userAgent; }
        return ua.toLowerCase().indexOf('op') > -1;
    }
    return isOpera;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcGVyYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUNILFNBQVMsT0FBTyxDQUFDLEVBQXdCO1FBQXhCLG1CQUFBLEVBQUEsS0FBSyxTQUFTLENBQUMsU0FBUztRQUN2QyxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNELE9BQVMsT0FBTyxDQUFDIn0=