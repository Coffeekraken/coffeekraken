import __resolvePackagePath from 'resolve-package-path';
import { __packageRootDir } from '@coffeekraken/sugar/path';
/**
 * @name                resolvePackagePath
 * @namespace           node.module
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function allows you to resolve a passed package name or a folder directory to it's package.json file
 *
 * @param       {String}            package         The package bane you want to get the path for
 * @param       {String}           [baseDir=`${__packageRootDir()}/node_modules`]      The directory from which to search for the package
 * @return      {String}                  The absolute path to the requested package
 *
 * @example         js
 * import { __resolvePackagePath } from '@coffeekraken/sugar/module';
 * __resolvePackagePath('something');
 *
 * @see             https://www.npmjs.com/package/resolve-package-path
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function resolvePackagePath(pkg, baseDir = `${__packageRootDir()}/node_modules`) {
    var _a;
    return (_a = __resolvePackagePath(pkg, baseDir)) === null || _a === void 0 ? void 0 : _a.replace(/\/package\.json$/, '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FDdEMsR0FBVyxFQUNYLFVBQWtCLEdBQUcsZ0JBQWdCLEVBQUUsZUFBZTs7SUFFdEQsT0FBTyxNQUFBLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsMENBQUUsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9FLENBQUMifQ==