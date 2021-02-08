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
     * @name        isPhone
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Detect if is a phone device
     *
     * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
     * @return    {Boolean}    true if is a phone, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import isPhone from '@coffeekraken/sugar/js/is/phone'
     * if (isPhone()) {
     *   // do something cool...
     * }
     *
     * @see       https://www.npmjs.com/package/mobile-detect
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isPhone(ua) {
        if (ua === void 0) { ua = navigator.userAgent; }
        var md = new mobile_detect_1.default(ua);
        return md.phone() !== null;
    }
    return isPhone;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaG9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztJQUVkLGdFQUF5QztJQUN6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0JHO0lBQ0gsU0FBUyxPQUFPLENBQUMsRUFBd0I7UUFBeEIsbUJBQUEsRUFBQSxLQUFLLFNBQVMsQ0FBQyxTQUFTO1FBQ3ZDLElBQU0sRUFBRSxHQUFHLElBQUksdUJBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUNELE9BQVMsT0FBTyxDQUFDIn0=