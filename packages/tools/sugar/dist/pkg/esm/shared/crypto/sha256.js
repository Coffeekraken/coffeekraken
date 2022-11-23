// @ts-nocheck
import sha256 from 'crypto-js/sha256';
import parse from '../string/parse';
import toString from '../string/toString';
const __encryptedMessages = {};
/**
 * @name            sha256
 * @namespace            shared.crypto
 * @type            Object
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the sha256 algorithm
 *
 * @example         js
 * import { __sha256 } from '@coffeekraken/sugar/crypto';
 * __sha256.encrypt('hello world');
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
     * @type          Function
     *
     * Encrypt
     *
     * @param       {String}      message         The message to encrypt
     * @return      {String}                      The encrypted string
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    encrypt: function (message) {
        if (typeof message !== 'string')
            message = toString(message);
        const string = sha256(message).toString();
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
     * @return      {String}                        The decrypted message
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    decrypt: function (message) {
        if (!__encryptedMessages[message]) {
            console.warn(`The message "${message}" cannot be decrypted...`);
            return;
        }
        const string = __encryptedMessages[message];
        delete __encryptedMessages[message];
        return parse(string);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE1BQU0sTUFBTSxrQkFBa0IsQ0FBQztBQUN0QyxPQUFPLEtBQUssTUFBTSxpQkFBaUIsQ0FBQztBQUNwQyxPQUFPLFFBQVEsTUFBTSxvQkFBb0IsQ0FBQztBQUUxQyxNQUFNLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztBQUUvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILGVBQWU7SUFDWDs7Ozs7Ozs7OztPQVVHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztRQUN0QixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7WUFBRSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDdEMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPO1FBQ3RCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixPQUFPLDBCQUEwQixDQUFDLENBQUM7WUFDaEUsT0FBTztTQUNWO1FBQ0QsTUFBTSxNQUFNLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QixDQUFDO0NBQ0osQ0FBQyJ9