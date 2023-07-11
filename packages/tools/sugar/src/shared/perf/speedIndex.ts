import __loopsCount from './loopsCount.js';

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
export default function speedIndex(slow = 100000, fast = 1500000): number {
    const loopsCount = __loopsCount(100), // on 100ms
        index = (100 / (fast - slow)) * loopsCount;
    return Math.round(index);
}
