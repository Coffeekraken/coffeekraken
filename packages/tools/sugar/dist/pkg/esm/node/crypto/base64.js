// @ts-nocheck
import toString from '../../shared/string/toString.js';
import __base64 from 'crypto-js/enc-base64.js';
import __utf8 from 'crypto-js/enc-utf8.js';
/**
 * @name            base64
 * @namespace            js.crypto
 * @type            Object
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the base64 algorithm
 *
 * @snippet         __base64.encrypt($1)
 *
 * @example         js
 * import { __base64 } from '@coffeekraken/sugar/crypto';
 * __base64.encrypt('hello world');
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
     * @type        Function
     *
     * Encrypt
     *
     * @param       {String}       message        The message to encrypt
     * @return      {String}                       The encrypted message
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    encrypt: function (message) {
        if (typeof message !== 'string')
            message = toString(message);
        const encodedWord = __utf8.parse(message); // encodedWord Array object
        const encoded = __base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
        return encoded;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    decrypt: function (message) {
        const encodedWord = __base64.parse(message); // encodedWord via Base64.parse()
        const decoded = __utf8.stringify(encodedWord); // decode encodedWord via Utf8.stringify() '75322541'
        return decoded;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxpQ0FBaUMsQ0FBQztBQUV2RCxPQUFPLFFBQVEsTUFBTSx5QkFBeUIsQ0FBQztBQUMvQyxPQUFPLE1BQU0sTUFBTSx1QkFBdUIsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsZUFBZTtJQUNYOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztRQUN0QixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7WUFBRSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQywyQkFBMkI7UUFDdEUsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLHlCQUF5QjtRQUMxRSxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPO1FBQ3RCLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxpQ0FBaUM7UUFDOUUsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLHFEQUFxRDtRQUNwRyxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0NBQ0osQ0FBQyJ9