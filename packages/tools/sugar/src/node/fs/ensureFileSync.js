const __fs = require('fs-extra');

// TODO tests

/**
 * @name        ensureFileSync
 * @namespace           sugar.node.fs
 * @type          Function
 *
 * Ensure that the passed file exists. If not, will be created... (async)
 *
 * @param       {String}              file           The file to ensure that it exists...
 *
 * @example       js
 * const ensureFileSync = require('@coffeekraken/node/fs/ensureFileSync');
 * try {
 *    ensureFileSync('my/cool/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function ensureFileSync(file) {
  __fs.ensureFileSync(file);
};
