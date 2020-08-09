const __isChildProcess = require('../is/childProcess');
const __packageRoot = require('../path/packageRoot');

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
  let errorArray = [];

  if (error.name && error.name !== 'Error') {
    errorArray.push(error.name);
    errorArray.push('\n');
  }
  if (error.fileName && error.lineNumber) {
    errorArray.push(error.fileName + ':' + error.lineNumber);
    errorArray.push('\n');
  }
  if (error.stack) {
    errorArray.push(error.message.replace(__packageRoot() + '/', ''));
    let stack = error.stack.replace('Error: ', '').split('at ').join('\n\nat ');
    const files = stack.match(/at\s(.*)\((.*)\)/g);
    files.forEach((file) => {
      const matches = file.match(/[0-9]+:[0-9]+/);
      if (matches) {
        file = file.replace(matches[0], `<magenta>${matches[0]}</magenta>`);
      }
      errorArray.push(' ');
      errorArray.push(
        `${file
          .replace('(', '\n<cyan>')
          .replace(')', '</cyan>')
          .replace(__packageRoot() + '/', '')}`
      );
    });
  } else if (error.message) errorArray.push(error.message);

  if (__isChildProcess()) {
    console.log(errorArray.join('\n'));
  } else {
    throw error.error || error;
  }
};
