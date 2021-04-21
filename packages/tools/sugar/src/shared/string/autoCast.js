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
     * @name        autoCast
     * @namespace            js.string
     * @type      Function
     * @stable
     *
     * Auto cast the string into the correct variable type
     *
     * @param    {String}    string    The string to auto cast
     * @return    {Mixed}    The casted value
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import autoCast from '@coffeekraken/sugar/js/string/autoCast'
     * autoCast('12') // => 12
     * autoCast('window.HTMLElement') // => HTMLElement
     * autoCast('{"hello":"world"}') // {hello:'world'}
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function autoCast(string) {
        // if the passed string is not a string, return the value
        if (typeof string !== 'string')
            return string;
        // handle the single quotes strings like '"hello world"'
        if (string.substr(0, 1) === "'" && string.substr(-1) === "'") {
            return string.substr(1, string.length - 2);
        }
        // number
        // before the window check cause window['0'] correspond to something
        const presumedNumber = parseFloat(string);
        if (!isNaN(presumedNumber)) {
            if (presumedNumber.toString() === string) {
                return presumedNumber;
            }
        }
        // avoid getting item from the window object
        if (window[string]) {
            return string;
        }
        // try to eval the passed string
        // if no exception, mean that it's a valid
        // js variable type
        try {
            const obj = eval(`(${string})`);
            return obj;
        }
        catch (e) {
            // assume that the string passed is a string
            return string;
        }
    }
    exports.default = autoCast;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b0Nhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdXRvQ2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F1Qkc7SUFDSCxTQUFTLFFBQVEsQ0FBQyxNQUFNO1FBQ3RCLHlEQUF5RDtRQUN6RCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUU5Qyx3REFBd0Q7UUFDeEQsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUM1RCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDNUM7UUFFRCxTQUFTO1FBQ1Qsb0VBQW9FO1FBQ3BFLE1BQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzFCLElBQUksY0FBYyxDQUFDLFFBQVEsRUFBRSxLQUFLLE1BQU0sRUFBRTtnQkFDeEMsT0FBTyxjQUFjLENBQUM7YUFDdkI7U0FDRjtRQUVELDRDQUE0QztRQUM1QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNsQixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBRUQsZ0NBQWdDO1FBQ2hDLDBDQUEwQztRQUMxQyxtQkFBbUI7UUFDbkIsSUFBSTtZQUNGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEMsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsNENBQTRDO1lBQzVDLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBQ0Qsa0JBQWUsUUFBUSxDQUFDIn0=