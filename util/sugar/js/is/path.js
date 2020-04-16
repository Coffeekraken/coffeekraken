"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = path;

var _isValidPath = _interopRequireDefault(require("is-valid-path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                            path
 * @namespace                       sugar.node.is
 * @type                            Function
 * 
 * Check if the passed string is a valid path or not
 * 
 * @param         {String}            path              The path to check
 * @return        {Boolean}                             true if the path is valide, false if not
 * 
 * @example       js
 * import isPath from '@coffeekraken/sugar/js/is/path';
 * isPath('hello/world'); // => true
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function path(path) {
  // check if the path is valid or not
  if (!(0, _isValidPath.default)(path)) return false; // otherwise, all is ok

  return true;
}

module.exports = exports.default;