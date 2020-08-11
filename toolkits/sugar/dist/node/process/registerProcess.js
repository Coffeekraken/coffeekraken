"use strict";

var __uniquid = require('../string/uniqid');
/**
 * @name              registerProcess
 * @namespace           node.process
 * @type              Function
 *
 * This function register a (child) process in a global stack.
 * You can access these registered processes using the "getRegisteredProcesses" function.
 *
 * @param       {Process}         pro         The process you want to register
 * @param       {String}      [name=null]       A specific name for your process. By default a uniqid will be generated
 *
 * @example         js
 * const registerProcess = require('@coffeekraken/sugar/node/process/registerProcess');
 * registerProcess(childProcess.exec('ls -la'));
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function registerProcess(pro, name) {
  if (name === void 0) {
    name = __uniquid();
  }

  if (!global._registeredProcesses) global._registeredProcesses = {};
  global._registeredProcesses[name] = pro;

  if (pro && typeof pro.on === 'function') {
    pro.on('close', () => {
      delete global._registeredProcesses[name];
    });
  }
};