"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debug;

var _SLog = _interopRequireDefault(require("./SLog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name              debug
 * @namespace           sugar.js.debug
 * @type              Function
 *
 * This function is a simple wrapper around the SLog class that let you use the debug features quickly
 *
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly logged
 *
 * @example         js
 * import debug from '@coffeekraken/sugar/js/log/debug';
 * debug('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function debug(message) {
  if (!(global || window)._sLogDefaultInstance) {
    (global || window)._sLogDefaultInstance = new _SLog.default({});
  }

  return (global || window)._sLogDefaultInstance.debug(message);
}

module.exports = exports.default;