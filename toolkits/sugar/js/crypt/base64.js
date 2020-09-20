"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _json = _interopRequireDefault(require("../is/json"));

var _toString = _interopRequireDefault(require("../string/toString"));

var _parse = _interopRequireDefault(require("../string/parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            base64
 * @namespace           sugar.js.crypt
 * @type            Object
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the base64 algorithm
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
   * @return      {String}                       The encrypted message
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  encrypt: function encrypt(message) {
    if (typeof message !== 'string') message = (0, _toString.default)(message);
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
  decrypt: function decrypt(message) {
    message = atob(message);
    return (0, _parse.default)(message);
  }
};
exports.default = _default;
module.exports = exports.default;