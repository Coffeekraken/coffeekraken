// @ts-nocheck
// @shared
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
     * @name        pad
     * @namespace           sugar.js.number
     * @type      Function
     * @stable
     *
     * Pad a number n of x 0 or another passed character
     *
     * @param    {Number}    number    The number to pad
     * @param    {Integer}    width    The width of pad to apply
     * @param    {String}    [character="0"]    The character to use
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import pad from '@coffeekraken/sugar/js/numbers/pad'
     * pad(123, 4) // 0123
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function pad(number, width, character = '0') {
        number = number + '';
        return number.length >= width
            ? number
            : new Array(width - number.length + 1).join(character) + number;
    }
    exports.default = pad;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxHQUFHLEdBQUc7UUFDekMsTUFBTSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDckIsT0FBTyxNQUFNLENBQUMsTUFBTSxJQUFJLEtBQUs7WUFDM0IsQ0FBQyxDQUFDLE1BQU07WUFDUixDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUNwRSxDQUFDO0lBQ0Qsa0JBQWUsR0FBRyxDQUFDIn0=