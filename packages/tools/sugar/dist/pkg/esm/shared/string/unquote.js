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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FDN0IsTUFBTSxFQUNOLGNBQWMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUVyQywrQkFBK0I7SUFDL0IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixnQ0FBZ0M7SUFDaEMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQzdCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7WUFDOUQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0Msb0RBQW9EO1lBQ3BELE9BQU87U0FDVjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsOEJBQThCO0lBQzlCLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMifQ==