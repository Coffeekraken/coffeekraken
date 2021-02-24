// @ts-nocheck

import __folderPath from './folderPath';
import __ensureDirSync from './ensureDirSync';
import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';

/**
 * @name        writeJson
 * @namespace           sugar.node.fs
 * @type          Function
 * @async
 * @stable
 *
 * Write a JSON file. If don't exist, will be created as well as the directory structure if needed... ( (async)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              object          The object to write in the JSON file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJson()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @return      {Promise}                           A promise that will be resolved when the writeJson is completed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import writeJson from '@coffeekraken/node/fs/writeJson';
 * writeJson('my/cool/file.json', { hello: 'world' }).then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function writeJson(path, data, options = {}) {
  path = __replacePathTokens(path);
  const folderPath = __folderPath(path);
  __ensureDirSync(folderPath);
  return __fs.outputJson(path, data, options);
}
export default writeJson;
