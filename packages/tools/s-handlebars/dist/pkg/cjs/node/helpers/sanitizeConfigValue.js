"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
/**
 * @name            sanitizeConfigValue
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to "sanitize" some configuration values makes absolute paths to relative, etc...
 *
 * @param       {Any}        value            The value to sanitize
 * @return      {Any}                           The sanitized value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function sanitizeConfigValue(value) {
    if (typeof value !== 'string')
        return value;
    return value.replace(`${(0, packageRoot_1.default)()}/`, '');
}
exports.default = sanitizeConfigValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXNFO0FBRXRFOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILFNBQXdCLG1CQUFtQixDQUFDLEtBQWE7SUFDckQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDNUMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBQSxxQkFBYSxHQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBSEQsc0NBR0MifQ==