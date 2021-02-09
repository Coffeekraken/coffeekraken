"use strict";
// @ts-nocheck
// @shared
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
 * @namespace           sugar.js.crypt
 * @type            Object
 * @status              wip
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the aes algorithm
 *
 * @todo        interface
 * @todo        doc
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = {
    /**
     * @name        encrypt
     * @type        Function
     *
     * Encrypt
     *
     * @param       {String}       message        The message to encrypt
     * @param       {String}       [key='coffeekraken.sugar.crypt.aes']       The secret key to encrypt
     * @return      {String}                       The encrypted message
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    encrypt: function (message, key = 'coffeekraken.sugar.crypt.aes') {
        if (typeof message !== 'string')
            message = toString_1.default(message);
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    decrypt: function (message, key = 'coffeekraken.sugar.crypt.aes') {
        const value = aes_1.default.decrypt(message, key).toString(enc_utf8_1.default);
        return parse_1.default(value);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFVix3REFBZ0M7QUFDaEMsa0VBQXNDO0FBQ3RDLGtFQUEwQztBQUMxQyw0REFBb0M7QUFFcEM7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILGtCQUFlO0lBQ2I7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPLEVBQUUsR0FBRyxHQUFHLDhCQUE4QjtRQUM5RCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7WUFBRSxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxPQUFPLGFBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE9BQU8sRUFBRSxVQUFVLE9BQU8sRUFBRSxHQUFHLEdBQUcsOEJBQThCO1FBQzlELE1BQU0sS0FBSyxHQUFHLGFBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxrQkFBSSxDQUFDLENBQUM7UUFDdkQsT0FBTyxlQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEIsQ0FBQztDQUNGLENBQUMifQ==