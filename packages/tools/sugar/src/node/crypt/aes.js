"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aes_1 = require("crypto-js/aes");
const enc_utf8_1 = require("crypto-js/enc-utf8");
const toString_1 = require("../string/toString");
const parse_1 = require("../string/parse");
/**
 * @name            aes
 * @namespace           sugar.js.crypt
 * @type            Object
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the aes algorithm
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = {
    /**
     * @name        encrypt
     * @type        Function
     *
     * Encrypt
     *
     * @param       {String}       message        The message to encrypt
     * @param       {String}       [key='coffeekraken.sugar.crypt.aes']       The secret key to encrypt
     * @return      {String}                       The encrypted message
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    encrypt: function (message, key = 'coffeekraken.sugar.crypt.aes') {
        if (typeof message !== 'string')
            message = toString_1.default(message);
        return aes_1.default.encrypt(message, key).toString();
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
        let value = aes_1.default.decrypt(message, key).toString(enc_utf8_1.default);
        return parse_1.default(value);
    }
};
