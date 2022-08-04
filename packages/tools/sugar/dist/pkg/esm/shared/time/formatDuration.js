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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function formatDuration(duration) {
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
export default formatDuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxjQUFjLENBQUMsUUFBZ0I7SUFDcEMsSUFBSSxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxFQUFFO1FBQ2pCLE9BQU8sR0FBRyxRQUFRLElBQUksQ0FBQztLQUMxQjtJQUNELElBQUksUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLEVBQUU7UUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sRUFBRSxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUMsSUFBSSxFQUFFLElBQUksQ0FBQztZQUFFLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUM1QixPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO1FBRXJCLGdCQUFnQjtRQUNoQixzQkFBc0I7UUFDdEIsV0FBVztRQUNYLGdEQUFnRDtRQUNoRCxJQUFJO0tBRVA7SUFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUMzQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6RCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0tBQ3pDO0lBQ0Qsd0NBQXdDO0lBQ3hDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5FLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDdEMsSUFBSTtBQUNSLENBQUM7QUFDRCxlQUFlLGNBQWMsQ0FBQyJ9