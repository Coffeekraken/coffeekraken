"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warn;

var _SLog = _interopRequireDefault(require("./SLog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name              warn
 * @namespace           js.warn
 * @type              Function
 *
 * This function is a simple wrapper around the SLog class that let you use the warn features quickly
 *
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly logged
 *
 * @example         js
 * import warn from '@coffeekraken/sugar/js/log/warn';
 * warn('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function warn(message) {
  if (!(global || window)._sLogDefaultInstance) {
    (global || window)._sLogDefaultInstance = new _SLog.default({});
  }

  return (global || window)._sLogDefaultInstance.warn(message);
}

module.exports = exports.default;