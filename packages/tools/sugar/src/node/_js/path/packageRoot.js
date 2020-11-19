"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = packageRoot;

var _env = _interopRequireDefault(require("../core/env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                  packageRoot
 * @namespace             sugar.js.path
 * @type                  Function
 * @env                   development
 *
 * This function return the path where stands the package in the filesystem.
 * !!! This function works only in development mode cause it will be dangerous to
 * expose this kind on information on a website...
 * If the environment is not the good one, this function will simply return an empty string
 *
 * @return        {String}                Either the package root path if available, or an empty string if not...
 *
 * @example     js
 * import packageRoot from '@coffeekraken/sugar/js/path/packageRoot';
 * packageRoot(); // => /Users/something/hello/world
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
function packageRoot() {
  var environment = (0, _env.default)('node_env') || (0, _env.default)('environment') || (0, _env.default)('env');
  if (environment !== 'development' && environment !== 'test') return '';
  return (0, _env.default)('package_root') || '';
}

module.exports = exports.default;