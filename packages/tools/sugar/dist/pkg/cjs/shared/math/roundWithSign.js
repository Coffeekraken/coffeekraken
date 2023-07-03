"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        roundWithSign
 * @namespace   shared.math
 * @type       Function
 * @status      stable
 * @platform    node
 * @platform        js
 *
 * This function allows you to round a number by keeping his sign "+" or "-"
 *
 * @param       {Number}    number    The number to round
 * @return      {Number}     The rounded number
 *
 * @snippet         __roundWithSign($1)
 *
 * @example         js
 * import { __roundWithSign } from '@coffeekraken/sugar/math';
 * __roundWithSign(1.5); // => 1
 * __roundWithSign(-1.5); // => -1
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __roundWithSign(number) {
    return Math.sign(number) * Math.round(Math.abs(number));
}
exports.default = __roundWithSign;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUF3QixlQUFlLENBQUMsTUFBYztJQUNsRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUZELGtDQUVDIn0=