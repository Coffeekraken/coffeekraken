// @ts-nocheck

import __writeFileSync from './writeFileSync';
import __require from '../esm/require';
import __path from 'path';
import __uniqid from '../../shared/string/uniqid';

/**
 * @name        writeTmpFileSync
 * @namespace            node.fs
 * @type          Function
 * @async
 * @platform        ts
 * @platform        node
 * @status          stable
 *
 * Create a temporary file on the disk with the passed content and returns the path
 * to it.
 *
 * @param       {String}              data          The data to write in the file
 * @param       {IWriteTmpFileSyncSettings}         [settings={}]           Some settings to customize your temp file creation
 * @return      {Promise}                           A promise that will be resolved when the writeTmpFileSync is completed with the path to it
 *
 * @setting         {String}            [path=null]         A path relative to the temp folder to store your file
 *
 * @todo      tests
 *
 * @example       js
 * import writeTmpFileSync from '@coffeekraken/node/fs/writeTmpFileSync';
 * const path = writeTmpFileSync('Hello World');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IWriteTmpFileSyncSettings {
    path: string;
}

function writeTmpFileSync(
    data,
    settings: Partial<IWriteTmpFileSyncSettings> = {},
) {
    settings = {
        path: undefined,
        ...settings,
    };

    const __packageTmpDir = __require('../path/packageTmpDir').default;

    let path = __path.resolve(
        __packageTmpDir(),
        settings.path ?? __uniqid() + '.tmp',
    );
    __writeFileSync(path, data);
    return path;
}
export default writeTmpFileSync;
