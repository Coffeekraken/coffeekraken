// @ts-nocheck
/**
 * @name        rtrim
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnRyaW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJydHJpbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsR0FBRyxJQUFJO0lBQzVDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO1FBQzlDLElBQUksVUFBVSxFQUFFO1lBQ1osT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNqRTthQUFNO1lBQ0gsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxRDtLQUNKO0lBQ0Qsa0JBQWtCO0lBQ2xCLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFDRCxlQUFlLEtBQUssQ0FBQyJ9