"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            formatDuration
 * @namespace            shared.datetime
 * @type            Function
 * @async
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function let you pass a duration in ms and get back a formatted estimation like "2.4m", "30s", etc...
 *
 * @param         {Number}        duration          The duration in ms to format
 * @return        {String}                          The formatted estimation duration
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __formatDuration($1)
 *
 * @example       js
 * import { __formatDuration } from '@coffeekraken/sugar/datetime';
 * __formatDuration(2000); // => 2s
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __formatDuration(duration) {
    if (duration === Infinity) {
        return '...';
    }
    if (duration < 1000) {
        return `${duration}ms`;
    }
    if (duration < 1000 * 60) {
        const s = (duration / 1000).toFixed(0);
        const ms = (duration - s * 1000).toFixed(0);
        if (ms <= 0)
            return `${s}s`;
        return `${s}.${ms}s`;
        // if (s > 10) {
        //     return `${s}s`;
        // } else {
        //     return `${s}s${ms > 0 ? `${ms}ms` : ''}`;
        // }
    }
    if (duration < 1000 * 60 * 60) {
        const m = Math.floor(duration / 1000 / 60);
        const s = ((duration - m * 1000 * 60) / 1000).toFixed(0);
        return `${m}m${s > 0 ? `${s}s` : ''}`;
    }
    // if (duration < 1000 * 60 * 60 * 60) {
    const h = Math.floor(duration / 1000 / 60 / 60);
    const m = ((duration - h * 1000 * 60 * 60) / 1000 / 60).toFixed(0);
    return `${h}h${m > 0 ? `${m}m` : ''}`;
    // }
}
exports.default = __formatDuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQXdCLGdCQUFnQixDQUFDLFFBQWdCO0lBQ3JELElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUN2QixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELElBQUksUUFBUSxHQUFHLElBQUksRUFBRTtRQUNqQixPQUFPLEdBQUcsUUFBUSxJQUFJLENBQUM7S0FDMUI7SUFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxNQUFNLEVBQUUsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVDLElBQUksRUFBRSxJQUFJLENBQUM7WUFBRSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDNUIsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztRQUVyQixnQkFBZ0I7UUFDaEIsc0JBQXNCO1FBQ3RCLFdBQVc7UUFDWCxnREFBZ0Q7UUFDaEQsSUFBSTtLQUNQO0lBQ0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDM0IsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztLQUN6QztJQUNELHdDQUF3QztJQUN4QyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3RDLElBQUk7QUFDUixDQUFDO0FBaENELG1DQWdDQyJ9