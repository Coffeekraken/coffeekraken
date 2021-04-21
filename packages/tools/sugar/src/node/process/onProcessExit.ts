// @ts-nocheck

import __cliCursor from 'cli-cursor';
import __consoleClear from 'console-clear';
import __terminalKit from 'terminal-kit';

/**
 * @name            onProcessExit
 * @namespace            node.process
 * @type            Function
 * @status              beta
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
    let isExiting = false;
    async function exitHandler(state) {
      if (isExiting) return;
      isExiting = true;
      for (let i = 0; i < __onProcessExitCallbacks.length; i++) {
        const cbFn = __onProcessExitCallbacks[i];
        await cbFn(state);
      }
      setTimeout(() => {
        __terminalKit.terminal.processExit('SIGTERM');
      }, 100);
    }
    process.on('close', (code) =>
      code === 0 ? exitHandler('success') : exitHandler('error')
    );
    process.on('exit', (code) =>
      code === 0 ? exitHandler('success') : exitHandler('error')
    );
    process.on('custom_exit', (state) => {
      exitHandler(state);
    });
    process.on('SIGINT', () => exitHandler('killed'));
    process.on('SIGUSR1', () => exitHandler('killed'));
    process.on('SIGUSR2', () => exitHandler('killed'));
    process.on('uncaughtException', () => exitHandler('error'));
  }
  if (__onProcessExitCallbacks.indexOf(callback) !== -1) return;
  __onProcessExitCallbacks.push(callback);
}
export default onProcessExit;
