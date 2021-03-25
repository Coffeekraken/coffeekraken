// @ts-nocheck
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnZlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLElBQUk7UUFDOUIsMkJBQTJCO1FBQzNCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUVsQixvREFBb0Q7UUFDcEQsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUIsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDaEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUUxQyxJQUNFLFVBQVUsS0FBSyxJQUFJO2dCQUNuQixVQUFVLEtBQUssYUFBYTtnQkFDNUIsVUFBVSxLQUFLLGNBQWMsRUFDN0I7Z0JBQ0EsTUFBTSxHQUFHLFVBQVUsQ0FBQzthQUNyQjtpQkFBTSxJQUNMLFVBQVUsS0FBSyxHQUFHO2dCQUNsQixVQUFVLEtBQUssUUFBUTtnQkFDdkIsVUFBVSxLQUFLLFNBQVMsRUFDeEI7Z0JBQ0EsTUFBTSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUM7YUFDNUI7aUJBQU0sSUFDTCxVQUFVLEtBQUssR0FBRztnQkFDbEIsVUFBVSxLQUFLLFFBQVE7Z0JBQ3ZCLFVBQVUsS0FBSyxTQUFTLEVBQ3hCO2dCQUNBLE1BQU0sR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQzthQUNqQztpQkFBTSxJQUNMLFVBQVUsS0FBSyxHQUFHO2dCQUNsQixVQUFVLEtBQUssTUFBTTtnQkFDckIsVUFBVSxLQUFLLE9BQU8sRUFDdEI7Z0JBQ0EsTUFBTSxHQUFHLFVBQVUsR0FB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