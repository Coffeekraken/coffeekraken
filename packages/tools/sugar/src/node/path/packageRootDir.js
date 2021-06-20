// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
import __packageRoot from './packageRoot';
/**
 * @name                            packageRootDir
 * @namespace            node.path
 * @type                            Function
 * @stable
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
export default function (from, highest = false) {
    if (from) {
        return __packageRoot(from, highest);
    }
    const packageRootDir = __SugarConfig.get('storage.package.rootDir');
    if (packageRootDir !== undefined) {
        __fs.ensureDirSync(packageRootDir);
        return packageRootDir;
    }
    return '/';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZVJvb3REaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWNrYWdlUm9vdERpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBQzVCLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLENBQUMsT0FBTyxXQUFXLElBQWEsRUFBRSxPQUFPLEdBQUcsS0FBSztJQUVyRCxJQUFJLElBQUksRUFBRTtRQUNSLE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNyQztJQUVELE1BQU0sY0FBYyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNwRSxJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUU7UUFDaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuQyxPQUFPLGNBQWMsQ0FBQztLQUN2QjtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyJ9