/**
 * @name              getRegisteredProcesses
 * @namespace           sugar.node.process
 * @type              Function
 *
 * This function gives you back the processes stack registered using the "registerProcess" function.
 *
 * @return      {Object}              The registered processes stack
 *
 * @example         js
 * import getRegisteredProcesses from '@coffeekraken/sugar/node/process/getRegisteredProcesses';
 * getRegisteredProcesses();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function getRegisteredProcesses() {
  if (!global._registeredProcesses) global._registeredProcesses = {};
  return global._registeredProcesses;
}
