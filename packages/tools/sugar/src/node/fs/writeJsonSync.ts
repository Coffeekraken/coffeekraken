// @ts-nocheck
import __fs from 'fs';
import __stringify from '../../shared/json/stringify.js';
import __ensureDirSync from './ensureDirSync.js';
import __folderPath from './folderPath.js';

/**
 * @name        writeJsonSync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          stable
 *
 * Write a JSON file. If don't exist, will be created as well as the directory structure if needed... (sync)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              object          The object to write in the JSON file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJsonSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 *
 * @snippet         __writeJsonSync($1, $2)
 *
 * @example       js
 * import { __writeJsonSync } from '@coffeekraken/sugar/fs';
 * __writeJsonSync('my/cool/file.json', { hello: 'world' });
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __writeJsonSync(path, data, options = {}) {
    const folderPath = __folderPath(path);
    __ensureDirSync(folderPath);
    const jsonStr = __stringify(data, null, 4);
    __fs.writeFileSync(path, jsonStr);
}
