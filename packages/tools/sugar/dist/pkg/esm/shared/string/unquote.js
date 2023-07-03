// @ts-nocheck
/**
 * @name        unquote
 * @namespace            shared.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Remove the quotes of a string
 * Types of quotes removed :
 * - `"`, `'`, `”`, '`'
 *
 * @param    {String}    string    The string to process
 * @param    {Array<String>}    [quotesToRemove=['"','\'','”','`']]    The quotes to removes
 * @return    {String}    The unquoted string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __unquote($1)
 *
 * @example    js
 * import { __unquote } from '@coffeekraken/sugar/string'
 * __unquote("'Hello world'") // "Hello world"
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __unquote(string, quotesToRemove = ['"', "'", '”', '`']) {
    // trim the string just in case
    string = string.trim();
    // loop on each quotes to remove
    quotesToRemove.forEach((quote) => {
        if (string.substr(0, 1) === quote && string.substr(-1) === quote) {
            string = string.substr(1);
            string = string.substr(0, string.length - 1);
            // break the loop to avoid unquoting multiple levels
            return;
        }
    });
    // return the processed string
    return string;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUM3QixNQUFNLEVBQ04sY0FBYyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBRXJDLCtCQUErQjtJQUMvQixNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLGdDQUFnQztJQUNoQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDN0IsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUM5RCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3QyxvREFBb0Q7WUFDcEQsT0FBTztTQUNWO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCw4QkFBOEI7SUFDOUIsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyJ9