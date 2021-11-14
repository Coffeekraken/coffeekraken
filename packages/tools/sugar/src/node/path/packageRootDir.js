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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
global.packageRootDirs = {};
export default function (from = process.cwd(), highest = false) {
    const storageKey = `${from}-${highest ? 'highest' : ''}`;
    if (!from && global.packageRootDirs[storageKey])
        return global.packageRootDirs[storageKey];
    const path = __packageRoot(from, highest);
    global.packageRootDirs[storageKey] = path;
    return path;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZVJvb3REaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWNrYWdlUm9vdERpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFNLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUM1QixNQUFNLENBQUMsT0FBTyxXQUNWLE9BQWUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUM1QixPQUFPLEdBQUcsS0FBSztJQUVmLE1BQU0sVUFBVSxHQUFHLEdBQUcsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUV6RCxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQzNDLE9BQU8sTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUU5QyxNQUFNLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBRTFDLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==