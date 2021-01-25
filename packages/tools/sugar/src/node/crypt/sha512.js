"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sha512_1 = __importDefault(require("crypto-js/sha512"));
const toString_1 = __importDefault(require("../string/toString"));
const parse_1 = __importDefault(require("../string/parse"));
const __encryptedMessages = {};
module.exports = {
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
        const string = sha512_1.default(message).toString();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhNTEyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhNTEyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLDhEQUFzQztBQUN0QyxrRUFBMEM7QUFDMUMsNERBQW9DO0FBRXBDLE1BQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0FBZ0IvQixpQkFBUztJQUNQOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsVUFBVSxPQUFPO1FBQ3hCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUTtZQUFFLE9BQU8sR0FBRyxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELE1BQU0sTUFBTSxHQUFHLGdCQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ3RDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsT0FBTyxFQUFFLFVBQVUsT0FBTztRQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsT0FBTywwQkFBMEIsQ0FBQyxDQUFDO1lBQ2hFLE9BQU87U0FDUjtRQUNELE1BQU0sTUFBTSxHQUFHLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE9BQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsT0FBTyxlQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNGLENBQUMifQ==