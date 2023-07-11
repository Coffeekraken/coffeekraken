import __packageRootDir from '../path/packageRootDir.js';
/**
 * @name            monorepoToPackageAbsolutePath
 * @type            Function
 * @private
 *
 * This static method allows you to make the passed path absolute to the package root passed.
 * It will check if the passed package is in a monorepo, and relace the monorepo root path with the passed
 * package root path.
 *
 * @param      {String}           path      The path to make absolute from the passed package root
 * @param       {String}           [packageRootPath=__packageRootDir()]  The package root path
 * @return     {string}}       The absolute path to the passed package root path
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __monorepoToPackageAbsolutePath(path, packageRootPath = __packageRootDir()) {
    if (path.startsWith(packageRootPath))
        return path;
    if (!path.match(/^\//))
        return path;
    const monorepoRootPath = __packageRootDir(process.cwd(), {
        highest: true,
    });
    return path.replace(monorepoRootPath, packageRootPath);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWdCLE1BQU0sMkJBQTJCLENBQUM7QUFFekQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSwrQkFBK0IsQ0FDbkQsSUFBWSxFQUNaLGtCQUEwQixnQkFBZ0IsRUFBRTtJQUU1QyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDcEMsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDckQsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQzNELENBQUMifQ==