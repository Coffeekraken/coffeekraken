// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "crypto-js/aes", "crypto-js/enc-utf8", "../string/toString", "../string/parse"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVix3REFBZ0M7SUFDaEMsa0VBQXNDO0lBQ3RDLGtFQUEwQztJQUMxQyw0REFBb0M7SUFFcEM7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILGtCQUFlO1FBQ2I7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPLEVBQUUsR0FBRyxHQUFHLDhCQUE4QjtZQUM5RCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7Z0JBQUUsT0FBTyxHQUFHLGtCQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0QsT0FBTyxhQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPLEVBQUUsR0FBRyxHQUFHLDhCQUE4QjtZQUM5RCxNQUFNLEtBQUssR0FBRyxhQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsa0JBQUksQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sZUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLENBQUM7S0FDRixDQUFDIn0=