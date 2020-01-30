const __encodeObject = require('object-encode');

module.exports = {

  /**
   * @name        encrypt
   * @namespace     sugar.node.crypt.object
   * @type        Function
   *
   * Encrypt
   *
   * @param       {Object}       object         The object to encrypt
   * @param       {String}       [salt="sugar"]   The salt to encode the object. Needed to decode correctly the object
   * @return      {String}                       The encrypted object
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  encrypt: function(object, salt = 'sugar') {
    return __encodeObject.encode_object(object, 'base64', salt);
  },

  /**
   * @name        decrypt
   * @namespace       sugar.node.crypt.object
   * @type        Function
   *
   * Decrypt
   *
   * @param       {String}      encodedObject          The object to decrypt
   * @param       {String}      [salt='sugar']        The salt to decode the object
   * @return      {Object}                      The decrypted object
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  decrypt: function(encodedObject, salt = 'sugar') {
    return __encodeObject.decode_object(encodedObject, 'base64', salt);
  }

}
