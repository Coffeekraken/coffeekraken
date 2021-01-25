"use strict";
// @ts-nocheck
// @shared
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
module.exports = pad;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEdBQUcsR0FBRztJQUN6QyxNQUFNLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNyQixPQUFPLE1BQU0sQ0FBQyxNQUFNLElBQUksS0FBSztRQUMzQixDQUFDLENBQUMsTUFBTTtRQUNSLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3BFLENBQUM7QUFDRCxpQkFBUyxHQUFHLENBQUMifQ==