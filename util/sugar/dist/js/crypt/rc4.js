"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rc = _interopRequireDefault(require("crypto-js/rc4"));

var _encUtf = _interopRequireDefault(require("crypto-js/enc-utf8"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
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
  encrypt: function (message, key = 'coffeekraken.sugar.crypt.rc4') {
    return _rc.default.encrypt(message, key).toString();
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
  decrypt: function (message, key = 'coffeekraken.sugar.crypt.rc4') {
    return _rc.default.decrypt(message, key).toString(_encUtf.default);
  }
};
exports.default = _default;
module.exports = exports.default;