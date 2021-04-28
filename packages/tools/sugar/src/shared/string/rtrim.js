// @ts-nocheck
/**
 * @name        rtrim
 * @namespace            js.string
 * @type      Function
 * @stable
 *
 * Trim right a specified string
 *
 * @param    {String}    string    The string to trim
 * @param    {String}    needle    The string to find an cut out if found
 * @param     {Boolean}     [trimResult=true]       Specify if you want to trim the trimed string
 * @return    {String}    The trimed string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import rtrim from '@coffeekraken/sugar/js/string/rtrim'
 * rtrim('Hello World', 'ld') // Hello Wor
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function rtrim(string, needle, trimResult = true) {
    if (string.substr(needle.length * -1) === needle) {
        if (trimResult) {
            return string.substr(0, string.length - needle.length).trim();
        }
        else {
            return string.substr(0, string.length - needle.length);
        }
    }
    // nothing to trim
    return string;
}
export default rtrim;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnRyaW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydHJpbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEdBQUcsSUFBSTtJQUM5QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTtRQUNoRCxJQUFJLFVBQVUsRUFBRTtZQUNkLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDL0Q7YUFBTTtZQUNMLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEQ7S0FDRjtJQUNELGtCQUFrQjtJQUNsQixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxLQUFLLENBQUMifQ==