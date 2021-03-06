import __isJson from '../is/json';
import toString from '../string/toString';
import parse from '../string/parse';

export default {

  /**
   * @name        encrypt
   * @namespace     sugar.js.crypt.base64
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
    if (typeof message !== 'string') message = toString(message);
    return btoa(message);
  },

  /**
   * @name        decrypt
   * @namespace       sugar.js.crypt.base64
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
    message = atob(message);
    return parse(message);
  }

}
