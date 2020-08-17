const __sugarConfig = require('./config/sugar');
const __SLog = require('./log/SLog');
const __handleError = require('./error/handleError');
const __initEnv = require('./init/initEnv');
const __isChildProcess = require('./is/childProcess');

// init env
__initEnv();

// handle the errors
if (!__isChildProcess()) {
  // process.on('uncaughtException', __handleError);
  // process.on('unhandledRejection', __handleError);
}

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
