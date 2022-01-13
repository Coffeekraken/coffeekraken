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
function formatDuration(estimation) {
    if (estimation === Infinity) {
        return '...';
    }
    if (estimation < 1000) {
        return `${estimation}ms`;
    }
    if (estimation < 1000 * 60) {
        const s = (estimation / 1000).toFixed(0);
        const ms = (estimation - s * 1000).toFixed(0);
        return `${s}.${ms}s`;
        // if (s > 10) {
        //     return `${s}s`;
        // } else {
        //     return `${s}s${ms > 0 ? `${ms}ms` : ''}`;
        // }
    }
    if (estimation < 1000 * 60 * 60) {
        const m = Math.floor(estimation / 1000 / 60);
        const s = ((estimation - m * 1000 * 60) / 1000).toFixed(0);
        return `${m}m${s > 0 ? `${s}s` : ''}`;
    }
    // if (estimation < 1000 * 60 * 60 * 60) {
    const h = Math.floor(estimation / 1000 / 60 / 60);
    const m = ((estimation - h * 1000 * 60 * 60) / 1000 / 60).toFixed(0);
    return `${h}h${m > 0 ? `${m}m` : ''}`;
    // }
}
export default formatDuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0RHVyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb3JtYXREdXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsY0FBYyxDQUFDLFVBQWtCO0lBQ3RDLElBQUksVUFBVSxLQUFLLFFBQVEsRUFBRTtRQUN6QixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELElBQUksVUFBVSxHQUFHLElBQUksRUFBRTtRQUNuQixPQUFPLEdBQUcsVUFBVSxJQUFJLENBQUM7S0FDNUI7SUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxFQUFFO1FBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlDLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7UUFFckIsZ0JBQWdCO1FBQ2hCLHNCQUFzQjtRQUN0QixXQUFXO1FBQ1gsZ0RBQWdEO1FBQ2hELElBQUk7S0FFUDtJQUNELElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzdCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7S0FDekM7SUFDRCwwQ0FBMEM7SUFDMUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNsRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFckUsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUN0QyxJQUFJO0FBQ1IsQ0FBQztBQUNELGVBQWUsY0FBYyxDQUFDIn0=