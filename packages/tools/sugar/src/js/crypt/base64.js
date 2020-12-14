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
        define(["require", "exports", "../string/toString", "../string/parse"], factory);
    }
})(function (require, exports) {
    "use strict";
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
         * @return      {String}                       The encrypted message
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        encrypt: function (message) {
            if (typeof message !== 'string')
                message = toString_1.default(message);
            return btoa(message);
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        decrypt: function (message) {
            message = atob(message);
            return parse_1.default(message);
        }
    };
});
//# sourceMappingURL=module.js.map