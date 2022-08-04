"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
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
function monorepoToPackageAbsolutePath(path, packageRootPath = (0, packageRoot_1.default)()) {
    if (path.startsWith(packageRootPath))
        return path;
    if (!path.match(/^\//))
        return path;
    const monorepoRootPath = (0, packageRoot_1.default)(process.cwd(), {
        highest: true,
    });
    return path.replace(monorepoRootPath, packageRootPath);
}
exports.default = monorepoToPackageAbsolutePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0VBQWdEO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILFNBQXdCLDZCQUE2QixDQUNqRCxJQUFZLEVBQ1osa0JBQTBCLElBQUEscUJBQWEsR0FBRTtJQUV6QyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDcEMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFBLHFCQUFhLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2xELE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUMsQ0FBQztJQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBVkQsZ0RBVUMifQ==