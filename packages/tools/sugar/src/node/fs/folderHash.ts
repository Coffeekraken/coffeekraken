import { __fileHash } from '@coffeekraken/sugar/fs';
import { __isDirectory } from '@coffeekraken/sugar/is';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { BinaryToTextEncoding } from 'crypto';
import __fs from 'fs';
import __sha256 from '../../shared/crypto/sha256';

/**
 * @name            folderHash
 * @namespace       node.fs
 * @type            Function
 * @platform        node
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
 * import { __folderHash } from '@coffeekraken/sugar/fs';
 * __folderHash('my/cool/folder'); // => YZOrKDx9LCLd8X39PoFTflXGpRU=,
 *
 * @see             https://www.npmjs.com/package/folder-hash
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IFolderHashIncludeSettings {
    ctime: boolean;
}
export interface IFolderHashSettings {
    recursive: boolean;
    algo: string;
    digest: BinaryToTextEncoding;
    include: Partial<IFolderHashIncludeSettings>;
}

export default function __folderHash(
    folderPath: string,
    settings: Partial<IFolderHashSettings> = {},
): string {
    settings = __deepMerge(
        {
            recursive: true,
            algo: 'sha256',
            digest: 'base64',
            include: {
                ctime: false,
            },
        },
        settings ?? {},
    );
    const paths: string[] = [];

    function readDir(dir) {
        const files = __fs.readdirSync(dir);
        files.forEach((filePath) => {
            if (settings.recursive && __isDirectory(`${dir}/${filePath}`)) {
                return readDir(`${dir}/${filePath}`);
            }
            paths.push(`${dir}/${filePath}`);
        });
    }

    readDir(folderPath);

    const filesHashes: string[] = [];

    paths.forEach((path) => {
        if (__isDirectory(path)) return;
        filesHashes.push(__fileHash(path, settings));
    });

    return __sha256.encrypt(filesHashes.join('-'));
}
