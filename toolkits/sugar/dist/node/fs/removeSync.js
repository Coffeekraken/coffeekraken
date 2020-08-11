"use strict";

var __fs = require('fs-extra'); // TODO tests

/**
 * @name        removeSync
 * @namespace           node.fs
 * @type          Function
 *
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (sync)
 *
 * @param       {String}              path           The file/directory path to delete
 *
 * @example       js
 * const removeSync = require('@coffeekraken/node/fs/removeSync');
 * try {
 *    removeSync('my/cool/file.json');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function removeSync(path) {
  return __fs.removeSync(path);
};