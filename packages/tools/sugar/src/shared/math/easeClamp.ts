import __easeInQuad from '../easing/easeInQuad';
import __easeOutQuad from '../easing/easeOutQuad';
import __clamp from './clamp';

/**
 * @name          easeClamp
 * @namespace            js.math
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
 * import clamp from '@coffeekraken/sugar/js/math/clamp';
 * clamp(10, 0, 100); // => 10
 * clamp(0, 0, 100); // => 0
 * clamp(100, 0, 100); // => 100
 * clamp(101, 0, 100); // => 100
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function easeClamp(
    num: number,
    minEnd: number,
    minStart: number,
    maxStart: number,
    maxEnd: number,
): number {
    const diffStart = Math.abs(minStart - minEnd),
        diffEnd = Math.abs(maxStart - maxEnd);

    let computedNum = num;

    if (num <= minStart) {
        const percent = Math.abs(
            (100 / diffStart) * __clamp(num, minEnd, minStart),
        );
        computedNum =
            (diffStart / 100) * (__easeOutQuad((1 / 100) * percent) * 100) * -1;
    } else if (num >= maxStart) {
        const percent = Math.abs(
            (100 / diffEnd) * __clamp(diffEnd - (maxEnd - num), 0, diffEnd),
        );
        computedNum =
            maxStart +
            (diffEnd / 100) * (__easeOutQuad((1 / 100) * percent) * 100);
    }

    return computedNum;
}
