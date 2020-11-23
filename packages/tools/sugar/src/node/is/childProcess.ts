/**
 * @name                            childProcess
 * @namespace           sugar.node.is
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function childProcess() {
  return (
    process.send !== undefined || process.env.IS_CHILD_PROCESS !== undefined
  );
}
