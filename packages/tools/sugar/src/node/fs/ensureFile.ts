// @ts-nocheck

import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';

/**
 * @name        ensureFile
 * @namespace            node.fs
 * @type          Function
 * @async
 * @stable
 *
 * Ensure that the passed file exists. If not, it will be created... (async)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              file           The file to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the file has been created if needed...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import ensureFile from '@coffeekraken/node/fs/ensureFile';
 * ensureFile('my/cool/file.jpg').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ensureFile(file) {
  file = __replacePathTokens(file);
  return __fs.ensureFile(file);
}
export default ensureFile;
