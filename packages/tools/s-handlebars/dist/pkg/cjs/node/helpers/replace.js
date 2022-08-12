"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            replace
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to replace a string with another one in the passed string.
 *
 * @param       {String}        str            The string in which to replace the second passed one
 * @param       {String}        replace         The string to replace
 * @param       {String}        with            The string to replace with
 * @return      {String}        The resulting string
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function replace(str, repl, w) {
    console.log('str', str);
    console.log('repl', repl);
    console.log('w', w);
    const res = str.replace(repl, w);
    console.log('res', res);
    return res;
}
exports.default = replace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBd0IsT0FBTyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsQ0FBUztJQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN4QixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFQRCwwQkFPQyJ9