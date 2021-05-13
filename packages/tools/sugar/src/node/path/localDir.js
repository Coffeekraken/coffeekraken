// @ts-nocheck
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            localDir
 * @namespace            node.fs
 * @type                            Function
 * @stable
 *
 * Return the .local directory path
 *
 * @return                {String}                      The path to the .local package directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import localDir from '@coffeekraken/node/path/localDir';
 * localDir(); // => '/my/cool/path/.local'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn = function () {
    const path = __sugarConfig('storage.localDir');
    __fs.ensureDirSync(path);
    return path;
};
export default fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2NhbERpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBQzVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sRUFBRSxHQUFjO0lBQ3BCLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7QUFDRixlQUFlLEVBQUUsQ0FBQyJ9