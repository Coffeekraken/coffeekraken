"use strict";

var __uniquid = require('../string/uniqid');
/**
 * @name              getRegisteredProcesses
 * @namespace           node.process
 * @type              Function
 *
 * This function gives you back the processes stack registered using the "registerProcess" function.
 *
 * @return      {Object}              The registered processes stack
 *
 * @example         js
 * const getRegisteredProcesses = require('@coffeekraken/sugar/node/process/getRegisteredProcesses');
 * getRegisteredProcesses();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function getRegisteredProcesses() {
  if (!global._registeredProcesses) global._registeredProcesses = {};
  return global._registeredProcesses;
};