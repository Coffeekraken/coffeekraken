// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            packageLocalDir
 * @namespace            node.fs
 * @type                            Function
 * @platform        node
 * @status          beta
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
 * import packageLocalDir from '@coffeekraken/node/path/packageLocalDir';
 * packageLocalDir(); // => '/my/cool/path/.local'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn = function () {
    const path = __SSugarConfig.get('storage.package.localDir');
    __fs.ensureDirSync(path);
    return path;
};
export default fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUxvY2FsRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFja2FnZUxvY2FsRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFDNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sRUFBRSxHQUFxQjtJQUN6QixNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUM7QUFDRixlQUFlLEVBQUUsQ0FBQyJ9