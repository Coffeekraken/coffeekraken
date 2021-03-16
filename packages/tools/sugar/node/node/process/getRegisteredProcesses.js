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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0UmVnaXN0ZXJlZFByb2Nlc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL3Byb2Nlc3MvZ2V0UmVnaXN0ZXJlZFByb2Nlc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxTQUFTLHNCQUFzQjtJQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQjtRQUFFLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUM7SUFDbkUsT0FBTyxNQUFNLENBQUMsb0JBQW9CLENBQUM7QUFDckMsQ0FBQztBQUNELGtCQUFlLHNCQUFzQixDQUFDIn0=