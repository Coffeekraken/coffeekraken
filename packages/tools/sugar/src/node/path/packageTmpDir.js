// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            packageTmpDir
 * @namespace            node.path
 * @type                            Function
 * @stable
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function () {
    const tmpDir = __SugarConfig.get('storage.package.tmpDir');
    if (tmpDir !== undefined) {
        __fs.ensureDirSync(tmpDir);
        return tmpDir;
    }
    __fs.ensureDirSync(__tmpDir);
    return __tmpDir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZVRtcERpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhY2thZ2VUbXBEaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLFVBQVUsQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLENBQUMsT0FBTztJQUNaLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUMzRCxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixPQUFPLE1BQU0sQ0FBQztLQUNmO0lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIn0=