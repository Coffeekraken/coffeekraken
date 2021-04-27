// @ts-nocheck
import AES from 'crypto-js/aes';
import utf8 from 'crypto-js/enc-utf8';
import toString from '../string/toString';
import parse from '../string/parse';
/**
 * @name            aes
 * @namespace            js.crypt
 * @type            Object
 * @status              wip
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the aes algorithm
 *
 * @todo        interface
 * @todo        doc
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    /**
     * @name        encrypt
     * @type        Function
     *
     * Encrypt
     *
     * @param       {String}       message        The message to encrypt
     * @param       {String}       [key='coffeekraken.sugar.crypt.aes']       The secret key to encrypt
     * @return      {String}                       The encrypted message
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    encrypt: function (message, key = 'coffeekraken.sugar.crypt.aes') {
        if (typeof message !== 'string')
            message = toString(message);
        return AES.encrypt(message, key).toString();
    },
    /**
     * @name        decrypt
     * @type        Function
     *
     * Decrypt
     *
     * @param       {String}      message         The message to decrypt
     * @param       {String}      [key='coffeekraken.sugar.crypt.aes']      The secret key to decrypt
     * @return      {String}                      The decrypted message
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    decrypt: function (message, key = 'coffeekraken.sugar.crypt.aes') {
        const value = AES.decrypt(message, key).toString(utf8);
        return parse(value);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9jcnlwdC9hZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sR0FBRyxNQUFNLGVBQWUsQ0FBQztBQUNoQyxPQUFPLElBQUksTUFBTSxvQkFBb0IsQ0FBQztBQUN0QyxPQUFPLFFBQVEsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxPQUFPLEtBQUssTUFBTSxpQkFBaUIsQ0FBQztBQUVwQzs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsZUFBZTtJQUNiOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTyxFQUFFLEdBQUcsR0FBRyw4QkFBOEI7UUFDOUQsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRO1lBQUUsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE9BQU8sRUFBRSxVQUFVLE9BQU8sRUFBRSxHQUFHLEdBQUcsOEJBQThCO1FBQzlELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBQ0YsQ0FBQyJ9