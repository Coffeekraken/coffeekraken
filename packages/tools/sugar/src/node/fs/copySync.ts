const __fs = require('fs-extra');

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
 * const copySync = require('@coffeekraken/node/fs/copySync');
 * try {
 *    copySync('my/cool/file.jpg', 'my/new/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function copySync(src, dest) {
  __fs.copySync(src, dest);
};
