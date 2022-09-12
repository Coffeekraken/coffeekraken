"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("@coffeekraken/sugar/path");
/**
 * @name            formatConfigValue
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to "format" some configuration values makes absolute paths to relative, etc...
 *
 * @param       {Any}        value            The value to sanitize
 * @return      {Any}                           The sanitized value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function formatConfigValue(value) {
    if (typeof value !== 'string')
        return value;
    return value.replace(`${(0, path_1.__packageRootDir)()}/`, '');
}
exports.default = formatConfigValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQTREO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILFNBQXdCLGlCQUFpQixDQUFDLEtBQWE7SUFDbkQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDNUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUhELG9DQUdDIn0=