// @ts-nocheck
import __packageRoot from './packageRoot';
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
export default function (from = process.cwd(), settings = {}) {
    const storageKey = `${from}-${settings.highest ? 'highest' : ''}`;
    if (!from && global.packageRootDirs[storageKey])
        return global.packageRootDirs[storageKey];
    const path = __packageRoot(from, settings);
    global.packageRootDirs[storageKey] = path;
    return path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFHZCxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQU0sQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzVCLE1BQU0sQ0FBQyxPQUFPLFdBQ1YsT0FBZSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQzVCLFdBQTBDLEVBQUU7SUFFNUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxJQUFJLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUVsRSxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzNDLE9BQU8sTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUU5QyxNQUFNLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBRTFDLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==