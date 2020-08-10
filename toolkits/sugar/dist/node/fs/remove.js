"use strict";

const __fs = require('fs-extra'); // TODO tests

/**
 * @name        remove
 * @namespace           node.fs
 * @type          Function
 *
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (async)
 *
 * @param       {String}              path           The file/directory path to delete
 * @return      {Promise}                           A promise that will be resolved when the remove is completed
 *
 * @example       js
 * const remove = require('@coffeekraken/node/fs/remove');
 * remove('my/cool/file.json').then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function remove(path) {
  return __fs.remove(path);
};