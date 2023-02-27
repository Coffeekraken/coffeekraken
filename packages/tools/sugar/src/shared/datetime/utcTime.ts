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
 * @snippet         __utcTime()
 * 
 * @example         js
 * import { __utcTime } from '@coffeekraken/sugar/date';
 * __utcTime(); // => 10:20:32
 * __utcTime(true, true, false); // => 10:20
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __utcTime(
    hours = true,
    minutes = true,
    seconds = true,
): string {
    const timeAr: number[] = [];
    const date = new Date();
    if (hours) timeAr.push(date.getHours());
    if (minutes) timeAr.push(date.getMinutes());
    if (seconds) timeAr.push(date.getSeconds());
    return timeAr.join(':');
}
