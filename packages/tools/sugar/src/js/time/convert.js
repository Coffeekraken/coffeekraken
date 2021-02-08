// @ts-nocheck
// @shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @name                                  convert
     * @namespace           sugar.js.time
     * @type                                  Function
     * @stable
     *
     * This function allows you to convert time like seconds, ms, hours, minutes, etc... from one format to another
     *
     * @param           {String|Number}             from                  The value to start from like "10s", "20ms", "2h", etc...
     * @param           {String}                    [to='ms']             The format you want to get back
     * @return          {Number}                                          The converted value
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
    function convert(from, to) {
        if (to === void 0) { to = 'ms'; }
        // init the fromMs variable
        var fromMs = from;
        // check if the time is a string to convert it to ms
        if (typeof from === 'string') {
            var fromNumber = parseFloat(from);
            var fromLength = fromNumber.toString().length;
            var fromString = from.slice(fromLength);
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
                throw new Error("You try to convert \"" + from + "\" to \"" + to + "\" but this format does not exist... The valids formats are \"ms,s,m,h,d,w,month,y\"...");
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
    return convert;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBUztRQUFULG1CQUFBLEVBQUEsU0FBUztRQUM5QiwyQkFBMkI7UUFDM0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRWxCLG9EQUFvRDtRQUNwRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsSUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNoRCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTFDLElBQ0UsVUFBVSxLQUFLLElBQUk7Z0JBQ25CLFVBQVUsS0FBSyxhQUFhO2dCQUM1QixVQUFVLEtBQUssY0FBYyxFQUM3QjtnQkFDQSxNQUFNLEdBQUcsVUFBVSxDQUFDO2FBQ3JCO2lCQUFNLElBQ0wsVUFBVSxLQUFLLEdBQUc7Z0JBQ2xCLFVBQVUsS0FBSyxRQUFRO2dCQUN2QixVQUFVLEtBQUssU0FBUyxFQUN4QjtnQkFDQSxNQUFNLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQzthQUM1QjtpQkFBTSxJQUNMLFVBQVUsS0FBSyxHQUFHO2dCQUNsQixVQUFVLEtBQUssUUFBUTtnQkFDdkIsVUFBVSxLQUFLLFNBQVMsRUFDeEI7Z0JBQ0EsTUFBTSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO2FBQ2pDO2lCQUFNLElBQ0wsVUFBVSxLQUFLLEdBQUc7Z0JBQ2xCLFVBQVUsS0FBSyxNQUFNO2dCQUNyQixVQUFVLEtBQUssT0FBTyxFQUN0QjtnQkFD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