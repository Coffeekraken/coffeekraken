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
const fn: IpackageLocalDir = function () {
  const path = __SugarConfig.get('storage.package.localDir');
  __fs.ensureDirSync(path);
  return path;
};
export default fn;
