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
        define(["require", "exports", "object-encode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const object_encode_1 = __importDefault(require("object-encode"));
    /**
     * @name            object
     * @namespace           sugar.js.crypt
     * @type            Object
     * @status              wip
     *
     * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the object algorithm
     *
     * @todo        interface
     * @todo        doc
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.default = {
        /**
         * @name        encrypt
         * @type        Function
         *
         * Encrypt
         *
         * @param       {Object}       object         The object to encrypt
         * @param       {String}       [salt="coffeekraken.sugar.crypt.object"]   The salt to encode the object. Needed to decode correctly the object
         * @return      {String}                       The encrypted object
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        encrypt: function (object, salt = 'coffeekraken.sugar.crypt.object') {
            return object_encode_1.default.encode_object(object, 'base64', salt);
        },
        /**
         * @name        decrypt
         * @type        Function
         *
         * Decrypt
         *
         * @param       {String}      encodedObject          The object to decrypt
         * @param       {String}      [salt='coffeekraken.sugar.crypt.object']        The salt to decode the object
         * @return      {Object}                      The decrypted object
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        decrypt: function (encodedObject, salt = 'coffeekraken.sugar.crypt.object') {
            return object_encode_1.default.decode_object(encodedObject, 'base64', salt);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixrRUFBMkM7SUFFM0M7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILGtCQUFlO1FBQ2I7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxPQUFPLEVBQUUsVUFBVSxNQUFNLEVBQUUsSUFBSSxHQUFHLGlDQUFpQztZQUNqRSxPQUFPLHVCQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsT0FBTyxFQUFFLFVBQVUsYUFBYSxFQUFFLElBQUksR0FBRyxpQ0FBaUM7WUFDeEUsT0FBTyx1QkFBYyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JFLENBQUM7S0FDRixDQUFDIn0=