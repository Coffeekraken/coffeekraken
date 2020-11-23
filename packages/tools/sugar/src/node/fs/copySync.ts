import __fs from 'fs-extra';

// TODO tests

/**
 * @name        copySync
 * @namespace           sugar.node.fs
 * @type          Function
 *
 * Copy a file or directory (sync)
 *
 * @param       {String}              src           The source path to copy
 * @param       {String}              dest          The destination path
 *
 * @example       js
 * import copySync from '@coffeekraken/node/fs/copySync';
 * try {
 *    copySync('my/cool/file.jpg', 'my/new/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function copySync(src, dest) {
  __fs.copySync(src, dest);
}
