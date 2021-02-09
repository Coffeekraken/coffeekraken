// @ts-nocheck
import __sugarConfig from '../config/sugar';
import __ensureDirSync from '../fs/ensureDirSync';

/**
 * @name                            localDir
 * @namespace           sugar.node.fs
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
const fn: ILocalDir = function () {
  const path = __sugarConfig('storage.localDir');
  __ensureDirSync(path);
  return path;
};
export default fn;
