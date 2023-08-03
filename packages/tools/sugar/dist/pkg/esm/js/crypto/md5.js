// @ts-nocheck
import { md5 } from 'blueimp-md5';
import parse from '../../shared/string/parse.js';
import toString from '../../shared/string/toString.js';
const __encryptedMessages = {};
/**
 * @name            md5
 * @namespace            js.crypto
 * @type            Object
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the md5 algorithm
 *
 * @snippet         __md5.encrypt($1)
 *
 * @example         js
 * import { __md5 } from '@coffeekraken/sugar/crypto';
 * __md5.encrypt('hello world');
 *
 * @todo        interface
 * @todo        doc
 *
 * @since         2.0.0
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
        const string = md5(message);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLGlDQUFpQyxDQUFDO0FBRXZELE1BQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0FBRS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxlQUFlO0lBQ1g7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sRUFBRSxVQUFVLE9BQU87UUFDdEIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRO1lBQUUsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ3RDLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztRQUN0QixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsT0FBTywwQkFBMEIsQ0FBQyxDQUFDO1lBQ2hFLE9BQU87U0FDVjtRQUNELE1BQU0sTUFBTSxHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE9BQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztDQUNKLENBQUMifQ==