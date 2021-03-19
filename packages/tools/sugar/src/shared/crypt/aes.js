// @ts-nocheck
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdEQUFnQztJQUNoQyxrRUFBc0M7SUFDdEMsa0VBQTBDO0lBQzFDLDREQUFvQztJQUVwQzs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsa0JBQWU7UUFDYjs7Ozs7Ozs7Ozs7V0FXRztRQUNILE9BQU8sRUFBRSxVQUFVLE9BQU8sRUFBRSxHQUFHLEdBQUcsOEJBQThCO1lBQzlELElBQUksT0FBTyxPQUFPLEtBQUssUUFBUTtnQkFBRSxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3RCxPQUFPLGFBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlDLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNILE9BQU8sRUFBRSxVQUFVLE9BQU8sRUFBRSxHQUFHLEdBQUcsOEJBQThCO1lBQzlELE1BQU0sS0FBSyxHQUFHLGFBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxrQkFBSSxDQUFDLENBQUM7WUFDdkQsT0FBTyxlQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsQ0FBQztLQUNGLENBQUMifQ==