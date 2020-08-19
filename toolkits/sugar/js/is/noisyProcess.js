"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNoisyProcess;

var _env = _interopRequireDefault(require("../core/env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name              isNoisyProcess
 * @namespace         js.is
 * @type              Function
 *
 * This function simply return true or false depending is the process is a noisy one or not.
 * A noisy process is a process that has the environment variable "NOISY_PROCESS" setted to true.
 * This tells the process features like the SPromise class for example to console.log his actions
 * so the main process (cause normally a noisy process is a child process as well) can catch these
 * printed "object" and pipe them in the main process automatically
 *
 * @return        {Boolean}           true if is a noisy process, false if not
 *
 * @example         js
 * import isNoisyProcess from '@coffeekraken/sugar/js/is/noisyProcess';
 * isNoisyProcess(); // => false
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isNoisyProcess() {
  var noisy = (0, _env.default)('NOISY_PROCESS');
  return noisy !== undefined ? typeof noisy === 'boolean' ? noisy : true : false;
}

module.exports = exports.default;