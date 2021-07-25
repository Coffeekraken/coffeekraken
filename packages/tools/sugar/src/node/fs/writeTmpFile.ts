// @ts-nocheck

import __writeFileSync from './writeFileSync';
import __packageTmpDir from '../path/packageTmpDir';
import __path from 'path';
import __uniqid from '../../shared/string/uniqid';
import __replacePathTokens from '../path/replacePathTokens';

/**
 * @name        writeTmpFile
 * @namespace            node.fs
 * @type          Function
 * @async
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * Create a temporary file on the disk with the passed content and returns the path
 * to it.
 * 
 * @param       {String}              data          The data to write in the file
 * @param       {IWriteTmpFileSettings}         [settings={}]           Some settings to customize your temp file creation
 * @return      {Promise}                           A promise that will be resolved when the writeTmpFile is completed with the path to it
 *
 * @setting         {String}            [path=null]         A path relative to the temp folder to store your file
 * 
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import writeTmpFile from '@coffeekraken/node/fs/writeTmpFile';
 * writeTmpFile('Hello World').then((path) => {
 *    // do something on complete...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IWriteTmpFileSettings {
    path: string;
}

function writeTmpFile(data, settings: Partial<IWriteTmpFileSettings> = {}) {

    settings = {
        path: undefined,
        ...settings
    };

    let path = __path.resolve(__packageTmpDir(), settings.path ?? __uniqid() + '.tmp' );
  path = __replacePathTokens(path);
    __writeFileSync(path, data);
    return path;
}
export default writeTmpFile;
