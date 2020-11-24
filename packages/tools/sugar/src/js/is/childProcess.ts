// @ts-nocheck

/**
 * @name                            childProcess
 * @namespace           sugar.js.is
 * @type                            Function
 * @stable
 *
 * Check if the current script is running as a child process or not by checking if the ```process.send``` exists, or is the environment variable ```IS_CHILD_PROCESS``` is true.
 *
 * @return        {Boolean}                             true if the process is running as a child process, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
 * isChildProcess(); // => false
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function childProcess() {
  if (!global || !global.process) return false;
  return (
    global.process.send !== undefined || global.process.env.IS_CHILD_PROCESS
  );
}
export = childProcess;