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
        define(["require", "exports", "crypto-js/sha256", "../string/toString", "../string/parse"], factory);
    }
})(function (require, exports) {
    "use strict";
    var sha256_1 = __importDefault(require("crypto-js/sha256"));
    var toString_1 = __importDefault(require("../string/toString"));
    var parse_1 = __importDefault(require("../string/parse"));
    var __encryptedMessages = {};
    return {
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
            var string = sha256_1.default(message).toString();
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
                console.warn("The message \"" + message + "\" cannot be decrypted...");
                return;
            }
            var string = __encryptedMessages[message];
            delete __encryptedMessages[message];
            return parse_1.default(string);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhMjU2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhMjU2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7OztJQUVWLDREQUFzQztJQUN0QyxnRUFBMEM7SUFDMUMsMERBQW9DO0lBRXBDLElBQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0lBZ0IvQixPQUFTO1FBQ1A7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxVQUFVLE9BQU87WUFDeEIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRO2dCQUFFLE9BQU8sR0FBRyxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdELElBQU0sTUFBTSxHQUFHLGdCQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDMUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQ3RDLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztZQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQWdCLE9BQU8sOEJBQTBCLENBQUMsQ0FBQztnQkFDaEUsT0FBTzthQUNSO1lBQ0QsSUFBTSxNQUFNLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUMsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwQyxPQUFPLGVBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixDQUFDO0tBQ0YsQ0FBQyJ9