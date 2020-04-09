const __toString = require('../string/toString');
const __parse = require('../string/parse');


module.exports = {

  /**
   * @name        encrypt
   * @namespace     sugar.node.crypt.base64
   * @type        Function
   *
   * Encrypt
   *
   * @param       {String}       message        The message to encrypt
   * @return      {String}                       The encrypted message
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  encrypt: function(message) {
    if (typeof message !== 'string') message = __toString(message);
    return Buffer.from(message).toString('base64');
  },

  /**
   * @name        decrypt
   * @namespace       sugar.node.crypt.base64
   * @type        Function
   *
   * Decrypt
   *
   * @param       {String}      message         The message to decrypt
   * @return      {String}                      The decrypted message
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  decrypt: function(message) {
    return __parse(Buffer.from(message, 'base64').toString('ascii'));
  }

}
