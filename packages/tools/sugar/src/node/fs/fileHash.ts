import __crypto, { BinaryToTextEncoding } from 'crypto';
import __fs from 'fs';

/**
 * @name            fileHash
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This function allows you to get back an integrity hash for the passed file.
 * This mean that if a file returns the same integrity hash twice, the folder or files in it
 * has not been updated...
 *
 * @param           {String}            filePath      The folder path you want to get the hash back
 * @param           {IFileHashSettings}       [settings={}]       Some settings to configure your hash generation process
 * @return          {String}                            The calculated folder hash
 *
 * @setting         {Boolean}           [recursive=true]            Specify if you want to generate a hash using also the children or not
 * @setting         {String}            [algo='sha356']             The algorithm to use
 * @setting         {BinaryToTextEncoding}      [digest='base64']       How to digest the hash
 *
 * @example         js
 * import fileHash from '@coffeekraken/sugar/node/fs/fileHash';
 * fileHash('my/cool/folder'); // => YZOrKDx9LCLd8X39PoFTflXGpRU=,
 *
 * @see             https://www.npmjs.com/package/folder-hash
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IFileHashSettings {
    recursive: boolean;
    algo: string;
    digest: BinaryToTextEncoding;
}

export default function fileHash(
    filePath: string,
    settings: Partial<IFileHashSettings> = {},
): string {
    settings = <IFileHashSettings>{
        recursive: true,
        algo: 'sha256',
        digest: 'base64',
        ...settings,
    };
    const fileBuffer = __fs.readFileSync(filePath);
    const hashSum = __crypto.createHash(<string>settings.algo);
    hashSum.update(fileBuffer);
    return hashSum.digest(<BinaryToTextEncoding>settings.digest);
}
