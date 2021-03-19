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
        define(["require", "exports", "crypto-js/sha512", "../string/toString", "../string/parse"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const sha512_1 = __importDefault(require("crypto-js/sha512"));
    const toString_1 = __importDefault(require("../string/toString"));
    const parse_1 = __importDefault(require("../string/parse"));
    const __encryptedMessages = {};
    /**
     * @name            sha512
     * @namespace           sugar.js.crypt
     * @type            Object
     * @status              wip
     *
     * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the sha512 algorithm
     *
     * @todo        interface
     * @todo        doc
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.default = {
        /**
         * @name        encrypt
         * @type          Function
         *
         * Encrypt
         *
         * @param       {String}      message         The message to encrypt
         * @return      {String}                      The encrypted string
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        encrypt: function (message) {
            if (typeof message !== 'string')
                message = toString_1.default(message);
            const string = sha512_1.default(message).toString();
            __encryptedMessages[string] = message;
            return string;
        },
        /**
         * @name        decrypt
         * @type        Function
         *
         * Decrypt
         *
         * @param       {String}        message         The message to decrypt
         * @return      {String}                        The decrypted message
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        decrypt: function (message) {
            if (!__encryptedMessages[message]) {
                console.warn(`The message "${message}" cannot be decrypted...`);
                return;
            }
            const string = __encryptedMessages[message];
            delete __encryptedMessages[message];
            return parse_1.default(string);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhNTEyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhNTEyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDhEQUFzQztJQUN0QyxrRUFBMEM7SUFDMUMsNERBQW9DO0lBRXBDLE1BQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0lBRS9COzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxrQkFBZTtRQUNiOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPO1lBQ3hCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUTtnQkFBRSxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3RCxNQUFNLE1BQU0sR0FBRyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUN0QyxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxVQUFVLE9BQU87WUFDeEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixPQUFPLDBCQUEwQixDQUFDLENBQUM7Z0JBQ2hFLE9BQU87YUFDUjtZQUNELE1BQU0sTUFBTSxHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLE9BQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEMsT0FBTyxlQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsQ0FBQztLQUNGLENBQUMifQ==