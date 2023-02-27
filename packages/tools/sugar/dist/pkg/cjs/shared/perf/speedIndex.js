"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loopsCount_1 = __importDefault(require("./loopsCount"));
/**
 * @name            speedIndex
 * @namespace            shared.perf
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        stable
 *
 * This function gives you back an index usually between 0 and 100 that represent
 * the speed estimation of the computer on which this code runs.
 * This index is calculated by estimating the loops (for) count that the computer
 * can make in 100ms and make use of the "slow" and "fast" parameters that represent
 * an average of how many loops a "slow" computer can do in this timeframe, vs how many loops a "fast"
 * computer can make in this timeframe.
 * You can totally update these parameters as you prefer.
 * Note that these parameters can/will be updated during time to reflect the most
 * average cases possible.
 *
 * @param       {Number}        [slow=100000]           How many loops a "slow" computer can make in 100ms
 * @param       {Number}        [fast=1400000]          How many loops a "fast" computer can make in 100ms
 * @return      {Number}                                 The speed index calculated from the passed params and the loops the computer can make in 100ms
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __speedIndex($1, $2)
 *
 * @example       js
 * import { __speedIndex } from '@coffeekraken/sugar/perf';
 * __speedIndex(); // 78
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function speedIndex(slow = 100000, fast = 1500000) {
    const loopsCount = (0, loopsCount_1.default)(100), // on 100ms
    index = (100 / (fast - slow)) * loopsCount;
    return Math.round(index);
}
exports.default = speedIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQXdDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsU0FBd0IsVUFBVSxDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsSUFBSSxHQUFHLE9BQU87SUFDNUQsTUFBTSxVQUFVLEdBQUcsSUFBQSxvQkFBWSxFQUFDLEdBQUcsQ0FBQyxFQUFFLFdBQVc7SUFDN0MsS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQy9DLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBSkQsNkJBSUMifQ==