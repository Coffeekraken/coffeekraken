"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            utcTime
 * @namespace       shared.date
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This method allows you to display easily the time in UTC format like "10:20:32"
 *
 * @param       {Boolean}          [hours=true]             Display the hours or not
 * @param       {Boolean}          [minutes=true]             Display the minutes or not
 * @param       {Boolean}          [seconds=true]             Display the seconds or not
 *
 * @todo        tests
 *
 * @example         js
 * import utcTime from '@coffeekraken/sugar/shared/date/utcTime';
 * utcTime(); // => 10:20:32
 * utcTime(true, true, false); // => 10:20
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function utcTime(hours = true, minutes = true, seconds = true) {
    const timeAr = [];
    const date = new Date();
    if (hours)
        timeAr.push(date.getHours());
    if (minutes)
        timeAr.push(date.getMinutes());
    if (seconds)
        timeAr.push(date.getSeconds());
    return timeAr.join(':');
}
exports.default = utcTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBd0IsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsT0FBTyxHQUFHLElBQUksRUFBRSxPQUFPLEdBQUcsSUFBSTtJQUN4RSxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFDNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUN4QixJQUFJLEtBQUs7UUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLElBQUksT0FBTztRQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDNUMsSUFBSSxPQUFPO1FBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUM1QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQVBELDBCQU9DIn0=