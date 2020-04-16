"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = log;

var _SLog = _interopRequireDefault(require("./SLog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name              log
 * @namespace         sugar.js.log
 * @type              Function
 * 
 * This function is a simple wrapper around the SLog class that let you use the log features quickly
 * 
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly logged
 * 
 * @example         js
 * import log from '@coffeekraken/sugar/js/log/log';
 * log('Hello world');
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function log(message) {
  if (!(global || window)._sLogDefaultInstance) {
    (global || window)._sLogDefaultInstance = new _SLog.default({});
  }

  return (global || window)._sLogDefaultInstance.log(message);
}

module.exports = exports.default;