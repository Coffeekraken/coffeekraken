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
 * @wip
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
//# sourceMappingURL=registerProcess.js.map