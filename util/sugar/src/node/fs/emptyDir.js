const __fs = require('fs-extra');

/**
 * @name        emptyDir
 * @namespace     sugar.node.fs
 * @type          Function
 *
 * Empty a directory (async)
 *
 * @param       {String}              dir           The directory path to empty
 * @return      {Promise}                           A promise that will be resolved once the directory has been cleaned
 *
 * @example       js
 * const emptyDir = require('@coffeekraken/node/fs/emptyDir');
 * emptyDir('my/cool/directory').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function emptyDir(dir) {
  return __fs.emptyDir(dir);
}
