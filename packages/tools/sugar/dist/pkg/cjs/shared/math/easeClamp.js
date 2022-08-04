"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const easeOutQuad_1 = __importDefault(require("../easing/easeOutQuad"));
const clamp_1 = __importDefault(require("./clamp"));
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
function easeClamp(num, minEnd, minStart, maxStart, maxEnd) {
    const diffStart = Math.abs(minStart - minEnd), diffEnd = Math.abs(maxStart - maxEnd);
    let computedNum = num;
    if (num <= minStart) {
        const percent = Math.abs((100 / diffStart) * (0, clamp_1.default)(num, minEnd, minStart));
        computedNum =
            (diffStart / 100) * ((0, easeOutQuad_1.default)((1 / 100) * percent) * 100) * -1;
    }
    else if (num >= maxStart) {
        const percent = Math.abs((100 / diffEnd) * (0, clamp_1.default)(diffEnd - (maxEnd - num), 0, diffEnd));
        computedNum =
            maxStart +
                (diffEnd / 100) * ((0, easeOutQuad_1.default)((1 / 100) * percent) * 100);
    }
    return computedNum;
}
exports.default = easeClamp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esd0VBQWtEO0FBQ2xELG9EQUE4QjtBQUU5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBd0IsU0FBUyxDQUM3QixHQUFXLEVBQ1gsTUFBYyxFQUNkLFFBQWdCLEVBQ2hCLFFBQWdCLEVBQ2hCLE1BQWM7SUFFZCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsRUFDekMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBRTFDLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUV0QixJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUU7UUFDakIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDcEIsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsSUFBQSxlQUFPLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FDckQsQ0FBQztRQUNGLFdBQVc7WUFDUCxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEscUJBQWEsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMzRTtTQUFNLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUN4QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNwQixDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFBLGVBQU8sRUFBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUNsRSxDQUFDO1FBQ0YsV0FBVztZQUNQLFFBQVE7Z0JBQ1IsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLHFCQUFhLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDcEU7SUFFRCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBNUJELDRCQTRCQyJ9