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
import __terminalKit from 'terminal-kit';
/**
 * @name            onProcessExit222
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
        process.stdin.resume();
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
                    __terminalKit.terminal.processExit('SIGTERM');
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
    }
    if (__onProcessExitCallbacks.indexOf(callback) !== -1)
        return;
    __onProcessExitCallbacks.push(callback);
}
export default onProcessExit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25Qcm9jZXNzRXhpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9uUHJvY2Vzc0V4aXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUlkLE9BQU8sYUFBYSxNQUFNLGNBQWMsQ0FBQztBQUV6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sd0JBQXdCLEdBQUcsRUFBRSxDQUFDO0FBRXBDLFNBQVMsYUFBYSxDQUFDLFFBQVE7SUFDM0IsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRTtRQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBQ2hELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN0QixTQUFlLFdBQVcsQ0FBQyxLQUFLOztnQkFDNUIsSUFBSSxTQUFTO29CQUFFLE9BQU87Z0JBQ3RCLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3RELE1BQU0sSUFBSSxHQUFHLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDckI7Z0JBQ0QsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDWixhQUFhLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1osQ0FBQztTQUFBO1FBQ0QsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUN6QixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FDN0QsQ0FBQztRQUNGLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDeEIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQzdELENBQUM7UUFDRixPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2hDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDL0Q7SUFDRCxJQUFJLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBRSxPQUFPO0lBQzlELHdCQUF3QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBQ0QsZUFBZSxhQUFhLENBQUMifQ==