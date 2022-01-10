import __resolvePackagePath from 'resolve-package-path';
import __packageRoot from '../path/packageRoot';
/**
 * @name                resolvePackagePath
 * @namespace           node.esm
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function allows you to resolve a passed package name or a folder directory to it's package.json file
 *
 * @param       {String}            package         The package bane you want to get the path for
 * @param       {String}           [baseDir=`${__packageRoot()}/node_modules`]      The directory from which to search for the package
 * @return      {String}                  The absolute path to the requested package
 *
 * @example         js
 * import resolvePackagePath from '@coffeekraken/sugar/node/esm/resolvePackagePath';
 * resolvePackagePath('something');
 *
 * @see             https://www.npmjs.com/package/resolve-package-path
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function resolvePackagePath(pkg, baseDir = `${__packageRoot()}/node_modules`) {
    var _a;
    return (_a = __resolvePackagePath(pkg, baseDir)) === null || _a === void 0 ? void 0 : _a.replace(/\/package\.json$/, '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZVBhY2thZ2VQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzb2x2ZVBhY2thZ2VQYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxhQUFhLE1BQU0scUJBQXFCLENBQUM7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FBQyxHQUFXLEVBQUUsVUFBa0IsR0FBRyxhQUFhLEVBQUUsZUFBZTs7SUFDdkcsT0FBTyxNQUFBLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsMENBQUUsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9FLENBQUMifQ==