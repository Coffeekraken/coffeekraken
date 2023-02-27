// @ts-nocheck

import __encodeObject from 'object-encode';

/**
 * @name            object
 * @namespace            shared.crypto
 * @type            Object
 * @platform          js
 * @platform          node
 * @status              wip
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the object algorithm
 *
 * @snippet         __object.encrypt($1)
 * 
 * @example         js
 * import { __object } from '@coffeekraken/sugar/crypto';
 * __object.encrypt({
 *      hello: 'world'
 * });
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
     * @type        Function
     *
     * Encrypt
     *
     * @param       {Object}       object         The object to encrypt
     * @param       {String}       [salt="coffeekraken.sugar.crypto.object"]   The salt to encode the object. Needed to decode correctly the object
     * @return      {String}                       The encrypted object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    encrypt: function (object, salt = 'coffeekraken.sugar.crypto.object') {
        return __encodeObject.encode_object(object, 'base64', salt);
    },

    /**
     * @name        decrypt
     * @type        Function
     *
     * Decrypt
     *
     * @param       {String}      encodedObject          The object to decrypt
     * @param       {String}      [salt='coffeekraken.sugar.crypto.object']        The salt to decode the object
     * @return      {Object}                      The decrypted object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    decrypt: function (
        encodedObject,
        salt = 'coffeekraken.sugar.crypto.object',
    ) {
        return __encodeObject.decode_object(encodedObject, 'base64', salt);
    },
};
