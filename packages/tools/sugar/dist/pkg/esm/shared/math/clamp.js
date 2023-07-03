/**
 * @name          clamp
 * @namespace            shared.math
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        stable
 *
 * Clamp a number between two values
 *
 * @param       {Number}       num             The number to clamp
 * @param       {Number}       min             The minimum value
 * @param       {Number}       max             The maximum value
 * @return      {Number}                The clamped number
 *
 * @snippet         __clamp($1, $2, $3)
 *
 * @example       js
 * import { __clamp } from '@coffeekraken/sugar/math';
 * __clamp(10, 0, 100); // => 10
 * __clamp(0, 0, 100); // => 0
 * __clamp(100, 0, 100); // => 100
 * __clamp(101, 0, 100); // => 100
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __clamp(num, min, max) {
    // console.log('NUM', num, 'MIN', min, 'MAX', max);
    // if (num < min) num = min;
    // else if (num > max) num = max;
    // return num;
    return Math.min(Math.max(num, min), max);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztJQUN6QyxtREFBbUQ7SUFFbkQsNEJBQTRCO0lBQzVCLGlDQUFpQztJQUNqQyxjQUFjO0lBRWQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzdDLENBQUMifQ==