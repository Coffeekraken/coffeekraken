const __isChildProcess = require('../is/childProcess');
const __packageRoot = require('../path/packageRoot');
const __SError = require('../error/SError');
const __parseHtml = require('../terminal/parseHtml');

/**
 * @name                    handleError
 * @namespace               node.error
 * @type                    Function
 *
 * This function take a thrown error and try to display it the best way possible.
 * Simply add the "uncaughtException" and the "unhandledRejection" listeners on the process object,
 * pass this function as the handler one and that's it...
 *
 * @example           js
 * const handleError = require('@coffeekraken/sugar/node/error/handleError');
 * process.on('uncaughtException', handleError);
 * process.on('unhandledRejection', handleError);
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function handleError(error) {
  if (__isChildProcess()) {
    console.log(error.toString());
  } else {
    error.message = __parseHtml(error.message);
    error.stack = '';
    throw error;
  }
};
