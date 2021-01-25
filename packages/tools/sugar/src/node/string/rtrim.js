"use strict";
// @ts-nocheck
// @shared
/**
 * @name        rtrim
 * @namespace           sugar.js.string
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
module.exports = rtrim;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnRyaW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydHJpbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsR0FBRyxJQUFJO0lBQzlDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO1FBQ2hELElBQUksVUFBVSxFQUFFO1lBQ2QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMvRDthQUFNO1lBQ0wsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4RDtLQUNGO0lBQ0Qsa0JBQWtCO0lBQ2xCLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxpQkFBUyxLQUFLLENBQUMifQ==