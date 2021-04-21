// @ts-nocheck

import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';

/**
 * @name        copySync
 * @namespace            node.fs
 * @type          Function
 * @stable
 *
 * Copy a file or directory (sync)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              src           The source path to copy
 * @param       {String}              dest          The destination path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import copySync from '@coffeekraken/node/fs/copySync';
 * try {
 *    copySync('my/cool/file.jpg', 'my/new/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function copySync(src, dest) {
  src = __replacePathTokens(src);
  dest = __replacePathTokens(dest);
  __fs.copySync(src, dest);
}
export default copySync;
