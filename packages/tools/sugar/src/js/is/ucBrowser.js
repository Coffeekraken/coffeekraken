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
     * @name        isUcBrowser
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Detect if is the UC stock browser that is running the page
     *
     * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isUcBrowser from '@coffeekraken/sugar/js/is/ucBrowser'
     * if (isUcBrowser()) {
     *   // do something
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isUcBrowser(ua) {
        if (ua === void 0) { ua = navigator.userAgent; }
        return ua.match(/UCBrowser/i) !== null;
    }
    return isUcBrowser;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWNCcm93c2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWNCcm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxTQUFTLFdBQVcsQ0FBQyxFQUF3QjtRQUF4QixtQkFBQSxFQUFBLEtBQUssU0FBUyxDQUFDLFNBQVM7UUFDM0MsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBQ0QsT0FBUyxXQUFXLENBQUMifQ==