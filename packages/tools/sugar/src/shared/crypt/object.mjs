// @ts-nocheck
import __encodeObject from 'object-encode';
/**
 * @name            object
 * @namespace            js.crypt
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    decrypt: function (encodedObject, salt = 'coffeekraken.sugar.crypt.object') {
        return __encodeObject.decode_object(encodedObject, 'base64', salt);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9jcnlwdC9vYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsZUFBZTtJQUNiOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsTUFBTSxFQUFFLElBQUksR0FBRyxpQ0FBaUM7UUFDakUsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsYUFBYSxFQUFFLElBQUksR0FBRyxpQ0FBaUM7UUFDeEUsT0FBTyxjQUFjLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUNGLENBQUMifQ==