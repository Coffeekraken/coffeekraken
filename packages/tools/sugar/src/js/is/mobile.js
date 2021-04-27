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
    Object.defineProperty(exports, "__esModule", { value: true });
    const mobile_detect_1 = __importDefault(require("mobile-detect"));
    /**
     * @name        isMobile
     * @namespace            js.is
     * @type      Function
     * @stable
     *
     * Detect if is a mobile device (phone or tablet)
     *
     * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test *
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
    function isMobile(ua = navigator.userAgent) {
        const md = new mobile_detect_1.default(ua);
        return md.mobile() !== null;
    }
    exports.default = isMobile;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9iaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGtFQUF5QztJQUN6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxRQUFRLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxTQUFTO1FBQ3hDLE1BQU0sRUFBRSxHQUFHLElBQUksdUJBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUNELGtCQUFlLFFBQVEsQ0FBQyJ9