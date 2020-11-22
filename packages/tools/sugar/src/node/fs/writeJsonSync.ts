const __fs = require('fs-extra');

// TODO tests

/**
 * @name        writeJsonSync
 * @namespace           sugar.node.fs
 * @type          Function
 *
 * Write a JSON file. If don't exist, will be created as well as the directory structure if needed... (sync)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              object          The object to write in the JSON file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJsonSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 *
 * @example       js
 * const writeJsonSync = require('@coffeekraken/node/fs/writeJsonSync');
 * try {
 *    writeJsonSync('my/cool/file.json', { hello: 'world' });
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function writeJsonSync(path, data, options = {}) {
  __fs.outputJsonSync(path, data, options);
};
