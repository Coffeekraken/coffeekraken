// @ts-nocheck

import __path from 'path';
import __uniqid from '../../shared/string/uniqid';
import { __packageTmpDir } from '@coffeekraken/sugar/path';
import { __writeFileSync } from '@coffeekraken/sugar/fs';

/**
 * @name        writeTmpFileSync
 * @namespace            node.fs
 * @type          Function
 * @async
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
 * import { __writeTmpFileSync } from '@coffeekraken/sugar/fs';
 * const path = __writeTmpFileSync('Hello World');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IWriteTmpFileSyncSettings {
    path: string;
}

export default function __writeTmpFileSync(
    data,
    settings: Partial<IWriteTmpFileSyncSettings> = {},
) {
    settings = {
        path: undefined,
        ...settings,
    };

    let path = __path.resolve(
        __packageTmpDir(),
        'files',
        settings.path ?? __uniqid() + '.tmp',
    );
    __writeFileSync(path, data);
    return path;
}
