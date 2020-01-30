"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _json = _interopRequireDefault(require("../is/json"));

var _toString = _interopRequireDefault(require("../string/toString"));

var _parse = _interopRequireDefault(require("../string/parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
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
  encrypt: function (message) {
    if (typeof message !== 'string') message = (0, _toString.default)(message);
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
  decrypt: function (message) {
    message = atob(message);
    return (0, _parse.default)(message);
  }
};
exports.default = _default;
module.exports = exports.default;