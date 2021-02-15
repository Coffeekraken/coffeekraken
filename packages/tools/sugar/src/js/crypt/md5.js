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
        define(["require", "exports", "crypto-js/md5", "../string/toString", "../string/parse"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var md5_1 = __importDefault(require("crypto-js/md5"));
    var toString_1 = __importDefault(require("../string/toString"));
    var parse_1 = __importDefault(require("../string/parse"));
    var __encryptedMessages = {};
    /**
     * @name            md5
     * @namespace           sugar.js.crypt
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
    var api = {
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
            var string = md5_1.default(message).toString();
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
    md5_1.default.encrypt = api.encrypt;
    md5_1.default.decrypt = api.decrypt;
    exports.default = md5_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWQ1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWQ1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixzREFBZ0M7SUFDaEMsZ0VBQTBDO0lBQzFDLDBEQUFvQztJQUVwQyxJQUFNLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztJQUUvQjs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsSUFBTSxHQUFHLEdBQUc7UUFDVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztZQUN4QixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7Z0JBQUUsT0FBTyxHQUFHLGtCQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0QsSUFBTSxNQUFNLEdBQUcsYUFBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUN0QyxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxVQUFVLE9BQU87WUFDeEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFnQixPQUFPLDhCQUEwQixDQUFDLENBQUM7Z0JBQ2hFLE9BQU87YUFDUjtZQUNELElBQU0sTUFBTSxHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLE9BQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEMsT0FBTyxlQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsQ0FBQztLQUNGLENBQUM7SUFDRixhQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDMUIsYUFBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQzFCLGtCQUFlLGFBQUcsQ0FBQyJ9