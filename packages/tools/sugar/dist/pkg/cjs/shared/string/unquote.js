"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        unquote
 * @namespace            js.string
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
 * import unquote from '@coffeekraken/sugar/js/string/unquote'
 * unquote("'Hello world'") // "Hello world"
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function unquote(string, quotesToRemove = ['"', "'", '”', '`']) {
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
exports.default = unquote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxjQUFjLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDMUQsK0JBQStCO0lBQy9CLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsZ0NBQWdDO0lBQ2hDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM3QixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFO1lBQzlELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdDLG9EQUFvRDtZQUNwRCxPQUFPO1NBQ1Y7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILDhCQUE4QjtJQUM5QixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=