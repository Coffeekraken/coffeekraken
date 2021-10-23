// @ts-nocheck
import __packageRoot from './packageRoot';
/**
 * @name                            packageRootDir
 * @namespace            node.path
 * @type                            Function
 * @platform        ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZVJvb3REaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWNrYWdlUm9vdERpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFDNUIsTUFBTSxDQUFDLE9BQU8sV0FDVixPQUFlLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDNUIsT0FBTyxHQUFHLEtBQUs7SUFFZixNQUFNLFVBQVUsR0FBRyxHQUFHLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFFekQsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUMzQyxPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFOUMsTUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxQyxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUUxQyxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=