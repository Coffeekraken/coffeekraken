// @ts-nocheck
/**
 * @name                                  convert
 * @namespace            js.time
 * @type                                  Function
 * @stable
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvdGltZS9jb252ZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsSUFBSTtJQUM5QiwyQkFBMkI7SUFDM0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBRWxCLG9EQUFvRDtJQUNwRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNoRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTFDLElBQ0UsVUFBVSxLQUFLLElBQUk7WUFDbkIsVUFBVSxLQUFLLGFBQWE7WUFDNUIsVUFBVSxLQUFLLGNBQWMsRUFDN0I7WUFDQSxNQUFNLEdBQUcsVUFBVSxDQUFDO1NBQ3JCO2FBQU0sSUFDTCxVQUFVLEtBQUssR0FBRztZQUNsQixVQUFVLEtBQUssUUFBUTtZQUN2QixVQUFVLEtBQUssU0FBUyxFQUN4QjtZQUNBLE1BQU0sR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQzVCO2FBQU0sSUFDTCxVQUFVLEtBQUssR0FBRztZQUNsQixVQUFVLEtBQUssUUFBUTtZQUN2QixVQUFVLEtBQUssU0FBUyxFQUN4QjtZQUNBLE1BQU0sR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUNqQzthQUFNLElBQ0wsVUFBVSxLQUFLLEdBQUc7WUFDbEIsVUFBVSxLQUFLLE1BQU07WUFDckIsVUFB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