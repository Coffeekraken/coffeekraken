// @ts-nocheck
import __packageRoot from '../path/packageRoot';
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
    process.env.PACKAGE_ROOT = __packageRoot();
}
export default initEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdEVudi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXRFbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILFNBQVMsT0FBTztJQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLGFBQWEsRUFBRSxDQUFDO0FBQzdDLENBQUM7QUFDRCxlQUFlLE9BQU8sQ0FBQyJ9