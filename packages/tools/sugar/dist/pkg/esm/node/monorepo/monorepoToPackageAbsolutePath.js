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
export default function monorepoToPackageAbsolutePath(path, packageRootPath = __packageRoot()) {
    if (path.startsWith(packageRootPath))
        return path;
    if (!path.match(/^\//))
        return path;
    const monorepoRootPath = __packageRoot(process.cwd(), {
        highest: true,
    });
    return path.replace(monorepoRootPath, packageRootPath);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsNkJBQTZCLENBQ2pELElBQVksRUFDWixrQkFBMEIsYUFBYSxFQUFFO0lBRXpDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQztJQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQztJQUNwQyxNQUFNLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDbEQsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQzNELENBQUMifQ==