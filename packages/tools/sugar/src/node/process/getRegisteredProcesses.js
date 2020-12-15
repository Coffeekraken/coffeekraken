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
//# sourceMappingURL=getRegisteredProcesses.js.map