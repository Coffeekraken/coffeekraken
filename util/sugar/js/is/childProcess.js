"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = childProcess;

/**
 * @name                            childProcess
 * @namespace                       sugar.js.is
 * @type                            Function
 *
 * Check if the current script is running as a child process or not by checking if the ```process.send``` exists, or is the environment variable ```IS_CHILD_PROCESS``` is true.
 *
 * @return        {Boolean}                             true if the process is running as a child process, false if not
 *
 * @example       js
 * import isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
 * isChildProcess(); // => false
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function childProcess() {
  if (!global || !global.process) return false;
  return global.process.send !== undefined || global.process.env.IS_CHILD_PROCESS;
}

module.exports = exports.default;