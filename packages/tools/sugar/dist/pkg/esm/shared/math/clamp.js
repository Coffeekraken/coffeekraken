/**
 * @name          clamp
 * @namespace            js.math
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
 * @example       js
 * import clamp from '@coffeekraken/sugar/js/math/clamp';
 * clamp(10, 0, 100); // => 10
 * clamp(0, 0, 100); // => 0
 * clamp(100, 0, 100); // => 100
 * clamp(101, 0, 100); // => 100
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function clamp(num, min, max) {
    // console.log('NUM', num, 'MIN', min, 'MAX', max);
    // if (num < min) num = min;
    // else if (num > max) num = max;
    // return num;
    return Math.min(Math.max(num, min), max);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDdkMsbURBQW1EO0lBRW5ELDRCQUE0QjtJQUM1QixpQ0FBaUM7SUFDakMsY0FBYztJQUVkLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM3QyxDQUFDIn0=