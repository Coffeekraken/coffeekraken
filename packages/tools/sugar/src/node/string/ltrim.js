"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        ltrim
 * @namespace           sugar.js.string
 * @type      Function
 * @stable
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHRyaW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsdHJpbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7O0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEdBQUcsSUFBSTtJQUM5QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxNQUFNLEVBQUU7UUFDOUMsT0FBTyxVQUFVO1lBQ2YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRTtZQUNyQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbEM7SUFDRCxrQkFBa0I7SUFDbEIsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUNELGtCQUFlLEtBQUssQ0FBQyJ9