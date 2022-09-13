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
 * import { __utcTime } from '@coffeekraken/sugar/date';
 * __utcTime(); // => 10:20:32
 * __utcTime(true, true, false); // => 10:20
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __utcTime(hours = true, minutes = true, seconds = true) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUM3QixLQUFLLEdBQUcsSUFBSSxFQUNaLE9BQU8sR0FBRyxJQUFJLEVBQ2QsT0FBTyxHQUFHLElBQUk7SUFFZCxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFDNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUN4QixJQUFJLEtBQUs7UUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLElBQUksT0FBTztRQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDNUMsSUFBSSxPQUFPO1FBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUM1QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQyJ9