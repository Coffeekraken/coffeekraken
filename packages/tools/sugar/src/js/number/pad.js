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
    function pad(number, width, character) {
        if (character === void 0) { character = '0'; }
        number = number + '';
        return number.length >= width
            ? number
            : new Array(width - number.length + 1).join(character) + number;
    }
    return pad;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFlO1FBQWYsMEJBQUEsRUFBQSxlQUFlO1FBQ3pDLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLE9BQU8sTUFBTSxDQUFDLE1BQU0sSUFBSSxLQUFLO1lBQzNCLENBQUMsQ0FBQyxNQUFNO1lBQ1IsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDcEUsQ0FBQztJQUNELE9BQVMsR0FBRyxDQUFDIn0=