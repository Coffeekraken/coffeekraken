// @ts-nocheck

import { __isChildProcess } from '@coffeekraken/sugar/is';
// import { terminal as __terminal } from 'terminal-kit';

/**
 * @name            onProcessExit
 * @namespace            node.process
 * @type            Function
 * @platform        node
 * @status          beta
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
 * @snippet         __onProcessExit($1)
 * __onProcessExit(() => {
 *      $1
 * });
 *
 * @example         js
 * import { __onProcessExit } from '@coffeekraken/sugar/process';
 * __onProcessExit(() => {
 *      // do something
 * });
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const __onProcessExitCallbacks = [];

export default function __onProcessExit(callback) {
    if (!__onProcessExitCallbacks.length) {
        if (!__isChildProcess()) {
            process.stdin.resume();
            process.env.HAS_ON_PROCESS_EXIT_HANDLERS = true;
        }
        let isExiting = false;
        async function exitHandler(state, killTerminal = true) {
            if (isExiting) return;
            isExiting = true;
            for (let i = 0; i < __onProcessExitCallbacks.length; i++) {
                const cbFn = __onProcessExitCallbacks[i];
                await cbFn(state);
            }
            // if (killTerminal) {
            //     setTimeout(() => {
            //         __terminal.processExit('SIGTERM');
            //     }, 100);
            // }
        }
        process.on('close', (code) =>
            code === 0 ? exitHandler('success') : exitHandler('error'),
        );
        process.on('exit', (code) =>
            code === 0 ? exitHandler('success') : exitHandler('error'),
        );
        process.on('custom_exit', (state) => {
            exitHandler(state ?? 'custom');
        });
        process.on('SIGINT', () => exitHandler('killed'));
        process.on('SIGUSR1', () => exitHandler('killed'));
        process.on('SIGUSR2', () => exitHandler('killed'));
        process.on('uncaughtException', () => exitHandler('error'));
    }
    if (__onProcessExitCallbacks.indexOf(callback) !== -1) return;
    __onProcessExitCallbacks.push(callback);
}
