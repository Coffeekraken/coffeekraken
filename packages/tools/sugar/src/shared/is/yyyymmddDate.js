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
     * @name        isYyyymmddDate
     * @namespace            js.is
     * @type      Function
     * @stable
     *
     * Check if is a valid yyyy.mm.dd date
     * This will match : yyyy.mm.dd | yyyy/mm/dd | yyyy-mm-dd | yyyy mm dd
     *
     * @param    {String}    date    The date to check
     * @return    {Boolean}    true if is valid, false if not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import isYyyymmddDate from '@coffeekraken/sugar/js/is/yyyymmddDate'
     * if (isYyyymmddDate('2018.12.25')) {
     *     // do something cool
     * }
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function isYyyymmddDate(date) {
        return /^\d{4}[\-\/\s\.]?((((0[13578])|(1[02]))[\-\/\s\.]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s\.]?(([0-2][0-9])|(30)))|(02[\-\/\s\.]?[0-2][0-9]))$/.test(date);
    }
    exports.default = isYyyymmddDate;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXl5eW1tZGREYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsieXl5eW1tZGREYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxTQUFTLGNBQWMsQ0FBQyxJQUFJO1FBQzFCLE9BQU8sdUpBQXVKLENBQUMsSUFBSSxDQUNqSyxJQUFJLENBQ0wsQ0FBQztJQUNKLENBQUM7SUFDRCxrQkFBZSxjQUFjLENBQUMifQ==