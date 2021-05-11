// @ts-nocheck

import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SLog from '@coffeekraken/s-log';
import __handleError from './error/handleError';
import __initEnv from './init/initEnv';
import __onProcessExit from './process/onProcessExit';
import __exitCleanup from './process/exitCleanup';
import __hotkey from './keyboard/hotkey';
// import __registerSFileClasses from './fs/registerSFileClasses';

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

// init env
__initEnv();

// handle the errors
__handleError();

// exit cleanup
__onProcessExit(() => {
  return __exitCleanup;
});

// SFile classes
// __registerSFileClasses();

// Logging
// new __SLog(__sugarConfig('log'));
