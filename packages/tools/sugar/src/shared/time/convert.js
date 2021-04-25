"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = convert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7O0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFDOUIsMkJBQTJCO0lBQzNCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztJQUVsQixvREFBb0Q7SUFDcEQsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDaEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUxQyxJQUNFLFVBQVUsS0FBSyxJQUFJO1lBQ25CLFVBQVUsS0FBSyxhQUFhO1lBQzVCLFVBQVUsS0FBSyxjQUFjLEVBQzdCO1lBQ0EsTUFBTSxHQUFHLFVBQVUsQ0FBQztTQUNyQjthQUFNLElBQ0wsVUFBVSxLQUFLLEdBQUc7WUFDbEIsVUFBVSxLQUFLLFFBQVE7WUFDdkIsVUFBVSxLQUFLLFNBQVMsRUFDeEI7WUFDQSxNQUFNLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQztTQUM1QjthQUFNLElBQ0wsVUFBVSxLQUFLLEdBQUc7WUFDbEIsVUFBVSxLQUFLLFFBQVE7WUFDdkIsVUFBVSxLQUFLLFNBQVMsRUFDeEI7WUFDQSxNQUFNLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDakM7YUFBTSxJQUNMLFVBQVUsS0FBSyxHQUFHO1lBQ2xCLFVBQVUsS0FBSyxNQUFNO1lBQ3JCLFVBQVUsS0FBSyxPQUFPLEVBQ3RCO1lBQ0EsTUFBTSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUN0QzthQUFNLElBQ0wsVUFBVSxLQUFLLEdBQUc7WUFDbEIsVUFBVSxLQUFLLEtBQUs7WUFDcEIsVUFBVSxLQUFLLE1BQU0sRUFDckI7WUFDQSxNQUFNLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUMzQzthQUFNLElBQ0wsVUFBVSxLQUFLLEdBQUc7WUFDbEIsVUFBVSxLQUFLLE1BQU07WUFDckIsVUFBVSxLQUFLLE9BQU8sRUFDdEI7WUFDQSxNQUFNLEdBQUcsVUFBVSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDL0M7YUFBTSxJQUFJLFVBQVUsS0FBSyxPQUFPLElBQUksVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUM1RCxNQUFNLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDaEQ7YUFBTSxJQUNMLFVBQVUsS0FBSyxHQUFHO1lBQ2xCLFVBQVUsS0FBSyxNQUFNO1lBQ3JCLFVBQVUsS0FBSyxPQUFPLEVBQ3RCO1lBQ0EsTUFBTSxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQ2pEO0tBQ0Y7SUFFRCx1REFBdUQ7SUFDdkQsUUFBUSxFQUFFLEVBQUU7UUFDVixLQUFLLElBQUksQ0FBQztRQUNWLEtBQUssYUFBYSxDQUFDO1FBQ25CLEtBQUssY0FBYztZQUNqQixPQUFPLE1BQU0sQ0FBQztZQUNkLE1BQU07UUFDUixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxTQUFTO1lBQ1osT0FBTyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE1BQU07UUFDUixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssUUFBUSxDQUFDO1FBQ2QsS0FBSyxTQUFTO1lBQ1osT0FBTyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUMxQixNQUFNO1FBQ1IsS0FBSyxHQUFHLENBQUM7UUFDVCxLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssT0FBTztZQUNWLE9BQU8sTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQy9CLE1BQU07UUFDUixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssS0FBSyxDQUFDO1FBQ1gsS0FBSyxNQUFNO1lBQ1QsT0FBTyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ3BDLE1BQU07UUFDUixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxPQUFPO1lBQ1YsT0FBTyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN4QyxNQUFNO1FBQ1IsS0FBSyxPQUFPLENBQUM7UUFDYixLQUFLLFFBQVE7WUFDWCxPQUFPLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ3pDLE1BQU07UUFDUixLQUFLLEdBQUcsQ0FBQztRQUNULEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxPQUFPO1lBQ1YsT0FBTyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUMxQyxNQUFNO1FBQ1I7WUFDRSxNQUFNLElBQUksS0FBSyxDQUNiLHVCQUF1QixJQUFJLFNBQVMsRUFBRSxzRkFBc0YsQ0FDN0gsQ0FBQztZQUNGLE1BQU07S0FDVDtBQUNILENBQUM7QUFDRCxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUMzQixPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNyQixPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNyQixPQUFPLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNuQixPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNsQixPQUFPLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNuQixPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztBQUN4QixPQUFPLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNuQixrQkFBZSxPQUFPLENBQUMifQ==