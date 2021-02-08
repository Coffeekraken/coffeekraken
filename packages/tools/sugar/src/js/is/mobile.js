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
        define(["require", "exports", "mobile-detect"], factory);
    }
})(function (require, exports) {
    "use strict";
    var mobile_detect_1 = __importDefault(require("mobile-detect"));
    /**
     * @name        isMobile
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Detect if is a mobile device (phone or tablet)
     *
     * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test *
     * @return    {Boolean}    true if is a mobile, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import isMobile from 'coffeekraken-sugar/js/is/mobile'
     * if (isMobile()) {
     *   // do something cool...
     * }
     *
     * @see       https://www.npmjs.com/package/mobile-detect
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isMobile(ua) {
        if (ua === void 0) { ua = navigator.userAgent; }
        var md = new mobile_detect_1.default(ua);
        return md.mobile() !== null;
    }
    return isMobile;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9iaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0lBRWQsZ0VBQXlDO0lBQ3pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLFFBQVEsQ0FBQyxFQUF3QjtRQUF4QixtQkFBQSxFQUFBLEtBQUssU0FBUyxDQUFDLFNBQVM7UUFDeEMsSUFBTSxFQUFFLEdBQUcsSUFBSSx1QkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLElBQUksQ0FBQztJQUM5QixDQUFDO0lBQ0QsT0FBUyxRQUFRLENBQUMifQ==