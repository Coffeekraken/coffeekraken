const __getSize = require('get-folder-size');
const __filesize = require('filesize');

// TODO tests

/**
 * @name                            folderSize
 * @namespace                       sugar.node.fs
 * @type                            Function
 * @async
 *
 * Calculate the size of the passed folder and return it through a promise, either in raw format, either in human readdable one...
 *
 * @param             {String}                folderPath                  The folder path to calculate the size
 * @param             {Boolean}               [rawFormat=false]           If true, will return the folder size in raw format
 * @return            {Promise}                                           A promise that will be resolved once the folder size has been calculated
 *
 * @example           js
 * const folderSize = require('@coffeekraken/sugar/node/fs/folderSize');
 * folderSize('my/cool/folder').then((size) => {
 *      // do something...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function folderSize(folderPath, rawFormat = false) {
  return new Promise((resolve, reject) => {

    __getSize(folderPath, (error, size) => {
      if (error) throw error;
      resolve(rawFormat ? size : __filesize(size));
    });

  });
}
