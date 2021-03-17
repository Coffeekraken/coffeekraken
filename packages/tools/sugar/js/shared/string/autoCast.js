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
     * @name        autoCast
     * @namespace           sugar.js.string
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
        var presumedNumber = parseFloat(string);
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
            var obj = eval("(" + string + ")");
            return obj;
        }
        catch (e) {
            // assume that the string passed is a string
            return string;
        }
    }
    exports.default = autoCast;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b0Nhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL3N0cmluZy9hdXRvQ2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsU0FBUyxRQUFRLENBQUMsTUFBTTtRQUN0Qix5REFBeUQ7UUFDekQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1lBQUUsT0FBTyxNQUFNLENBQUM7UUFFOUMsd0RBQXdEO1FBQ3hELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDNUQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsU0FBUztRQUNULG9FQUFvRTtRQUNwRSxJQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUMxQixJQUFJLGNBQWMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxNQUFNLEVBQUU7Z0JBQ3hDLE9BQU8sY0FBYyxDQUFDO2FBQ3ZCO1NBQ0Y7UUFFRCw0Q0FBNEM7UUFDNUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEIsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELGdDQUFnQztRQUNoQywwQ0FBMEM7UUFDMUMsbUJBQW1CO1FBQ25CLElBQUk7WUFDRixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBSSxNQUFNLE1BQUcsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLDRDQUE0QztZQUM1QyxPQUFPLE1BQU0sQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQUNELGtCQUFlLFFBQVEsQ0FBQyJ9