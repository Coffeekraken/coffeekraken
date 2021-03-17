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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = convert;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvdGltZS9jb252ZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFTO1FBQVQsbUJBQUEsRUFBQSxTQUFTO1FBQzlCLDJCQUEyQjtRQUMzQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbEIsb0RBQW9EO1FBQ3BELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzVCLElBQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxJQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2hELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFMUMsSUFDRSxVQUFVLEtBQUssSUFBSTtnQkFDbkIsVUFBVSxLQUFLLGFBQWE7Z0JBQzVCLFVBQVUsS0FBSyxjQUFjLEVBQzdCO2dCQUNBLE1BQU0sR0FBRyxVQUFVLENBQUM7YUFDckI7aUJBQU0sSUFDTCxVQUFVLEtBQUssR0FBRztnQkFDbEIsVUFBVSxLQUFLLFFBQVE7Z0JBQ3ZCLFVBQVUsS0FBSyxTQUFTLEVBQ3hCO2dCQUNBLE1BQU0sR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDO2FBQzVCO2lCQUFNLElBQ0wsVUFBVSxLQUFLLEdBQUc7Z0JBQ2xCLFVBQVUsS0FBSyxRQUFRO2dCQUN2QixVQUFVLEtBQUssU0FBUyxFQUN4QjtnQkFDQSxNQUFNLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7YUFDakM7aUJBQU0sSUFDTCxVQUFVLEtBQUssR0FBRztnQkFDbEIsVUFBVSxLQUFLLE1BQU07Z0JBQ3JC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