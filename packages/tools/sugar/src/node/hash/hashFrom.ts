import { __fileHash, __folderHash } from '@coffeekraken/sugar/fs';
import { __isDirectory, __isGlob } from '@coffeekraken/sugar/is';
import { __packagePath } from '@coffeekraken/sugar/npm';
import { __objectHash } from '@coffeekraken/sugar/object';
import __crypto, { BinaryToTextEncoding } from 'crypto';
import __fs from 'fs';
import __glob from 'glob';

/**
 * @name                            hashFrom
 * @namespace            node.hash
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return a hash generated from sources like:
 * - String: Simple string
 * - Folder: Absolute path to a folder
 * - File: Absolute path to a file
 * - Glob: An absolute glob pattern to target some files
 * - NPM package: An NPM package name
 * - Object: A plain object
 *
 * @param       {Array<String|any>}         sources         The sources to generate the final hash
 * @return                {String}                          A base64 hash that represent all the sources passed
 *
 * @setting         {'sha256'|'sha512'}         [algo='sha256']     The algo to use
 * @setting        {'base64'|'hex'}               [digest='base64']        The digest encoding
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import { __hashFrom } from '@coffeekraken/sugar/hash';
 * __hashFrom([{
 *   hello: 'world'
 * }, '/my/cool/folder']);
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IHashFromSettings {
    algo: string;
    digest: BinaryToTextEncoding;
}

export default function __hashFrom(
    sources: (string | any)[],
    settings?: Partial<IHashFromSettings>,
): string {
    const hashes: string[] = [];

    const finalSettings: IHashFromSettings = {
        algo: 'sha256',
        digest: 'base64',
        ...(settings ?? {}),
    };

    for (let source of sources) {
        // plain object
        if (typeof source !== 'string') {
            hashes.push(__objectHash(source));
            continue;
        }

        // package
        if (typeof source === 'string' && !source.startsWith('/')) {
            const path = __packagePath(source);
            if (path) {
                hashes.push(__folderHash(path));
                continue;
            }
        }

        // directory
        if (typeof source === 'string' && __isDirectory(source)) {
            hashes.push(__folderHash(source));
            continue;
        }

        // absolute file
        if (typeof source === 'string' && __fs.existsSync(source)) {
            hashes.push(__fileHash(source));
            continue;
        }

        // glob
        if (typeof source === 'string' && __isGlob(source)) {
            const files = __glob.sync(source);
            for (let filePath of files) {
                if (__isDirectory(filePath)) {
                    // console.log('Directory', filePath);
                    hashes.push(__folderHash(filePath));
                } else {
                    hashes.push(__fileHash(filePath));
                }
            }
            continue;
        }

        // otherwise it's an unsupported source
        console.error(source);
        throw new Error(
            `<red>[__hashFrom]</red> The logged source above is not a supported one...`,
        );
    }

    // create the final hash
    const hash = __crypto
        .createHash(finalSettings.algo)
        .update(hashes.join('-'))
        .digest(finalSettings.digest);

    // return the hash
    return hash;
}
