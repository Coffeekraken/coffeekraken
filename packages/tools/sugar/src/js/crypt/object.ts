// @ts-nocheck
// @shared

import __encodeObject from 'object-encode';

/**
 * @name            object
 * @namespace           sugar.js.crypt
 * @type            Object
 * @wip
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the object algorithm
 *
 * @todo        interface
 * @todo        doc
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = {
  /**
   * @name        encrypt
   * @type        Function
   *
   * Encrypt
   *
   * @param       {Object}       object         The object to encrypt
   * @param       {String}       [salt="coffeekraken.sugar.crypt.object"]   The salt to encode the object. Needed to decode correctly the object
   * @return      {String}                       The encrypted object
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  encrypt: function (object, salt = 'coffeekraken.sugar.crypt.object') {
    return __encodeObject.encode_object(object, 'base64', salt);
  },

  /**
   * @name        decrypt
   * @type        Function
   *
   * Decrypt
   *
   * @param       {String}      encodedObject          The object to decrypt
   * @param       {String}      [salt='coffeekraken.sugar.crypt.object']        The salt to decode the object
   * @return      {Object}                      The decrypted object
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  decrypt: function (encodedObject, salt = 'coffeekraken.sugar.crypt.object') {
    return __encodeObject.decode_object(encodedObject, 'base64', salt);
  }
};
