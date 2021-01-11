"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const terminal_kit_1 = __importDefault(require("terminal-kit"));
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
        let isExiting = false;
        function exitHandler(state) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isExiting)
                    return;
                isExiting = true;
                for (let i = 0; i < __onProcessExitCallbacks.length; i++) {
                    const cbFn = __onProcessExitCallbacks[i];
                    yield cbFn(state);
                }
                setTimeout(() => {
                    terminal_kit_1.default.terminal.processExit('SIGTERM');
                }, 100);
            });
        }
        process.on('close', (code) => code === 0 ? exitHandler('success') : exitHandler('error'));
        process.on('exit', (code) => code === 0 ? exitHandler('success') : exitHandler('error'));
        process.on('custom_exit', (state) => {
            exitHandler(state);
        });
        process.on('SIGINT', () => exitHandler('killed'));
        process.on('SIGUSR1', () => exitHandler('killed'));
        process.on('SIGUSR2', () => exitHandler('killed'));
        process.on('uncaughtException', () => exitHandler('error'));
        process.on('unhandledRejection', () => exitHandler('error'));
    }
    if (__onProcessExitCallbacks.indexOf(callback) !== -1)
        return;
    __onProcessExitCallbacks.push(callback);
}
module.exports = onProcessExit;
//# sourceMappingURL=onProcessExit.js.map