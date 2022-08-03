// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            packageTmpDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package temp directory path
 *
 * @param       {ITmpDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @setting     {String}        [scope='local']         Specify the scope in which you want your tmpDir to be returned. Can be "local" or "global"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import packageTmpDir from '@coffeekraken/node/fs/packageTmpDir';
 * packageTmpDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function () {
    const tmpDir = __SSugarConfig.get('storage.package.tmpDir');
    if (tmpDir !== undefined) {
        // __fs.ensureDirSync(tmpDir);
        return tmpDir;
    }
    // __fs.ensureDirSync(__tmpDir);
    return __tmpDir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBRUgsTUFBTSxDQUFDLE9BQU87SUFDVixNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDNUQsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQ3RCLDhCQUE4QjtRQUM5QixPQUFPLE1BQU0sQ0FBQztLQUNqQjtJQUNELGdDQUFnQztJQUNoQyxPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDIn0=