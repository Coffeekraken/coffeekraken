import __packageRoot from '../path/packageRoot';

/**
 * @name            monorepoToPackageAbsolutePath
 * @type            Function
 * @static
 *
 * This static method allows you to make the passed path absolute to the package root passed.
 * It will check if the passed package is in a monorepo, and relace the monorepo root path with the passed
 * package root path.
 *
 * @param      {String}           path      The path to make absolute from the passed package root
 * @param       {String}           [packageRootPath=__packageRoot()]  The package root path
 * @return     {string}}       The absolute path to the passed package root path
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __monorepoToPackageAbsolutePath(
    path: string,
    packageRootPath: string = __packageRoot(),
): string {
    if (path.startsWith(packageRootPath)) return path;
    if (!path.match(/^\//)) return path;
    const monorepoRootPath = __packageRoot(process.cwd(), {
        highest: true,
    });
    return path.replace(monorepoRootPath, packageRootPath);
}
