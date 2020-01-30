import evpkdf from 'crypto-js/evpkdf';
import toString from '../string/toString';
import parse from '../string/parse';

const __encryptedMessages = {};

export default {

  /**
   * @name        encrypt
   * @namespace     sugar.js.crypt.evpkdf
   * @type          Function
   *
   * Encrypt
   *
   * @param       {String}      message         The message to encrypt
   * @param       {String}      [salt='coffeekraken.sugar.crypt.evpkdf']        A salt string to encrypt the message
   * @return      {String}                      The encrypted string
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  encrypt: function(message, salt = 'coffeekraken.sugar.crypt.evpkdf') {
    if (typeof message !== 'string') message = toString(message);
    const string = evpkdf(message, salt).toString();
    __encryptedMessages[string] = message;
    return string;
  },

  /**
   * @name        decrypt
   * @namespace     sugar.js.crypt.evpkdf
   * @type        Function
   *
   * Decrypt
   *
   * @param       {String}        message         The message to decrypt
   * @return      {String}                        The decrypted message
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  decrypt: function(message) {
    if ( ! __encryptedMessages[message]) {
      console.warn(`The message "${message}" cannot be decrypted...`);
      return;
    }
    const string = __encryptedMessages[message];
    delete __encryptedMessages[message];
    return parse(string);
  }

};
