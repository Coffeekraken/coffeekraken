// @ts-nocheck
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            packageLocalDir
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
 * import packageLocalDir from '@coffeekraken/node/path/packageLocalDir';
 * packageLocalDir(); // => '/my/cool/path/.local'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn = function () {
    const path = __SugarConfig.get('storage.package.localDir');
    __fs.ensureDirSync(path);
    return path;
};
export default fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUxvY2FsRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFja2FnZUxvY2FsRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFDNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxFQUFFLEdBQXFCO0lBQzNCLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDO0FBQ0YsZUFBZSxFQUFFLENBQUMifQ==