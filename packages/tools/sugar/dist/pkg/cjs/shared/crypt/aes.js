"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aes_1 = __importDefault(require("crypto-js/aes"));
const enc_utf8_1 = __importDefault(require("crypto-js/enc-utf8"));
const toString_1 = __importDefault(require("../string/toString"));
const parse_1 = __importDefault(require("../string/parse"));
/**
 * @name            aes
 * @namespace            js.crypt
 * @type            Object
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the aes algorithm
 *
 * @todo        interface
 * @todo        doc
 *
 * @since         1.0.0
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
     * @param       {String}       [key='coffeekraken.sugar.crypt.aes']       The secret key to encrypt
     * @return      {String}                       The encrypted message
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    encrypt: function (message, key = 'coffeekraken.sugar.crypt.aes') {
        if (typeof message !== 'string')
            message = (0, toString_1.default)(message);
        return aes_1.default.encrypt(message, key).toString();
    },
    /**
     * @name        decrypt
     * @type        Function
     *
     * Decrypt
     *
     * @param       {String}      message         The message to decrypt
     * @param       {String}      [key='coffeekraken.sugar.crypt.aes']      The secret key to decrypt
     * @return      {String}                      The decrypted message
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    decrypt: function (message, key = 'coffeekraken.sugar.crypt.aes') {
        const value = aes_1.default.decrypt(message, key).toString(enc_utf8_1.default);
        return (0, parse_1.default)(value);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFnQztBQUNoQyxrRUFBc0M7QUFDdEMsa0VBQTBDO0FBQzFDLDREQUFvQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxrQkFBZTtJQUNYOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTyxFQUFFLEdBQUcsR0FBRyw4QkFBOEI7UUFDNUQsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRO1lBQUUsT0FBTyxHQUFHLElBQUEsa0JBQVEsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxPQUFPLGFBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE9BQU8sRUFBRSxVQUFVLE9BQU8sRUFBRSxHQUFHLEdBQUcsOEJBQThCO1FBQzVELE1BQU0sS0FBSyxHQUFHLGFBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxrQkFBSSxDQUFDLENBQUM7UUFDdkQsT0FBTyxJQUFBLGVBQUssRUFBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixDQUFDO0NBQ0osQ0FBQyJ9