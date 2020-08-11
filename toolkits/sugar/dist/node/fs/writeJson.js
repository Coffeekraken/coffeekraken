"use strict";

var __fs = require('fs-extra'); // TODO tests

/**
 * @name        writeJson
 * @namespace           node.fs
 * @type          Function
 * @async
 *
 * Write a JSON file. If don't exist, will be created as well as the directory structure if needed... ( (async)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              object          The object to write in the JSON file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJson()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @return      {Promise}                           A promise that will be resolved when the writeJson is completed
 *
 * @example       js
 * const writeJson = require('@coffeekraken/node/fs/writeJson');
 * writeJson('my/cool/file.json', { hello: 'world' }).then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function writeJson(path, data, options) {
  if (options === void 0) {
    options = {};
  }

  return __fs.outputJson(path, data, options);
};