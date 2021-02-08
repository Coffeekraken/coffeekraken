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
    var object_encode_1 = __importDefault(require("object-encode"));
    return {
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
        encrypt: function (object, salt) {
            if (salt === void 0) { salt = 'coffeekraken.sugar.crypt.object'; }
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
        decrypt: function (encodedObject, salt) {
            if (salt === void 0) { salt = 'coffeekraken.sugar.crypt.object'; }
            return object_encode_1.default.decode_object(encodedObject, 'base64', salt);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7OztJQUVWLGdFQUEyQztJQWdCM0MsT0FBUztRQUNQOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsT0FBTyxFQUFFLFVBQVUsTUFBTSxFQUFFLElBQXdDO1lBQXhDLHFCQUFBLEVBQUEsd0NBQXdDO1lBQ2pFLE9BQU8sdUJBQWMsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxPQUFPLEVBQUUsVUFBVSxhQUFhLEVBQUUsSUFBd0M7WUFBeEMscUJBQUEsRUFBQSx3Q0FBd0M7WUFDeEUsT0FBTyx1QkFBYyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JFLENBQUM7S0FDRixDQUFDIn0=