"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_js_1 = __importDefault(require("../../shared/string/toString.js"));
const enc_base64_js_1 = __importDefault(require("crypto-js/enc-base64.js"));
const enc_utf8_js_1 = __importDefault(require("crypto-js/enc-utf8.js"));
/**
 * @name            base64
 * @namespace            js.crypto
 * @type            Object
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the base64 algorithm
 *
 * @snippet         __base64.encrypt($1)
 *
 * @example         js
 * import { __base64 } from '@coffeekraken/sugar/crypto';
 * __base64.encrypt('hello world');
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
            message = (0, toString_js_1.default)(message);
        const encodedWord = enc_utf8_js_1.default.parse(message); // encodedWord Array object
        const encoded = enc_base64_js_1.default.stringify(encodedWord); // string: 'NzUzMjI1NDE='
        return encoded;
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
        const encodedWord = enc_base64_js_1.default.parse(message); // encodedWord via Base64.parse()
        const decoded = enc_utf8_js_1.default.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
        return decoded;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUF1RDtBQUV2RCw0RUFBK0M7QUFDL0Msd0VBQTJDO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxrQkFBZTtJQUNYOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztRQUN0QixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7WUFBRSxPQUFPLEdBQUcsSUFBQSxxQkFBUSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdELE1BQU0sV0FBVyxHQUFHLHFCQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsMkJBQTJCO1FBQ3RFLE1BQU0sT0FBTyxHQUFHLHVCQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMseUJBQXlCO1FBQzFFLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE9BQU8sRUFBRSxVQUFVLE9BQU87UUFDdEIsTUFBTSxXQUFXLEdBQUcsdUJBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxpQ0FBaUM7UUFDOUUsTUFBTSxPQUFPLEdBQUcscUJBQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxxREFBcUQ7UUFDcEcsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztDQUNKLENBQUMifQ==