"use strict";

const __initLogger = require('./initLogger');
/**
 * @name              log
 * @namespace         sugar.node.log
 * @type              Function
 *
 * Simply log your messages with different levels as 'error','warning','info','verbose','debug' or 'silly'.
 * Your messages will be saved in some separed files under the '.logs' directory.
 *
 * @param         {String}            message             Your message to log
 * @param         {String}            [level='info']      The level of your log
 *
 * @example         js
 * const log = require('@coffeekraken/sugar/node/log/log');
 * log('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function log(message, level = 'info') {
  // get the logger instance
  const logger = __initLogger();

  const symbols = {
    error: '✘',
    warn: '⚠',
    info: 'ⓘ',
    verbose: '＠',
    debug: '¶',
    silly: '★',
    header: null,
    success: '✔'
  };

  if (symbols[level]) {
    message = symbols[level] + ' ' + message;
  } // logging


  logger[level](message);
};