"use strict";
const __fs = require('fs-extra');
// TODO tests
/**
 * @name        writeFileSync
 * @namespace           sugar.node.fs
 * @type          Function
 *
 * Write a file. If don't exist, will be created as well as the directory structure if needed... (sync)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              data          The data to write in the file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeFileSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 *
 * @example       js
 * const writeFileSync = require('@coffeekraken/node/fs/writeFileSync');
 * try {
 *    writeFileSync('my/cool/file.txt', 'Hello World');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function writeFileSync(path, data, options = {}) {
    return __fs.outputFileSync(path, data, options);
};
