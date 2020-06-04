import __isJson from '../is/json';
import toString from '../string/toString';
import parse from '../string/parse';

/**
 * @name            base64
 * @namespace       sugar.js.crypt
 * @type            Object
 * 
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the base64 algorithm
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {

  /**
   * @name        encrypt
   * @type        Function
   *
   * Encrypt
   *
   * @param       {String}       message        The message to encrypt
   * @return      {String}                       The encrypted message
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  encrypt: function (message) {
    if (typeof message !== 'string') message = toString(message);
    return btoa(message);
  },

  /**
   * @name        decrypt
   * @type        Function
   *
   * Decrypt
   *
   * @param       {String}      message         The message to decrypt
   * @return      {String}                      The decrypted message
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  decrypt: function (message) {
    message = atob(message);
    return parse(message);
  }

}
