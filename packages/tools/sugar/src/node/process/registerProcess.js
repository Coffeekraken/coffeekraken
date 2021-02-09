"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("../string/uniqid"));
/**
 * @name              registerProcess
 * @namespace           sugar.node.process
 * @type              Function
 * @status              wip
 *
 * This function register a (child) process in a global stack.
 * You can access these registered processes using the "getRegisteredProcesses" function.
 *
 * @param       {Process}         pro         The process you want to register
 * @param       {String}      [name=null]       A specific name for your process. By default a uniqid will be generated
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import registerProcess from '@coffeekraken/sugar/node/process/registerProcess';
 * registerProcess(childProcess.exec('ls -la'));
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function registerProcess(pro, name = uniqid_1.default()) {
    if (!global._registeredProcesses)
        global._registeredProcesses = {};
    global._registeredProcesses[name] = pro;
    if (pro && typeof pro.on === 'function') {
        pro.on('close', () => {
            delete global._registeredProcesses[name];
        });
    }
}
exports.default = registerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXJQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhEQUF5QztBQUV6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLEdBQUcsZ0JBQVMsRUFBRTtJQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQjtRQUFFLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUM7SUFDbkUsTUFBTSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN4QyxJQUFJLEdBQUcsSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLEtBQUssVUFBVSxFQUFFO1FBQ3ZDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNuQixPQUFPLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQztBQUNELGtCQUFlLGVBQWUsQ0FBQyJ9