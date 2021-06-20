// @ts-nocheck

import __packageRootDir from '../path/packageRootDir';

/**
 * @name                initEnv
 * @namespace            node.init
 * @type                Function
 * @status              wip
 *
 * This function "simply" init some environment variables that can be useful.
 * Here's the list of added environment variables available:
 *
 * - PACKAGE_ROOT (null) {String}: Hold the filsystem package root path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
function initEnv() {
  process.env.PACKAGE_ROOT = __packageRootDir();
}
export default initEnv;
