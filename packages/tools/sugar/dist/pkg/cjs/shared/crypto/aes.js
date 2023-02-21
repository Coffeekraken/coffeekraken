"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aes_1 = __importDefault(require("crypto-js/aes"));
const enc_utf8_1 = __importDefault(require("crypto-js/enc-utf8"));
const parse_1 = __importDefault(require("../string/parse"));
const toString_1 = __importDefault(require("../string/toString"));
/**
 * @name            aes
 * @namespace            shared.crypto
 * @type            Object
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the aes algorithm
 *
 * @example         js
 * import { __aes } from '@coffeekraken/sugar/crypto';
 * __aes.encrypt('hello world');
 *
 * @todo        interface
 * @todo        doc
 *
 @since           2.0.0
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
     * @param       {String}       [key='coffeekraken.sugar.crypto.aes']       The secret key to encrypt
     * @return      {String}                       The encrypted message
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    encrypt: function (message, key = 'coffeekraken.sugar.crypto.aes') {
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
     * @param       {String}      [key='coffeekraken.sugar.crypto.aes']      The secret key to decrypt
     * @return      {String}                      The decrypted message
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    decrypt: function (message, key = 'coffeekraken.sugar.crypto.aes') {
        const value = aes_1.default.decrypt(message, key).toString(enc_utf8_1.default);
        return (0, parse_1.default)(value);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFnQztBQUNoQyxrRUFBc0M7QUFDdEMsNERBQW9DO0FBQ3BDLGtFQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILGtCQUFlO0lBQ1g7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPLEVBQUUsR0FBRyxHQUFHLCtCQUErQjtRQUM3RCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7WUFBRSxPQUFPLEdBQUcsSUFBQSxrQkFBUSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELE9BQU8sYUFBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTyxFQUFFLEdBQUcsR0FBRywrQkFBK0I7UUFDN0QsTUFBTSxLQUFLLEdBQUcsYUFBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGtCQUFJLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUEsZUFBSyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7Q0FDSixDQUFDIn0=