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
        define(["require", "exports", "crypto-js/md5", "../string/toString", "../string/parse"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const md5_1 = __importDefault(require("crypto-js/md5"));
    const toString_1 = __importDefault(require("../string/toString"));
    const parse_1 = __importDefault(require("../string/parse"));
    const __encryptedMessages = {};
    /**
     * @name            md5
     * @namespace            js.crypt
     * @type            Object
     * @status              wip
     *
     * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the md5 algorithm
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
         * @param       {String}      message         The message to encrypt
         * @return      {String}                      The encrypted string
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        encrypt: function (message) {
            if (typeof message !== 'string')
                message = toString_1.default(message);
            const string = md5_1.default(message).toString();
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
         * @return      {String}                        The decrypted message
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWQ1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWQ1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdEQUFnQztJQUNoQyxrRUFBMEM7SUFDMUMsNERBQW9DO0lBRXBDLE1BQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0lBRS9COzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxrQkFBZTtRQUNiOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPO1lBQ3hCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUTtnQkFBRSxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3RCxNQUFNLE1BQU0sR0FBRyxhQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQ3RDLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztZQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLE9BQU8sMEJBQTBCLENBQUMsQ0FBQztnQkFDaEUsT0FBTzthQUNSO1lBQ0QsTUFBTSxNQUFNLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUMsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwQyxPQUFPLGVBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixDQUFDO0tBQ0YsQ0FBQyJ9