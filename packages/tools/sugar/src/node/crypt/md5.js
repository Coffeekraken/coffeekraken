"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = require("crypto-js/md5");
const toString_1 = require("../string/toString");
const parse_1 = require("../string/parse");
const __encryptedMessages = {};
/**
 * @name            md5
 * @namespace           sugar.js.crypt
 * @type            Object
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the md5 algorithm
 *
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
