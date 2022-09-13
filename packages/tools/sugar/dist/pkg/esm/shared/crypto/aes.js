// @ts-nocheck
import AES from 'crypto-js/aes';
import utf8 from 'crypto-js/enc-utf8';
import parse from '../string/parse';
import toString from '../string/toString';
/**
 * @name            aes
 * @namespace            js.crypto
 * @type            Object
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the aes algorithm
 *
 * import { __aes } from '@coffeekraken/sugar/crypto';
 * __aes.encrypt('hello world');
 *
 * @todo        interface
 * @todo        doc
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    /**
     * @name        encrypt
     * @type        Function
     *
     * Encrypt
     *
     * @param       {String}       message        The message to encrypt
     * @param       {String}       [key='coffeekraken.sugar.crypto.aes']       The secret key to encrypt
     * @return      {String}                       The encrypted message
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    encrypt: function (message, key = 'coffeekraken.sugar.crypto.aes') {
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
     * @param       {String}      [key='coffeekraken.sugar.crypto.aes']      The secret key to decrypt
     * @return      {String}                      The decrypted message
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    decrypt: function (message, key = 'coffeekraken.sugar.crypto.aes') {
        const value = AES.decrypt(message, key).toString(utf8);
        return parse(value);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEdBQUcsTUFBTSxlQUFlLENBQUM7QUFDaEMsT0FBTyxJQUFJLE1BQU0sb0JBQW9CLENBQUM7QUFDdEMsT0FBTyxLQUFLLE1BQU0saUJBQWlCLENBQUM7QUFDcEMsT0FBTyxRQUFRLE1BQU0sb0JBQW9CLENBQUM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILGVBQWU7SUFDWDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE9BQU8sRUFBRSxVQUFVLE9BQU8sRUFBRSxHQUFHLEdBQUcsK0JBQStCO1FBQzdELElBQUksT0FBTyxPQUFPLEtBQUssUUFBUTtZQUFFLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0QsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPLEVBQUUsR0FBRyxHQUFHLCtCQUErQjtRQUM3RCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQztDQUNKLENBQUMifQ==