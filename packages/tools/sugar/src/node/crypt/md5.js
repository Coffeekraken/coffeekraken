"use strict";
// @ts-nocheck
// @shared
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
 * @namespace           sugar.js.crypt
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
const api = {
    /**
     * @name        encrypt
     * @type          Function
     *
     * Encrypt
     *
     * @param       {String}      message         The message to encrypt
     * @return      {String}                      The encrypted string
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    encrypt: function (message) {
        if (typeof message !== 'string')
            message = toString_1.default(message);
        const string = md5_1.default(message).toString();
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
     * @return      {String}                        The decrypted message
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
        return parse_1.default(string);
    }
};
md5_1.default.encrypt = api.encrypt;
md5_1.default.decrypt = api.decrypt;
exports.default = md5_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWQ1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWQ1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFVix3REFBZ0M7QUFDaEMsa0VBQTBDO0FBQzFDLDREQUFvQztBQUVwQyxNQUFNLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztBQUUvQjs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxHQUFHLEdBQUc7SUFDVjs7Ozs7Ozs7OztPQVVHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztRQUN4QixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7WUFBRSxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxNQUFNLE1BQU0sR0FBRyxhQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ3RDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztRQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsT0FBTywwQkFBMEIsQ0FBQyxDQUFDO1lBQ2hFLE9BQU87U0FDUjtRQUNELE1BQU0sTUFBTSxHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE9BQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsT0FBTyxlQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNGLENBQUM7QUFDRixhQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDMUIsYUFBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQzFCLGtCQUFlLGFBQUcsQ0FBQyJ9