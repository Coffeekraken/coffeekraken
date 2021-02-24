// @ts-nocheck

import __folderPath from './folderPath';
import __ensureDirSync from './ensureDirSync';
import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';

/**
 * @name        writeFile
 * @namespace           sugar.node.fs
 * @type          Function
 * @async
 * @stable
 *
 * CWrite a file. If don't exist, will be created as well as the directory structure if needed... ( (async)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              data          The data to write in the file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeFile()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @return      {Promise}                           A promise that will be resolved when the writeFile is completed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import writeFile from '@coffeekraken/node/fs/writeFile';
 * writeFile('my/cool/file.txt', 'Hello World').then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function writeFile(path, data, options = {}) {
  path = __replacePathTokens(path);
  const folderPath = __folderPath(path);
  __ensureDirSync(folderPath);
  return __fs.outputFile(path, data, options);
}
export default writeFile;
