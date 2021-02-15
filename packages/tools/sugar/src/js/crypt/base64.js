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
    Object.defineProperty(exports, "__esModule", { value: true });
    var toString_1 = __importDefault(require("../string/toString"));
    var parse_1 = __importDefault(require("../string/parse"));
    /**
     * @name            base64
     * @namespace           sugar.js.crypt
     * @type            Object
     * @status              wip
     *
     * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the base64 algorithm
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZTY0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFHVixnRUFBMEM7SUFDMUMsMERBQW9DO0lBRXBDOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxrQkFBZTtRQUNiOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztZQUN4QixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7Z0JBQUUsT0FBTyxHQUFHLGtCQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztZQUN4QixPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sZUFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hCLENBQUM7S0FDRixDQUFDIn0=