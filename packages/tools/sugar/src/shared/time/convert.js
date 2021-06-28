// @ts-nocheck
/**
 * @name                                  convert
 * @namespace            js.time
 * @type                                  Function
 * @platform          js
 * @platform          ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxJQUFJO0lBQzlCLDJCQUEyQjtJQUMzQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFFbEIsb0RBQW9EO0lBQ3BELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzVCLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2hELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFMUMsSUFDRSxVQUFVLEtBQUssSUFBSTtZQUNuQixVQUFVLEtBQUssYUFBYTtZQUM1QixVQUFVLEtBQUssY0FBYyxFQUM3QjtZQUNBLE1BQU0sR0FBRyxVQUFVLENBQUM7U0FDckI7YUFBTSxJQUNMLFVBQVUsS0FBSyxHQUFHO1lBQ2xCLFVBQVUsS0FBSyxRQUFRO1lBQ3ZCLFVBQVUsS0FBSyxTQUFTLEVBQ3hCO1lBQ0EsTUFBTSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDNUI7YUFBTSxJQUNMLFVBQVUsS0FBSyxHQUFHO1lBQ2xCLFVBQVUsS0FBSyxRQUFRO1lBQ3ZCLFVBQVUsS0FBSyxTQUFTLEVBQ3hCO1lBQ0EsTUFBTSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO2FBQU0sSUFDTCxVQUFVLEtBQUssR0FBRztZQUNsQixVQUFVLEtBQUssTUFBTTtZQUNyQixVQUFVLEtBQUssT0FBTyxFQUN0QjtZQUNBLE1BQU0sR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDdEM7YUFBTSxJQUNMLFVBQVUsS0FBSyxHQUFHO1lBQ2xCLFVBQVUsS0FBSyxLQUFLO1lBQ3BCLFVBQVUsS0FBSyxNQUFNLEVBQ3JCO1lBQ0EsTUFBTSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDM0M7YUFBTSxJQUNMLFVBQVUsS0FBSyxHQUFHO1lBQ2xCLFVBQVUsS0FBSyxNQUFNO1lBQ3JCLFVBQVUsS0FBSyxPQUFPLEVBQ3RCO1lBQ0EsTUFBTSxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQy9DO2FBQU0sSUFBSSxVQUFVLEtBQUssT0FBTyxJQUFJLFVBQVUsS0FBSyxRQUFRLEVBQUU7WUFDNUQsTUFBTSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQ2hEO2FBQU0sSUFDTCxVQUFVLEtBQUssR0FBRztZQUNsQixVQUFVLEtBQUssTUFBTTtZQUNyQixVQUFVLEtBQUssT0FBTyxFQUN0QjtZQUNBLE1BQU0sR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUNqRDtLQUNGO0lBRUQsdURBQXVEO0lBQ3ZELFFBQVEsRUFBRSxFQUFFO1FBQ1YsS0FBSyxJQUFJLENBQUM7UUFDVixLQUFLLGFBQWEsQ0FBQztRQUNuQixLQUFLLGNBQWM7WUFDakIsT0FBTyxNQUFNLENBQUM7WUFDZCxNQUFNO1FBQ1IsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssU0FBUztZQUNaLE9BQU8sTUFBTSxHQUFHLElBQUksQ0FBQztZQUNyQixNQUFNO1FBQ1IsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUssU0FBUztZQUNaLE9BQU8sTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7WUFDMUIsTUFBTTtRQUNSLEtBQUssR0FBRyxDQUFDO1FBQ1QsS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLE9BQU87WUFDVixPQUFPLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUMvQixNQUFNO1FBQ1IsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLEtBQUssQ0FBQztRQUNYLEtBQUssTUFBTTtZQUNULE9BQU8sTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNwQyxNQUFNO1FBQ1IsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssT0FBTztZQUNWLE9BQU8sTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDeEMsTUFBTTtRQUNSLEtBQUssT0FBTyxDQUFDO1FBQ2IsS0FBSyxRQUFRO1lBQ1gsT0FBTyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUN6QyxNQUFNO1FBQ1IsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssT0FBTztZQUNWLE9BQU8sTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDMUMsTUFBTTtRQUNSO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FDYix1QkFBdUIsSUFBSSxTQUFTLEVBQUUsc0ZBQXNGLENBQzdILENBQUM7WUFDRixNQUFNO0tBQ1Q7QUFDSCxDQUFDO0FBQ0QsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDM0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDckIsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDckIsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7QUFDbkIsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDbEIsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7QUFDbkIsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7QUFDeEIsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7QUFDbkIsZUFBZSxPQUFPLENBQUMifQ==