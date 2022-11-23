"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        autoCast
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * import { __autoCast } from '@coffeekraken/sugar/string'
 * __autoCast('12') // => 12
 * __autoCast('window.HTMLElement') // => HTMLElement
 * __autoCast('{"hello":"world"}') // {hello:'world'}
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    try {
        if (window[string]) {
            return string;
        }
    }
    catch (e) { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxRQUFRLENBQUMsTUFBTTtJQUNwQix5REFBeUQ7SUFDekQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFFOUMsd0RBQXdEO0lBQ3hELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDMUQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzlDO0lBRUQsU0FBUztJQUNULG9FQUFvRTtJQUNwRSxNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUN4QixJQUFJLGNBQWMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxNQUFNLEVBQUU7WUFDdEMsT0FBTyxjQUFjLENBQUM7U0FDekI7S0FDSjtJQUVELDRDQUE0QztJQUM1QyxJQUFJO1FBQ0EsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDaEIsT0FBTyxNQUFNLENBQUM7U0FDakI7S0FDSjtJQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7SUFFZCxnQ0FBZ0M7SUFDaEMsMENBQTBDO0lBQzFDLG1CQUFtQjtJQUNuQixJQUFJO1FBQ0EsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQyxPQUFPLEdBQUcsQ0FBQztLQUNkO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUiw0Q0FBNEM7UUFDNUMsT0FBTyxNQUFNLENBQUM7S0FDakI7QUFDTCxDQUFDO0FBQ0Qsa0JBQWUsUUFBUSxDQUFDIn0=