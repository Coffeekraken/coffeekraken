// @ts-nocheck

import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';

/**
 * @name        emptyDir
 * @namespace           sugar.node.fs
 * @type          Function
 * @async
 * @stable
 *
 * Empty a directory (async)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              dir           The directory path to empty
 * @return      {Promise}                           A promise that will be resolved once the directory has been cleaned
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import emptyDir from '@coffeekraken/node/fs/emptyDir';
 * emptyDir('my/cool/directory').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function emptyDir(dir) {
  dir = __replacePathTokens(dir);
  return __fs.emptyDir(dir);
}
export default emptyDir;
