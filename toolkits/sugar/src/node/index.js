const __sugarConfig = require('./config/sugar');
const __SLog = require('./log/SLog');
const __isChildProcess = require('./is/childProcess');
const __packageRoot = require('./path/packageRoot');

process.on('unhandledRejection', (error) => {
  let errorArray = [`[error]`];

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
    // throw error;
  } else {
    // console.log(error);
    throw error.error || error;
    // throw error;
  }
  return;
});

/**
 * @name                    index
 * @namespace           node
 *
 * This file is the "initialisation" one for the sugar node toolkit.
 * It's optional to include it but if you do, you will get these features "for free":
 * - Logging: Get the powerfull options of the SLog class without any change in your codebase
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

// Logging
new __SLog(__sugarConfig('log'));
