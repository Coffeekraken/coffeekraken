"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("crypto-js/md5"));
const toString_1 = __importDefault(require("../string/toString"));
const parse_1 = __importDefault(require("../string/parse"));
const __encryptedMessages = {};
/**
 * @name            md5
 * @namespace            js.crypt
 * @type            Object
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the md5 algorithm
 *
 * @todo        interface
 * @todo        doc
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = {
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
            message = (0, toString_1.default)(message);
        const string = (0, md5_1.default)(message).toString();
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
        return (0, parse_1.default)(string);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFnQztBQUNoQyxrRUFBMEM7QUFDMUMsNERBQW9DO0FBRXBDLE1BQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0FBRS9COzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILGtCQUFlO0lBQ1g7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sRUFBRSxVQUFVLE9BQU87UUFDdEIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRO1lBQUUsT0FBTyxHQUFHLElBQUEsa0JBQVEsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxNQUFNLE1BQU0sR0FBRyxJQUFBLGFBQUcsRUFBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDdEMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPO1FBQ3RCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixPQUFPLDBCQUEwQixDQUFDLENBQUM7WUFDaEUsT0FBTztTQUNWO1FBQ0QsTUFBTSxNQUFNLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsT0FBTyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUEsZUFBSyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Q0FDSixDQUFDIn0=