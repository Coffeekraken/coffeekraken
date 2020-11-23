import __fs from 'fs-extra';

// TODO tests

/**
 * @name        copy
 * @namespace           sugar.node.fs
 * @type          Function
 * @async
 *
 * Copy a file or directory (async)
 *
 * @param       {String}              src           The source path to copy
 * @param       {String}              dest          The destination path
 * @return      {Promise}                           A promise that will be resolved when the copy is completed
 *
 * @example       js
 * import copy from '@coffeekraken/node/fs/copy';
 * copy('my/cool/file.jpg', 'my/new/file.jpg').then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function copy(src, dest) {
  return __fs.copy(src, dest);
}
