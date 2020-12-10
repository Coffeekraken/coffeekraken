// @ts-nocheck

import ILocalDir from './interface/ILocalDir';
import __sugarConfig from '../config/sugar';
import __ensureDirSync from './ensureDirSync';

/**
 * @name                            localDir
 * @namespace           sugar.node.fs
 * @type                            Function
 * @stable
 *
 * Return the .local directory path
 *
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import localDir from '@coffeekraken/node/fs/localDir';
 * localDir(); // => '/my/cool/path/.local'
 *
 * @see       https://www.npmjs.com/package/temp-dir
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn: ILocalDir = function () {
  const path = __sugarConfig('storage.localFolderPath');
  __ensureDirSync(path);
  return path;
};
export = fn;
