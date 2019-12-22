import RC4 from 'crypto-js/rc4';
import utf8 from 'crypto-js/enc-utf8';

export default {

  /**
   * @name        encrypt
   * @namespace     sugar.js.crypt.rc4
   * @type        Function
   *
   * Encrypt
   *
   * @param       {String}       message        The message to encrypt
   * @param       {String}       [key='coffeekraken.sugar.crypt.rc4']       The secret key to encrypt
   * @return      {String}                       The encrypted message
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  encrypt: function(message, key = 'coffeekraken.sugar.crypt.rc4') {
    return RC4.encrypt(message, key).toString();
  },

  /**
   * @name        decrypt
   * @namespace       sugar.js.crypt.rc4
   * @type        Function
   *
   * Decrypt
   *
   * @param       {String}      message         The message to decrypt
   * @param       {String}      [key='coffeekraken.sugar.crypt.rc4']      The secret key to decrypt
   * @return      {String}                      The decrypted message
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  decrypt: function(message, key = 'coffeekraken.sugar.crypt.rc4') {
    return RC4.decrypt(message, key).toString(utf8);
  }

}
