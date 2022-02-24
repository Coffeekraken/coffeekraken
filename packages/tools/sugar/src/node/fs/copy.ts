// @ts-nocheck

import __fs from 'fs-extra';

/**
 * @name        copy
 * @namespace            node.fs
 * @type          Function
 * @async
 * @platform        node
 * @status          beta
 *
 * Copy a file or directory (async)
 *
 * @param       {String}              src           The source path to copy
 * @param       {String}              dest          The destination path
 * @return      {Promise}                           A promise that will be resolved when the copy is completed
 *
 * @example       js
 * import copy from '@coffeekraken/node/fs/copy';
 * copy('my/cool/file.jpg', 'my/new/file.jpg').then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function copy(src, dest) {
    return __fs.copy(src, dest);
}
export default copy;
