// @ts-nocheck
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
export default ltrim;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxHQUFHLElBQUk7SUFDNUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssTUFBTSxFQUFFO1FBQzVDLE9BQU8sVUFBVTtZQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDckMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3RDO0lBQ0Qsa0JBQWtCO0lBQ2xCLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFDRCxlQUFlLEtBQUssQ0FBQyJ9