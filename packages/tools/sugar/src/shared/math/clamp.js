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
 * @param       {Number}       min             The minimum value
 * @param       {Number}       max             The maximum value
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhbXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGFtcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0lBRXZDLG1EQUFtRDtJQUVuRCw0QkFBNEI7SUFDNUIsaUNBQWlDO0lBQ2pDLGNBQWM7SUFFZCxPQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDOUMsQ0FBQyJ9