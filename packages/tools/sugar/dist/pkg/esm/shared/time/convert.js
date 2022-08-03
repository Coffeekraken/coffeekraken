// @ts-nocheck
/**
 * @name                                  convert
 * @namespace            js.time
 * @type                                  Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function allows you to convert time like seconds, ms, hours, minutes, etc... from one format to another
 *
 * @param           {String|Number}             from                  The value to start from like "10s", "20ms", "2h", etc...
 * @param           {String}                    [to='ms']             The format you want to get back
 * @return          {Number}                                          The converted value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import convert from '@coffeekraken/sugar/js/time/convert';
 * convert('10s', 'ms'); // => 10000
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function convert(from, to = 'ms') {
    // init the fromMs variable
    let fromMs = from;
    // check if the time is a string to convert it to ms
    if (typeof from === 'string') {
        const fromNumber = parseFloat(from);
        const fromLength = fromNumber.toString().length;
        const fromString = from.slice(fromLength);
        if (fromString === 'ms' ||
            fromString === 'millisecond' ||
            fromString === 'milliseconds') {
            fromMs = fromNumber;
        }
        else if (fromString === 's' ||
            fromString === 'second' ||
            fromString === 'seconds') {
            fromMs = fromNumber * 1000;
        }
        else if (fromString === 'm' ||
            fromString === 'minute' ||
            fromString === 'minutes') {
            fromMs = fromNumber * 60 * 1000;
        }
        else if (fromString === 'h' ||
            fromString === 'hour' ||
            fromString === 'hours') {
            fromMs = fromNumber * 60 * 60 * 1000;
        }
        else if (fromString === 'd' ||
            fromString === 'day' ||
            fromString === 'days') {
            fromMs = fromNumber * 24 * 60 * 60 * 1000;
        }
        else if (fromString === 'w' ||
            fromString === 'week' ||
            fromString === 'weeks') {
            fromMs = fromNumber * 7 * 24 * 60 * 60 * 1000;
        }
        else if (fromString === 'month' || fromString === 'months') {
            fromMs = fromNumber * 31 * 24 * 60 * 60 * 1000;
        }
        else if (fromString === 'y' ||
            fromString === 'year' ||
            fromString === 'years') {
            fromMs = fromNumber * 365 * 24 * 60 * 60 * 1000;
        }
    }
    // convert not the fromMs value to the requested format
    switch (to) {
        case 'ms':
        case 'millisecond':
        case 'milliseconds':
            return fromMs;
            break;
        case 's':
        case 'second':
        case 'seconds':
            return fromMs / 1000;
            break;
        case 'm':
        case 'minute':
        case 'minutes':
            return fromMs / 1000 / 60;
            break;
        case 'h':
        case 'hour':
        case 'hours':
            return fromMs / 1000 / 60 / 60;
            break;
        case 'd':
        case 'day':
        case 'days':
            return fromMs / 1000 / 60 / 60 / 24;
            break;
        case 'w':
        case 'week':
        case 'weeks':
            return fromMs / 1000 / 60 / 60 / 24 / 7;
            break;
        case 'month':
        case 'months':
            return fromMs / 1000 / 60 / 60 / 24 / 31;
            break;
        case 'y':
        case 'year':
        case 'years':
            return fromMs / 1000 / 60 / 60 / 24 / 365;
            break;
        default:
            throw new Error(`You try to convert "${from}" to "${to}" but this format does not exist... The valids formats are "ms,s,m,h,d,w,month,y"...`);
            break;
    }
}
convert.MILLISECOND = 'ms';
convert.SECOND = 's';
convert.MINUTE = 'm';
convert.HOUR = 'h';
convert.DAY = 'd';
convert.WEEK = 'w';
convert.MONTH = 'month';
convert.YEAR = 'y';
export default convert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxJQUFJO0lBQzVCLDJCQUEyQjtJQUMzQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFFbEIsb0RBQW9EO0lBQ3BELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzFCLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2hELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFMUMsSUFDSSxVQUFVLEtBQUssSUFBSTtZQUNuQixVQUFVLEtBQUssYUFBYTtZQUM1QixVQUFVLEtBQUssY0FBYyxFQUMvQjtZQUNFLE1BQU0sR0FBRyxVQUFVLENBQUM7U0FDdkI7YUFBTSxJQUNILFVBQVUsS0FBSyxHQUFHO1lBQ2xCLFVBQVUsS0FBSyxRQUFRO1lBQ3ZCLFVBQVUsS0FBSyxTQUFTLEVBQzFCO1lBQ0UsTUFBTSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDOUI7YUFBTSxJQUNILFVBQVUsS0FBSyxHQUFHO1lBQ2xCLFVBQVUsS0FBSyxRQUFRO1lBQ3ZCLFVBQVUsS0FBSyxTQUFTLEVBQzFCO1lBQ0UsTUFBTSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQ25DO2FBQU0sSUFDSCxVQUFVLEtBQUssR0FBRztZQUNsQixVQUFVLEtBQUssTUFBTTtZQUNyQixVQUFVLEtBQUssT0FBTyxFQUN4QjtZQUNFLE1BQU0sR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJ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