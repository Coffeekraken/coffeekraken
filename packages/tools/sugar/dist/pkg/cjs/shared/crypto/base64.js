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
 * @namespace            shared.crypto
 * @type            Object
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the base64 algorithm
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGdEQUEwQjtBQUMxQixnREFBMEI7QUFDMUIsNERBQW9DO0FBQ3BDLGtFQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILGtCQUFlO0lBQ1g7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPO1FBQ3RCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUTtZQUFFLE9BQU8sR0FBRyxJQUFBLGtCQUFRLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0QsT0FBTyxJQUFBLGNBQU0sRUFBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPO1FBQ3RCLE9BQU8sR0FBRyxJQUFBLGNBQU0sRUFBQyxPQUFPLENBQUMsQ0FBQztRQUMxQixPQUFPLElBQUEsZUFBSyxFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FDSixDQUFDIn0=