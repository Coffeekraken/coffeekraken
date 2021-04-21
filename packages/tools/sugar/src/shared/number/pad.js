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
     * @name        pad
     * @namespace            js.number
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEdBQUcsR0FBRztRQUN6QyxNQUFNLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNyQixPQUFPLE1BQU0sQ0FBQyxNQUFNLElBQUksS0FBSztZQUMzQixDQUFDLENBQUMsTUFBTTtZQUNSLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ3BFLENBQUM7SUFDRCxrQkFBZSxHQUFHLENBQUMifQ==