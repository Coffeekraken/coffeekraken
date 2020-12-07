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
     * @name        isChrome
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Detect if is chrome
     *
     * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
     * @return    {Boolean}    true if is chrome, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import isChrome from '@coffeekraken/sugar/js/is/chrome'
     * if (isChrome()) {
     *   // do something cool
     * }
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isChrome(ua) {
        if (ua === void 0) { ua = navigator.userAgent; }
        return ua.indexOf('Chrome') > -1;
    }
    return isChrome;
});
//# sourceMappingURL=chrome.js.map