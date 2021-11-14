// @ts-nocheck

import __fs from 'fs-extra';

/**
 * @name        ensureFile
 * @namespace            node.fs
 * @type          Function
 * @async
 * @platform        node
 * @status          beta
 *
 * Ensure that the passed file exists. If not, it will be created... (async)
 *
 * @param       {String}              file           The file to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the file has been created if needed...
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
    return __fs.ensureFile(file);
}
export default ensureFile;
