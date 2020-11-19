"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _aes = _interopRequireDefault(require("crypto-js/aes"));

var _encUtf = _interopRequireDefault(require("crypto-js/enc-utf8"));

var _toString = _interopRequireDefault(require("../string/toString"));

var _parse = _interopRequireDefault(require("../string/parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            aes
 * @namespace           sugar.js.crypt
 * @type            Object
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the aes algorithm
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = {
  /**
   * @name        encrypt
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
  encrypt: function encrypt(message, key) {
    if (key === void 0) {
      key = 'coffeekraken.sugar.crypt.aes';
    }

    if (typeof message !== 'string') message = (0, _toString.default)(message);
    return _aes.default.encrypt(message, key).toString();
  },

  /**
   * @name        decrypt
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
  decrypt: function decrypt(message, key) {
    if (key === void 0) {
      key = 'coffeekraken.sugar.crypt.aes';
    }

    var value = _aes.default.decrypt(message, key).toString(_encUtf.default);

    return (0, _parse.default)(value);
  }
};
exports.default = _default;
module.exports = exports.default;