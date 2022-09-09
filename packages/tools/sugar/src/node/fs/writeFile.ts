// @ts-nocheck

import { __folderPath, __ensureDirSync } from '@coffeekraken/sugar/fs';
import __fs from 'fs-extra';

/**
 * @name        writeFile
 * @namespace            node.fs
 * @type          Function
 * @async
 * @platform        node
 * @status          stable
 *
 * CWrite a file. If don't exist, will be created as well as the directory structure if needed... ( (async)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              data          The data to write in the file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeFile()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @return      {Promise}                           A promise that will be resolved when the writeFile is completed
 *
 * @example       js
 * import { __writeFile } from '@coffeekraken/sugar/fs';
 * __writeFile('my/cool/file.txt', 'Hello World').then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __writeFile(path, data, options = {}) {
    return new Promise(async (resolve) => {
        const folderPath = __folderPath(path);
        __ensureDirSync(folderPath);
        await __fs.outputFile(path, data, options);
        resolve(path);
    });
}
