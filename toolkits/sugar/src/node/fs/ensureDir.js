const __fs = require('fs-extra');

// TODO tests

/**
 * @name        ensureDir
 * @namespace           sugar.node.fs
 * @type          Function
 * @async
 *
 * Ensure that the passed directory exists. If not, will be created recursively... (async)
 *
 * @param       {String}              dir           The directory to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
 *
 * @example       js
 * const ensureDir = require('@coffeekraken/node/fs/ensureDir');
 * ensureDir('my/cool/dir').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function ensureDir(dir) {
  return __fs.ensureDir(dir);
};
