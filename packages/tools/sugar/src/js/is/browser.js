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
     * @name        isBrowser
     * @namespace           sugar.js.is
     * @type      Function
     * @stable
     *
     * Check if the script is running inside a browser or not
     *
     * @return   {Boolean}   true if it's in a browser, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isBrowser from '@coffeekraken/sugar/js/is/browser'
     * if (isBrowser() {
     *   // do something
     * }
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isBrowser(value) {
        return typeof window !== 'undefined';
    }
    return isBrowser;
});
