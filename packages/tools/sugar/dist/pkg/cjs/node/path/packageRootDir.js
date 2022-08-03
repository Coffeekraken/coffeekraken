"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("./packageRoot"));
/**
 * @name                            packageRootDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package root directory path
 *
 * @param       {IPackageRootDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @setting     {String}        [scope='local']         Specify the scope in which you want your packageRootDir to be returned. Can be "local" or "global"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import packageRootDir from '@coffeekraken/node/fs/packageRootDir';
 * packageRootDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
global.packageRootDirs = {};
function default_1(from = process.cwd(), settings = {}) {
    const storageKey = `${from}-${settings.highest ? 'highest' : ''}`;
    if (!from && global.packageRootDirs[storageKey])
        return global.packageRootDirs[storageKey];
    const path = (0, packageRoot_1.default)(from, settings);
    global.packageRootDirs[storageKey] = path;
    return path;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUdkLGdFQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsTUFBTSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFDNUIsbUJBQ0ksT0FBZSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQzVCLFdBQTBDLEVBQUU7SUFFNUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxJQUFJLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUVsRSxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzNDLE9BQU8sTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUU5QyxNQUFNLElBQUksR0FBRyxJQUFBLHFCQUFhLEVBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBRTFDLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFiRCw0QkFhQyJ9