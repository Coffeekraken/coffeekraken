// @ts-nocheck

import __getSize from 'get-folder-size';
import __filesize from 'filesize';
import __replacePathTokens from '../path/replacePathTokens';

/**
 * @name                            folderSize
 * @namespace           sugar.node.fs
 * @type                            Function
 * @async
 * @stable
 *
 * Calculate the size of the passed folder and return it through a promise, either in raw format, either in human readdable one...
 * Support the ```replacePathTokens``` tokens
 *
 * @param             {String}                folderPath                  The folder path to calculate the size
 * @param             {Boolean}               [rawFormat=false]           If true, will return the folder size in raw format
 * @return            {Promise}                                           A promise that will be resolved once the folder size has been calculated
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import folderSize from '@coffeekraken/sugar/node/fs/folderSize';
 * folderSize('my/cool/folder').then((size) => {
 *      // do something...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function folderSize(folderPath, rawFormat = false) {
  folderPath = __replacePathTokens(folderPath);

  return new Promise(({ resolve, reject }) => {
    __getSize(folderPath, (error, size) => {
      if (error) throw error;
      resolve(rawFormat ? size : __filesize(size));
    });
  });
}
export default folderSize;
