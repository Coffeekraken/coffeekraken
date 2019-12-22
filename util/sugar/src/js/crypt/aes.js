import AES from 'crypto-js/aes';
import utf8 from 'crypto-js/enc-utf8';

export default {

  /**
   * @name        encrypt
   * @namespace     sugar.js.crypt.aes
   * @type        Function
   *
   * Encrypt
   *
   * @param       {String}       message        The message to encrypt
   * @param       {String}       [key='coffeekraken.sugar.crypt.aes']       The secret key to encrypt
   * @return      {String}                       The encrypted message
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  encrypt: function(message, key = 'coffeekraken.sugar.crypt.aes') {
    return AES.encrypt(message, key).toString();
  },

  /**
   * @name        decrypt
   * @namespace       sugar.js.crypt.aes
   * @type        Function
   *
   * Decrypt
   *
   * @param       {String}      message         The message to decrypt
   * @param       {String}      [key='coffeekraken.sugar.crypt.aes']      The secret key to decrypt
   * @return      {String}                      The decrypted message
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  decrypt: function(message, key = 'coffeekraken.sugar.crypt.aes') {
    return AES.decrypt(message, key).toString(utf8);
  }

}
