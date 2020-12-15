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
//# sourceMappingURL=phone.js.map