"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        ltrim
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Trim left a specified string
 *
 * @param    {String}    string    The string to trim
 * @param    {String}    needle    The string to find an cut out if found
 * @param    {Boolean}  [trimResult=true]       If you want to trim the resulted ltrim
 * @return    {String}    The trimed string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import ltrim from '@coffeekraken/sugar/js/string/ltrim'
 * ltrim('Hello World', 'Hello') // World
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function ltrim(string, needle, trimResult = true) {
    if (string.substr(0, needle.length) === needle) {
        return trimResult
            ? string.substr(needle.length).trim()
            : string.substr(needle.length);
    }
    // nothing to trim
    return string;
}
exports.default = ltrim;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEdBQUcsSUFBSTtJQUM1QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxNQUFNLEVBQUU7UUFDNUMsT0FBTyxVQUFVO1lBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRTtZQUNyQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdEM7SUFDRCxrQkFBa0I7SUFDbEIsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUNELGtCQUFlLEtBQUssQ0FBQyJ9