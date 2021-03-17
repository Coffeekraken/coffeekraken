"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              getRegisteredProcesses
 * @namespace           sugar.node.process
 * @type              Function
 * @status              wip
 *
 * This function gives you back the processes stack registered using the "registerProcess" function.
 *
 * @return      {Object}              The registered processes stack
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import getRegisteredProcesses from '@coffeekraken/sugar/node/process/getRegisteredProcesses';
 * getRegisteredProcesses();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getRegisteredProcesses() {
    if (!global._registeredProcesses)
        global._registeredProcesses = {};
    return global._registeredProcesses;
}
exports.default = getRegisteredProcesses;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UmVnaXN0ZXJlZFByb2Nlc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFJlZ2lzdGVyZWRQcm9jZXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7O0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBUyxzQkFBc0I7SUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0I7UUFBRSxNQUFNLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO0lBQ25FLE9BQU8sTUFBTSxDQUFDLG9CQUFvQixDQUFDO0FBQ3JDLENBQUM7QUFDRCxrQkFBZSxzQkFBc0IsQ0FBQyJ9