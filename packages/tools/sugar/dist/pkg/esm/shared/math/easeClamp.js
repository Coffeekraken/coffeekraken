import __easeOutQuad from '../easing/easeOutQuad';
import __clamp from './clamp';
/**
 * @name          easeClamp
 * @namespace            shared.math
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        stable
 * @private
 *
 * Clamp a number between two values with easing in and out
 *
 * @param       {Number}       num             The number to clamp
 * @param       {Number}       min             The minimum value
 * @param       {Number}       max             The maximum value
 * @return      {Number}                The clamped number
 *
 * @example       js
 * import { __easeClamp } from '@coffeekraken/sugar/math';
 * __easeClamp(-20, -10, 0, 100, 110); // => -10
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __easeClamp(num, minEnd, minStart, maxStart, maxEnd) {
    const diffStart = Math.abs(minStart - minEnd), diffEnd = Math.abs(maxStart - maxEnd);
    let computedNum = num;
    if (num <= minStart) {
        const percent = Math.abs((100 / diffStart) * __clamp(num, minEnd, minStart));
        computedNum =
            (diffStart / 100) * (__easeOutQuad((1 / 100) * percent) * 100) * -1;
    }
    else if (num >= maxStart) {
        const percent = Math.abs((100 / diffEnd) * __clamp(diffEnd - (maxEnd - num), 0, diffEnd));
        computedNum =
            maxStart +
                (diffEnd / 100) * (__easeOutQuad((1 / 100) * percent) * 100);
    }
    return computedNum;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUU5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUMvQixHQUFXLEVBQ1gsTUFBYyxFQUNkLFFBQWdCLEVBQ2hCLFFBQWdCLEVBQ2hCLE1BQWM7SUFFZCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsRUFDekMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBRTFDLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUV0QixJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUU7UUFDakIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDcEIsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQ3JELENBQUM7UUFDRixXQUFXO1lBQ1AsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDM0U7U0FBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUU7UUFDeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDcEIsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQ2xFLENBQUM7UUFDRixXQUFXO1lBQ1AsUUFBUTtnQkFDUixDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztLQUNwRTtJQUVELE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUMifQ==