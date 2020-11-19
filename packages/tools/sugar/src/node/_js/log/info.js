"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = info;

var _SLog = _interopRequireDefault(require("./SLog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name              info
 * @namespace           sugar.js.info
 * @type              Function
 *
 * This function is a simple wrapper around the SLog class that let you use the info features quickly
 *
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly infoged
 *
 * @example         js
 * import info from '@coffeekraken/sugar/js/log/info';
 * info('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function info(message) {
  if (!(global || window)._sLogDefaultInstance) {
    (global || window)._sLogDefaultInstance = new _SLog.default({});
  }

  return (global || window)._sLogDefaultInstance.info(message);
}

module.exports = exports.default;