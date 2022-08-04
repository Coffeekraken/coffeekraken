"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        pad
 * @namespace            js.number
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function pad(number, width, character = '0') {
    number = number + '';
    return number.length >= width
        ? number
        : new Array(width - number.length + 1).join(character) + number;
}
exports.default = pad;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsR0FBRyxHQUFHO0lBQ3ZDLE1BQU0sR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLE9BQU8sTUFBTSxDQUFDLE1BQU0sSUFBSSxLQUFLO1FBQ3pCLENBQUMsQ0FBQyxNQUFNO1FBQ1IsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDeEUsQ0FBQztBQUNELGtCQUFlLEdBQUcsQ0FBQyJ9