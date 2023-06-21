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
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@coffeekraken/sugar/is");
const terminal_kit_1 = __importDefault(require("terminal-kit"));
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
function __onProcessExit(callback) {
    if (!__onProcessExitCallbacks.length) {
        if (!(0, is_1.__isChildProcess)()) {
            process.stdin.resume();
            process.env.HAS_ON_PROCESS_EXIT_HANDLERS = true;
        }
        let isExiting = false;
        function exitHandler(state, killTerminal = true) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isExiting)
                    return;
                isExiting = true;
                for (let i = 0; i < __onProcessExitCallbacks.length; i++) {
                    const cbFn = __onProcessExitCallbacks[i];
                    yield cbFn(state);
                }
                if (killTerminal) {
                    setTimeout(() => {
                        terminal_kit_1.default.terminal.processExit('SIGTERM');
                    }, 100);
                }
            });
        }
        process.on('close', (code) => code === 0 ? exitHandler('success') : exitHandler('error'));
        process.on('exit', (code) => code === 0 ? exitHandler('success') : exitHandler('error'));
        process.on('custom_exit', (state) => {
            exitHandler(state !== null && state !== void 0 ? state : 'custom');
        });
        process.on('SIGINT', () => exitHandler('killed'));
        process.on('SIGUSR1', () => exitHandler('killed'));
        process.on('SIGUSR2', () => exitHandler('killed'));
        process.on('uncaughtException', () => exitHandler('error'));
    }
    if (__onProcessExitCallbacks.indexOf(callback) !== -1)
        return;
    __onProcessExitCallbacks.push(callback);
}
exports.default = __onProcessExit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLCtDQUEwRDtBQUMxRCxnRUFBeUM7QUFFekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNILE1BQU0sd0JBQXdCLEdBQUcsRUFBRSxDQUFDO0FBRXBDLFNBQXdCLGVBQWUsQ0FBQyxRQUFRO0lBQzVDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUU7UUFDbEMsSUFBSSxDQUFDLElBQUEscUJBQWdCLEdBQUUsRUFBRTtZQUNyQixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLFNBQWUsV0FBVyxDQUFDLEtBQUssRUFBRSxZQUFZLEdBQUcsSUFBSTs7Z0JBQ2pELElBQUksU0FBUztvQkFBRSxPQUFPO2dCQUN0QixTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsd0JBQXdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN0RCxNQUFNLElBQUksR0FBRyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3JCO2dCQUNELElBQUksWUFBWSxFQUFFO29CQUNkLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ1osc0JBQWEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNsRCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQ1g7WUFDTCxDQUFDO1NBQUE7UUFDRCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQ3pCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUM3RCxDQUFDO1FBQ0YsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUN4QixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FDN0QsQ0FBQztRQUNGLE9BQU8sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDaEMsV0FBVyxDQUFDLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbEQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUMvRDtJQUNELElBQUksd0JBQXdCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFFLE9BQU87SUFDOUQsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFwQ0Qsa0NBb0NDIn0=