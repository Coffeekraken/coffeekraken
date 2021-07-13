/**
*
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