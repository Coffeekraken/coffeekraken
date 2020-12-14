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
//# sourceMappingURL=module.js.map