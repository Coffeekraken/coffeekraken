/**
 * @name            onProcessExit
 * @namespace       sugar.node.process
 * @type            Function
 *
 * This function allows you to register a callback to execute when the process
 * is exiting by one of these events:
 * - exit: when app is closing
 * - SIGINT: on ctrl+c
 * - SIGUSR1, SIGUSR2: catches "kill pid"
 * - uncaughtException: catches uncaught exceptions
 *
 * @param       {Function}          callback            The callback function you want to call
 *
 * @example         js
 * const onProcessExit = require('@coffeekraken/sugar/node/process/onProcessExit');
 * onProcessExit(() => {
 *      // do something
 * });
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const __onProcessExitCallbacks = [];
module.exports = function onProcessExit(callback) {
  if (!__onProcessExitCallbacks.length) {
    async function exitHandler() {
      process.stdin.resume();
      for (let i = 0; i < __onProcessExitCallbacks.length; i++) {
        const cbFn = __onProcessExitCallbacks[i];
        await cbFn();
      }
      process.exit();
    }
    process.on('close', exitHandler);
    process.on('exit', exitHandler);
    process.on('custom_exit', exitHandler);
    process.on('SIGINT', exitHandler);
    process.on('SIGUSR1', exitHandler);
    process.on('SIGUSR2', exitHandler);
    process.on('uncaughtException', exitHandler);
  }
  if (__onProcessExitCallbacks.indexOf(callback) !== -1) return;
  __onProcessExitCallbacks.push(callback);
};
