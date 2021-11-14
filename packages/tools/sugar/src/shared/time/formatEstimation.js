// @ts-nocheck
/**
 * @name            formatEstimation
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
 * import formatEstimation from '@coffeekraken/sugar/js/time/formatEstimation';
 * formatEstimation(2000); // => 2s
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function formatEstimation(estimation) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0RXN0aW1hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm1hdEVzdGltYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLGdCQUFnQixDQUFDLFVBQWtCO0lBQ3hDLElBQUksVUFBVSxLQUFLLFFBQVEsRUFBRTtRQUN6QixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNELElBQUksVUFBVSxHQUFHLElBQUksRUFBRTtRQUNuQixPQUFPLEdBQUcsVUFBVSxJQUFJLENBQUM7S0FDNUI7SUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxFQUFFO1FBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlDLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7S0FDN0M7SUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUM3QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0tBQzFDO0lBQ0QsMENBQTBDO0lBQzFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXJFLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDdkMsSUFBSTtBQUNSLENBQUM7QUFDRCxlQUFlLGdCQUFnQixDQUFDIn0=