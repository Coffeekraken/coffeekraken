// @ts-nocheck

import __folderPath from './folderPath';
import __ensureDirSync from './ensureDirSync';
import __fs from 'fs';
import __stringify from '../../shared/json/stringify';

/**
 * @name        writeJson
 * @namespace            node.fs
 * @type          Function
 * @async
 * @platform        node
 * @status          stable
 *
 * Write a JSON file. If don't exist, will be created as well as the directory structure if needed... ( (async)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              object          The object to write in the JSON file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJson()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @return      {Promise}                           A promise that will be resolved when the writeJson is completed
 *
 * @example       js
 * import writeJson from '@coffeekraken/node/fs/writeJson';
 * writeJson('my/cool/file.json', { hello: 'world' }).then(() => {
 *    // do something on complete...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function writeJson(path, data, options = {}) {
    const folderPath = __folderPath(path);
    __ensureDirSync(folderPath);
    const jsonStr = __stringify(data, null, 4);
    return __fs.writeFile(path, jsonStr);
}
export default writeJson;
