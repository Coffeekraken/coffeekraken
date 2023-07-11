// @ts-nocheck

import __path from 'path';
import __uniqid from '../../node/string/uniqid.js';
import __packageTmpDir from '../path/packageTmpDir.js';
import __writeFileSync from './writeFileSync.js';

/**
 * @name        writeTmpFile
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
 * @param       {IWriteTmpFileSettings}         [settings={}]           Some settings to customize your temp file creation
 * @return      {Promise<String>}                           A promise that will be resolved when the writeTmpFile is completed with the path to it
 *
 * @setting         {String}            [path=null]         A path relative to the temp folder to store your file
 *
 * @snippet         __writeTmpFile($1, $2)
 * await __writeTmpFile($1, $2)
 *
 * @todo      tests
 *
 * @example       js
 * import { __writeTmpFile } from '@coffeekraken/sugar/fs';
 * __writeTmpFile('Hello World').then((path) => {
 *    // do something on complete...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IWriteTmpFileSettings {
    path: string;
}

export default function __writeTmpFile(
    data,
    settings: Partial<IWriteTmpFileSettings> = {},
): Promise<String> {
    settings = {
        path: undefined,
        ...settings,
    };

    let path = __path.resolve(
        __packageTmpDir(),
        settings.path ?? __uniqid() + '.tmp',
    );
    __writeFileSync(path, data);
    return path;
}
