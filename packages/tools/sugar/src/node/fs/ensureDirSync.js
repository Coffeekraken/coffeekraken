"use strict";
const __fs = require('fs-extra');
// TODO tests
/**
 * @name        ensureDirSync
 * @namespace           sugar.node.fs
 * @type          Function
 *
 * Ensure that the passed directory exists. If not, will be created recursively... (sync)
 *
 * @param       {String}              dir           The directory to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
 *
 * @example       js
 * const ensureDirSync = require('@coffeekraken/node/fs/ensureDirSync');
 * try {
 *    ensureDirSync('my/cool/dir');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function ensureDirSync(dir) {
    __fs.ensureDirSync(dir);
};
