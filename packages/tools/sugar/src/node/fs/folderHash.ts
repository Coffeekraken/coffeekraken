import { BinaryToTextEncoding } from 'crypto';
import __fs from 'fs';
import __sha256 from '../../shared/crypt/sha256';
import __isDirectory from '../is/directory';
import __fileHash from './fileHash';

/**
 * @name            folderHash
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This function allows you to get back an integrity hash for the passed folder.
 * This mean that if a folder returns the same integrity hash twice, the folder or files in it
 * has not been updated...
 *
 * @param           {String}            folderPath      The folder path you want to get the hash back
 * @param           {IFolderHashSettings}       [settings={}]       Some settings to configure your hash generation process
 * @return          {String}                            The calculated folder hash
 *
 * @setting         {Boolean}           [recursive=true]            Specify if you want to generate a hash using also the children or not
 * @setting         {String}            [algo='sha356']             The algorithm to use
 * @setting         {BinaryToTextEncoding}      [digest='base64']       How to digest the hash
 *
 * @example         js
 * import folderHash from '@coffeekraken/sugar/node/fs/folderHash';
 * folderHash('my/cool/folder'); // => YZOrKDx9LCLd8X39PoFTflXGpRU=,
 *
 * @see             https://www.npmjs.com/package/folder-hash
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IFolderHashSettings {
    recursive: boolean;
    algo: string;
    digest: BinaryToTextEncoding;
}

export default function folderHash(
    folderPath: string,
    settings: Partial<IFolderHashSettings> = {},
): string {
    settings = {
        recursive: true,
        algo: 'sha256',
        digest: 'base64',
        ...settings,
    };
    const paths: string[] = [];

    function readDir(dir) {
        const files = __fs.readdirSync(folderPath);
        files.forEach((filePath) => {
            if (settings.recursive && __isDirectory(filePath))
                return readDir(filePath);
            paths.push(`${dir}/${filePath}`);
        });
    }

    readDir(folderPath);

    const filesHashes: string[] = [];

    paths.forEach((path) => {
        filesHashes.push(__fileHash(path, settings));
    });

    return __sha256.encrypt(filesHashes.join('-'));
}
