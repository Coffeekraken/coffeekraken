"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const easeOutQuad_js_1 = __importDefault(require("../easing/easeOutQuad.js"));
const clamp_js_1 = __importDefault(require("./clamp.js"));
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
function __easeClamp(num, minEnd, minStart, maxStart, maxEnd) {
    const diffStart = Math.abs(minStart - minEnd), diffEnd = Math.abs(maxStart - maxEnd);
    let computedNum = num;
    if (num <= minStart) {
        const percent = Math.abs((100 / diffStart) * (0, clamp_js_1.default)(num, minEnd, minStart));
        computedNum =
            (diffStart / 100) * ((0, easeOutQuad_js_1.default)((1 / 100) * percent) * 100) * -1;
    }
    else if (num >= maxStart) {
        const percent = Math.abs((100 / diffEnd) * (0, clamp_js_1.default)(diffEnd - (maxEnd - num), 0, diffEnd));
        computedNum =
            maxStart +
                (diffEnd / 100) * ((0, easeOutQuad_js_1.default)((1 / 100) * percent) * 100);
    }
    return computedNum;
}
exports.default = __easeClamp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBQXFEO0FBQ3JELDBEQUFpQztBQUVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQXdCLFdBQVcsQ0FDL0IsR0FBVyxFQUNYLE1BQWMsRUFDZCxRQUFnQixFQUNoQixRQUFnQixFQUNoQixNQUFjO0lBRWQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEVBQ3pDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUUxQyxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUM7SUFFdEIsSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFO1FBQ2pCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQ3BCLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLElBQUEsa0JBQU8sRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUNyRCxDQUFDO1FBQ0YsV0FBVztZQUNQLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSx3QkFBYSxFQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzNFO1NBQU0sSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFO1FBQ3hCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQ3BCLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLElBQUEsa0JBQU8sRUFBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUNsRSxDQUFDO1FBQ0YsV0FBVztZQUNQLFFBQVE7Z0JBQ1IsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLHdCQUFhLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDcEU7SUFFRCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBNUJELDhCQTRCQyJ9