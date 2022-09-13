"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_encode_1 = __importDefault(require("object-encode"));
/**
 * @name            object
 * @namespace            shared.crypto
 * @type            Object
 * @platform          js
 * @platform          node
 * @status              wip
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the object algorithm
 *
 * import { __object } from '@coffeekraken/sugar/crypto';
 * __object.encrypt({
 *      hello: 'world'
 * });
 *
 * @todo        interface
 * @todo        doc
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = {
    /**
     * @name        encrypt
     * @type        Function
     *
     * Encrypt
     *
     * @param       {Object}       object         The object to encrypt
     * @param       {String}       [salt="coffeekraken.sugar.crypto.object"]   The salt to encode the object. Needed to decode correctly the object
     * @return      {String}                       The encrypted object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    encrypt: function (object, salt = 'coffeekraken.sugar.crypto.object') {
        return object_encode_1.default.encode_object(object, 'base64', salt);
    },
    /**
     * @name        decrypt
     * @type        Function
     *
     * Decrypt
     *
     * @param       {String}      encodedObject          The object to decrypt
     * @param       {String}      [salt='coffeekraken.sugar.crypto.object']        The salt to decode the object
     * @return      {Object}                      The decrypted object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    decrypt: function (encodedObject, salt = 'coffeekraken.sugar.crypto.object') {
        return object_encode_1.default.decode_object(encodedObject, 'base64', salt);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUEyQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxrQkFBZTtJQUNYOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsTUFBTSxFQUFFLElBQUksR0FBRyxrQ0FBa0M7UUFDaEUsT0FBTyx1QkFBYyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE9BQU8sRUFBRSxVQUNMLGFBQWEsRUFDYixJQUFJLEdBQUcsa0NBQWtDO1FBRXpDLE9BQU8sdUJBQWMsQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RSxDQUFDO0NBQ0osQ0FBQyJ9