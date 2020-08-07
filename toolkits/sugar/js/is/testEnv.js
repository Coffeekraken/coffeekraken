"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTestEnv;

var _env = _interopRequireDefault(require("../core/env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name          testEnv
 * @namespace     js.is
 * @type          Function
 *
 * Check if the current environment is in a test process or not
 *
 * @return      {Boolean}         true if in environment environment, false if not
 *
 * @example       js
 * import isTest from '@coffeekraken/sugar/js/is/testEnv';
 * isTest(); // => true
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isTestEnv() {
  return (0, _env.default)('NODE_ENV') === 'test' || (0, _env.default)('JEST_WORKER_ID') !== undefined || typeof global.it === 'function';
}

module.exports = exports.default;