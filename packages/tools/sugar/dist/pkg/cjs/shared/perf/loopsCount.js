"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            loopsCount
 * @namespace            shared.perf
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        stable
 *
 * This function calculate how mane loops are executed in a certain timeframe (ms).
 * This is usefull to estimate the computer speed on which this code is running...
 *
 * @param       {Number}        [timeframe=100]         The timeframe to use for calculation
 * @return      {Number}                                 The count of loops executed in the passed timeframe
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __loopsCount } from '@coffeekraken/sugar/perf';
 * __loopsCount(); // 122003
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function loopsCount(timeframe = 100) {
    let sysm = 0, start = new Date().getTime(), end = start;
    while (end - start === 0) {
        end = new Date().getTime();
    }
    start = end;
    while (end - start < timeframe) {
        sysm++;
        end = new Date().getTime();
    }
    return sysm;
}
exports.default = loopsCount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQXdCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsR0FBRztJQUM5QyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQ1IsS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQzVCLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDaEIsT0FBTyxHQUFHLEdBQUcsS0FBSyxLQUFLLENBQUMsRUFBRTtRQUN0QixHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUM5QjtJQUNELEtBQUssR0FBRyxHQUFHLENBQUM7SUFDWixPQUFPLEdBQUcsR0FBRyxLQUFLLEdBQUcsU0FBUyxFQUFFO1FBQzVCLElBQUksRUFBRSxDQUFDO1FBQ1AsR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDOUI7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBYkQsNkJBYUMifQ==