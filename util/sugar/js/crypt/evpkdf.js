"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evpkdf = _interopRequireDefault(require("crypto-js/evpkdf"));

var _toString = _interopRequireDefault(require("../string/toString"));

var _parse = _interopRequireDefault(require("../string/parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const __encryptedMessages = {};
var _default = {
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
  encrypt: function (message, salt = 'coffeekraken.sugar.crypt.evpkdf') {
    if (typeof message !== 'string') message = (0, _toString.default)(message);
    const string = (0, _evpkdf.default)(message, salt).toString();
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
  decrypt: function (message) {
    if (!__encryptedMessages[message]) {
      console.warn(`The message "${message}" cannot be decrypted...`);
      return;
    }

    const string = __encryptedMessages[message];
    delete __encryptedMessages[message];
    return (0, _parse.default)(string);
  }
};
exports.default = _default;
module.exports = exports.default;