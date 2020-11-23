import __packageRoot from '../path/packageRoot';

/**
 * @name                initEnv
 * @namespace           sugar.node.init
 * @type                Function
 *
 * This function "simply" init some environment variables that can be useful.
 * Here's the list of added environment variables available:
 *
 * - PACKAGE_ROOT (null) {String}: Hold the filsystem package root path
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
export default function initEnv() {
  process.env.PACKAGE_ROOT = __packageRoot();
};
