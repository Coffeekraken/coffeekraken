// @ts-nocheck
import md5 from 'crypto-js/md5';
import toString from '../string/toString';
import parse from '../string/parse';
const __encryptedMessages = {};
/**
 * @name            md5
 * @namespace            js.crypt
 * @type            Object
 * @status              wip
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the md5 algorithm
 *
 * @todo        interface
 * @todo        doc
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    encrypt: function (message) {
        if (typeof message !== 'string')
            message = toString(message);
        const string = md5(message).toString();
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    decrypt: function (message) {
        if (!__encryptedMessages[message]) {
            console.warn(`The message "${message}" cannot be decrypted...`);
            return;
        }
        const string = __encryptedMessages[message];
        delete __encryptedMessages[message];
        return parse(string);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWQ1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9jcnlwdC9tZDUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sR0FBRyxNQUFNLGVBQWUsQ0FBQztBQUNoQyxPQUFPLFFBQVEsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxPQUFPLEtBQUssTUFBTSxpQkFBaUIsQ0FBQztBQUVwQyxNQUFNLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztBQUUvQjs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsZUFBZTtJQUNiOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPO1FBQ3hCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUTtZQUFFLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0QsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUN0QyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sRUFBRSxVQUFVLE9BQU87UUFDeEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLE9BQU8sMEJBQTBCLENBQUMsQ0FBQztZQUNoRSxPQUFPO1NBQ1I7UUFDRCxNQUFNLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxPQUFPLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRixDQUFDIn0=