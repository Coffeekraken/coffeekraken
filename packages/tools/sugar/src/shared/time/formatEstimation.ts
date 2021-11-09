// @ts-nocheck

/**
 * @name            formatEstimation
 * @namespace            shared.time
 * @type            Function
 * @async
 * @platform          js
 * @platform          ts
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
 * import formatEstimation from '@coffeekraken/sugar/js/time/formatEstimation';
 * formatEstimation(2000); // => 2s
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function formatEstimation(estimation: number): string {
    if (estimation === Infinity) {
        return '...';
    }
    if (estimation < 1000) {
        return `${estimation}ms`;
    }
    if (estimation < 1000 * 60) {
        const s = (estimation / 1000).toFixed(0);
        const ms = (estimation - s * 1000).toFixed(0);

        return `${s}s${ms > 0 ? ` ${ms}ms` : ''}`;
    }
    if (estimation < 1000 * 60 * 60) {
        const m = Math.floor(estimation / 1000 / 60);
        const s = ((estimation - m * 1000 * 60) / 1000).toFixed(0);

        return `${m}m${s > 0 ? ` ${s}s` : ''}`;
    }
    // if (estimation < 1000 * 60 * 60 * 60) {
    const h = Math.floor(estimation / 1000 / 60 / 60);
    const m = ((estimation - h * 1000 * 60 * 60) / 1000 / 60).toFixed(0);

    return `${h}h${m > 0 ? ` ${m}m` : ''}`;
    // }
}
export default formatEstimation;
