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
 * @snippet         __loopsCount($1)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBd0IsVUFBVSxDQUFDLFNBQVMsR0FBRyxHQUFHO0lBQzlDLElBQUksSUFBSSxHQUFHLENBQUMsRUFDUixLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFDNUIsR0FBRyxHQUFHLEtBQUssQ0FBQztJQUNoQixPQUFPLEdBQUcsR0FBRyxLQUFLLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQzlCO0lBQ0QsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNaLE9BQU8sR0FBRyxHQUFHLEtBQUssR0FBRyxTQUFTLEVBQUU7UUFDNUIsSUFBSSxFQUFFLENBQUM7UUFDUCxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUM5QjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFiRCw2QkFhQyJ9