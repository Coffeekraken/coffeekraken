"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        pad
 * @namespace            shared.number
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
 * import { __pad } from '@coffeekraken/sugar/number'
 * __pad(123, 4) // 0123
 *
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __pad(number, width, character = '0') {
    number = number + '';
    return number.length >= width
        ? number
        : new Array(width - number.length + 1).join(character) + number;
}
exports.default = __pad;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUF3QixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEdBQUcsR0FBRztJQUN4RCxNQUFNLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNyQixPQUFPLE1BQU0sQ0FBQyxNQUFNLElBQUksS0FBSztRQUN6QixDQUFDLENBQUMsTUFBTTtRQUNSLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3hFLENBQUM7QUFMRCx3QkFLQyJ9