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
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function utcTime(hours = true, minutes = true, seconds = true) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRjVGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0Y1RpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksRUFBRSxPQUFPLEdBQUcsSUFBSSxFQUFFLE9BQU8sR0FBRyxJQUFJO0lBQ3hFLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUM1QixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3hCLElBQUksS0FBSztRQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDeEMsSUFBSSxPQUFPO1FBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUM1QyxJQUFJLE9BQU87UUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDIn0=