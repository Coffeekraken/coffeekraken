const __fs = require('fs-extra');

// TODO tests

/**
 * @name        ensureFile
 * @namespace           sugar.node.fs
 * @type          Function
 * @async
 *
 * Ensure that the passed file exists. If not, it will be created... (async)
 *
 * @param       {String}              file           The file to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the file has been created if needed...
 *
 * @example       js
 * const ensureFile = require('@coffeekraken/node/fs/ensureFile');
 * ensureFile('my/cool/file.jpg').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function ensureFile(file) {
  return __fs.ensureFile(file);
};
