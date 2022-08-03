// @ts-nocheck
import __encodeObject from 'object-encode';
/**
 * @name            object
 * @namespace            js.crypt
 * @type            Object
 * @platform          js
 * @platform          node
 * @status              wip
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the object algorithm
 *
 * @todo        interface
 * @todo        doc
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    /**
     * @name        encrypt
     * @type        Function
     *
     * Encrypt
     *
     * @param       {Object}       object         The object to encrypt
     * @param       {String}       [salt="coffeekraken.sugar.crypt.object"]   The salt to encode the object. Needed to decode correctly the object
     * @return      {String}                       The encrypted object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    encrypt: function (object, salt = 'coffeekraken.sugar.crypt.object') {
        return __encodeObject.encode_object(object, 'base64', salt);
    },
    /**
     * @name        decrypt
     * @type        Function
     *
     * Decrypt
     *
     * @param       {String}      encodedObject          The object to decrypt
     * @param       {String}      [salt='coffeekraken.sugar.crypt.object']        The salt to decode the object
     * @return      {Object}                      The decrypted object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    decrypt: function (encodedObject, salt = 'coffeekraken.sugar.crypt.object') {
        return __encodeObject.decode_object(encodedObject, 'base64', salt);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFFM0M7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsZUFBZTtJQUNYOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsTUFBTSxFQUFFLElBQUksR0FBRyxpQ0FBaUM7UUFDL0QsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxFQUFFLFVBQ0wsYUFBYSxFQUNiLElBQUksR0FBRyxpQ0FBaUM7UUFFeEMsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkUsQ0FBQztDQUNKLENBQUMifQ==