// @ts-nocheck
/**
 * @name                                  convert
 * @namespace            shared.datetime
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
 * @snippet         __convertTime($1, $2)
 *
 * @example           js
 * import { __convertTime } from '@coffeekraken/sugar/datetime';
 * __convertTime('10s', 'ms'); // => 10000
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __convertTime(from, to = 'ms') {
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
__convertTime.MILLISECOND = 'ms';
__convertTime.SECOND = 's';
__convertTime.MINUTE = 'm';
__convertTime.HOUR = 'h';
__convertTime.DAY = 'd';
__convertTime.WEEK = 'w';
__convertTime.MONTH = 'month';
__convertTime.YEAR = 'y';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFDakQsMkJBQTJCO0lBQzNCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztJQUVsQixvREFBb0Q7SUFDcEQsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDMUIsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDaEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUxQyxJQUNJLFVBQVUsS0FBSyxJQUFJO1lBQ25CLFVBQVUsS0FBSyxhQUFhO1lBQzVCLFVBQVUsS0FBSyxjQUFjLEVBQy9CO1lBQ0UsTUFBTSxHQUFHLFVBQVUsQ0FBQztTQUN2QjthQUFNLElBQ0gsVUFBVSxLQUFLLEdBQUc7WUFDbEIsVUFBVSxLQUFLLFFBQVE7WUFDdkIsVUFBVSxLQUFLLFNBQVMsRUFDMUI7WUFDRSxNQUFNLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQztTQUM5QjthQUFNLElBQ0gsVUFBVSxLQUFLLEdBQUc7WUFDbEIsVUFBVSxLQUFLLFFBQVE7WUFDdkIsVUFBVSxLQUFLLFNBQVMsRUFDMUI7WUFDRSxNQUFNLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDbkM7YUFBTSxJQUNILFVBQVUsS0FBSyxHQUFHO1lBQ2xCLFVBQVUsS0FBSyxNQUFNO1lBQ3JCLFVBQVUsS0FBSyxPQUFPLEVBQ3hCO1lBQ0UsTUFBTSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdB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