import __easeOutQuad from '../easing/easeOutQuad';
import __clamp from './clamp';
/**
 * @name          easeClamp
 * @namespace            shared.math
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        stable
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUU5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQy9CLEdBQVcsRUFDWCxNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsUUFBZ0IsRUFDaEIsTUFBYztJQUVkLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxFQUN6QyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFFMUMsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDO0lBRXRCLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUNqQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNwQixDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FDckQsQ0FBQztRQUNGLFdBQVc7WUFDUCxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMzRTtTQUFNLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUN4QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNwQixDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FDbEUsQ0FBQztRQUNGLFdBQVc7WUFDUCxRQUFRO2dCQUNSLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0tBQ3BFO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQyJ9