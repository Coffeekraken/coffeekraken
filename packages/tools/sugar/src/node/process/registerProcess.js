"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = registerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJQcm9jZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXJQcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsOERBQXlDO0FBRXpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxnQkFBUyxFQUFFO0lBQzlDLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CO1FBQUUsTUFBTSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQztJQUNuRSxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3hDLElBQUksR0FBRyxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUUsS0FBSyxVQUFVLEVBQUU7UUFDdkMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ25CLE9BQU8sTUFBTSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDO0FBQ0QsaUJBQVMsZUFBZSxDQUFDIn0=