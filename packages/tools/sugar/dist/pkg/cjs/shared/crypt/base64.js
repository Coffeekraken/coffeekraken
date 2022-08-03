"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_1 = __importDefault(require("../string/toString"));
const parse_1 = __importDefault(require("../string/parse"));
const btoa_1 = __importDefault(require("btoa"));
const atob_1 = __importDefault(require("atob"));
/**
 * @name            base64
 * @namespace            js.crypt
 * @type            Object
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the base64 algorithm
 *
 * @todo        interface
 * @todo        doc
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = {
    /**
     * @name        encrypt
     * @type        Function
     *
     * Encrypt
     *
     * @param       {String}       message        The message to encrypt
     * @return      {String}                       The encrypted message
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    encrypt: function (message) {
        if (typeof message !== 'string')
            message = (0, toString_1.default)(message);
        return (0, btoa_1.default)(message);
    },
    /**
     * @name        decrypt
     * @type        Function
     *
     * Decrypt
     *
     * @param       {String}      message         The message to decrypt
     * @return      {String}                      The decrypted message
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    decrypt: function (message) {
        message = (0, atob_1.default)(message);
        return (0, parse_1.default)(message);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUdkLGtFQUEwQztBQUMxQyw0REFBb0M7QUFDcEMsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUUxQjs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxrQkFBZTtJQUNYOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztRQUN0QixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7WUFBRSxPQUFPLEdBQUcsSUFBQSxrQkFBUSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELE9BQU8sSUFBQSxjQUFNLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztRQUN0QixPQUFPLEdBQUcsSUFBQSxjQUFNLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFBLGVBQUssRUFBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0osQ0FBQyJ9