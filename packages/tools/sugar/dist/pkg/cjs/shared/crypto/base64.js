"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const atob_1 = __importDefault(require("atob"));
const btoa_1 = __importDefault(require("btoa"));
const parse_1 = __importDefault(require("../string/parse"));
const toString_1 = __importDefault(require("../string/toString"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGdEQUEwQjtBQUMxQixnREFBMEI7QUFDMUIsNERBQW9DO0FBQ3BDLGtFQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsa0JBQWU7SUFDWDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE9BQU8sRUFBRSxVQUFVLE9BQU87UUFDdEIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRO1lBQUUsT0FBTyxHQUFHLElBQUEsa0JBQVEsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxPQUFPLElBQUEsY0FBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE9BQU8sRUFBRSxVQUFVLE9BQU87UUFDdEIsT0FBTyxHQUFHLElBQUEsY0FBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLE9BQU8sSUFBQSxlQUFLLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNKLENBQUMifQ==