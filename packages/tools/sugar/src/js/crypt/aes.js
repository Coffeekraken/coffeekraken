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
    var aes_1 = __importDefault(require("crypto-js/aes"));
    var enc_utf8_1 = __importDefault(require("crypto-js/enc-utf8"));
    var toString_1 = __importDefault(require("../string/toString"));
    var parse_1 = __importDefault(require("../string/parse"));
    return {
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
        encrypt: function (message, key) {
            if (key === void 0) { key = 'coffeekraken.sugar.crypt.aes'; }
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
        decrypt: function (message, key) {
            if (key === void 0) { key = 'coffeekraken.sugar.crypt.aes'; }
            var value = aes_1.default.decrypt(message, key).toString(enc_utf8_1.default);
            return parse_1.default(value);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7OztJQUVWLHNEQUFnQztJQUNoQyxnRUFBc0M7SUFDdEMsZ0VBQTBDO0lBQzFDLDBEQUFvQztJQWdCcEMsT0FBUztRQUNQOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTyxFQUFFLEdBQW9DO1lBQXBDLG9CQUFBLEVBQUEsb0NBQW9DO1lBQzlELElBQUksT0FBTyxPQUFPLEtBQUssUUFBUTtnQkFBRSxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3RCxPQUFPLGFBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlDLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNILE9BQU8sRUFBRSxVQUFVLE9BQU8sRUFBRSxHQUFvQztZQUFwQyxvQkFBQSxFQUFBLG9DQUFvQztZQUM5RCxJQUFNLEtBQUssR0FBRyxhQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsa0JBQUksQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sZUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLENBQUM7S0FDRixDQUFDIn0=