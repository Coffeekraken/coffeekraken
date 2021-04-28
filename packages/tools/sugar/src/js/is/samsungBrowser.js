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
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name        isSamsumgBrowser
     * @namespace            js.is
     * @type      Function
     * @stable
     *
     * Detect if is the samsung stock browser that is running the page
     *
     * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
     * @return      {Boolean}                                       true if is a samsung browser, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isSamsumgBrowser from '@coffeekraken/sugar/js/is/samsungBrowser'
     * if (isSamsumgBrowser()) {
     *   // do something
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isSamsumgBrowser(ua = navigator.userAgent) {
        return ua.match(/SamsungBrowser/i) !== null;
    }
    exports.default = isSamsumgBrowser;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Ftc3VuZ0Jyb3dzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvanMvaXMvc2Ftc3VuZ0Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLFNBQVM7UUFDaEQsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEtBQUssSUFBSSxDQUFDO0lBQzlDLENBQUM7SUFDRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9