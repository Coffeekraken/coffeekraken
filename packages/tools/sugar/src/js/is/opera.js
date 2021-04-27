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
     * @name        isOpera
     * @namespace            js.is
     * @type      Function
     * @stable
     *
     * Detect if is opera
     *
     * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
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
    function isOpera(ua = navigator.userAgent) {
        return ua.toLowerCase().indexOf('op') > -1;
    }
    exports.default = isOpera;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcGVyYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLE9BQU8sQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLFNBQVM7UUFDdkMsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFDRCxrQkFBZSxPQUFPLENBQUMifQ==