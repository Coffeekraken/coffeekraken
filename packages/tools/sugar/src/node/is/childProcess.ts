// @ts-nocheck
import __isTestEnv from '../../shared/is/testEnv';

/**
 * @name                            childProcess
 * @namespace           sugar.node.is
 * @type                            Function
 * @status              beta
 *
 * Check if the current script is running as a child process or not by checking if the ```process.send``` exists, or is the environment variable ```IS_CHILD_PROCESS``` is true.
 *
 * @return        {Boolean}                             true if the process is running as a child process, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
 * isChildProcess(); // => false
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isChildProcess() {
  if (__isTestEnv()) return false;
  return (
    process.send !== undefined || process.env.IS_CHILD_PROCESS !== undefined
  );
}
export default isChildProcess;
