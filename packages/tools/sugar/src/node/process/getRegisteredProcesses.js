"use strict";
// @ts-nocheck
/**
 * @name              getRegisteredProcesses
 * @namespace           sugar.node.process
 * @type              Function
 * @wip
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
module.exports = getRegisteredProcesses;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UmVnaXN0ZXJlZFByb2Nlc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFJlZ2lzdGVyZWRQcm9jZXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxTQUFTLHNCQUFzQjtJQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQjtRQUFFLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUM7SUFDbkUsT0FBTyxNQUFNLENBQUMsb0JBQW9CLENBQUM7QUFDckMsQ0FBQztBQUNELGlCQUFTLHNCQUFzQixDQUFDIn0=