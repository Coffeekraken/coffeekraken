// @ts-nocheck

/**
 * @name            onProcessExit
 * @namespace       sugar.node.process
 * @type            Function
 * @beta
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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
 * onProcessExit(() => {
 *      // do something
 * });
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const __onProcessExitCallbacks = [];

function onProcessExit(callback) {
  if (!__onProcessExitCallbacks.length) {
    process.env.HAS_ON_PROCESS_EXIT_HANDLERS = true;
    async function exitHandler() {
      for (let i = 0; i < __onProcessExitCallbacks.length; i++) {
        const cbFn = __onProcessExitCallbacks[i];
        await cbFn();
      }
      process.kill(process.pid, 'SIGTERM');
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
}
export = onProcessExit;