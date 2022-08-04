"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
/**
 * @name            configValue
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
function configValue(value) {
    if (typeof value !== 'string')
        return value;
    return value.replace(`${(0, packageRoot_1.default)()}/`, '');
}
exports.default = configValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXNFO0FBRXRFOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILFNBQXdCLFdBQVcsQ0FBQyxLQUFhO0lBQzdDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzVDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUEscUJBQWEsR0FBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUhELDhCQUdDIn0=