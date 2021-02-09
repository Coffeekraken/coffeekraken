"use strict";
// @ts-nocheck
// @shared
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b0Nhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdXRvQ2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7O0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxRQUFRLENBQUMsTUFBTTtJQUN0Qix5REFBeUQ7SUFDekQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFFOUMsd0RBQXdEO0lBQ3hELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDNUQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzVDO0lBRUQsU0FBUztJQUNULG9FQUFvRTtJQUNwRSxNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUMxQixJQUFJLGNBQWMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxNQUFNLEVBQUU7WUFDeEMsT0FBTyxjQUFjLENBQUM7U0FDdkI7S0FDRjtJQUVELDRDQUE0QztJQUM1QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNsQixPQUFPLE1BQU0sQ0FBQztLQUNmO0lBRUQsZ0NBQWdDO0lBQ2hDLDBDQUEwQztJQUMxQyxtQkFBbUI7SUFDbkIsSUFBSTtRQUNGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUM7S0FDWjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsNENBQTRDO1FBQzVDLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7QUFDSCxDQUFDO0FBQ0Qsa0JBQWUsUUFBUSxDQUFDIn0=