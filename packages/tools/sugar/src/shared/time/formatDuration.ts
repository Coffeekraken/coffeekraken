// @ts-nocheck

/**
 * @name            formatDuration
 * @namespace            shared.time
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
 * @example       js
 * import formatDuration from '@coffeekraken/sugar/js/time/formatDuration';
 * formatDuration(2000); // => 2s
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function formatDuration(duration: number): string {
    if (duration === Infinity) {
        return '...';
    }
    if (duration < 1000) {
        return `${duration}ms`;
    }
    if (duration < 1000 * 60) {
        const s = (duration / 1000).toFixed(0);
        const ms = (duration - s * 1000).toFixed(0);

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
export default formatDuration;
