"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("@coffeekraken/sugar/path");
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
 * @param       {String}           [packageRootPath=__packageRootDir()]  The package root path
 * @return     {string}}       The absolute path to the passed package root path
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __monorepoToPackageAbsolutePath(path, packageRootPath = (0, path_1.__packageRootDir)()) {
    if (path.startsWith(packageRootPath))
        return path;
    if (!path.match(/^\//))
        return path;
    const monorepoRootPath = (0, path_1.__packageRootDir)(process.cwd(), {
        highest: true,
    });
    return path.replace(monorepoRootPath, packageRootPath);
}
exports.default = __monorepoToPackageAbsolutePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQTREO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILFNBQXdCLCtCQUErQixDQUNuRCxJQUFZLEVBQ1osa0JBQTBCLElBQUEsdUJBQWdCLEdBQUU7SUFFNUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3BDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSx1QkFBZ0IsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDckQsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFWRCxrREFVQyJ9