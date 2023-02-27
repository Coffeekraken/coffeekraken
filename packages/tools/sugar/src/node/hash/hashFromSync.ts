import { __fileHashSync, __folderHashSync } from '@coffeekraken/sugar/fs';
import { __isDirectory, __isGlob } from '@coffeekraken/sugar/is';
import { __packagePathSync } from '@coffeekraken/sugar/npm';
import { __objectHash } from '@coffeekraken/sugar/object';
import __crypto, { BinaryToTextEncoding } from 'crypto';
import __fs from 'fs';

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
 * @snippet         __hashFromSync($1)
 * 
 * @example             js
 * import { __hashFromSync } from '@coffeekraken/sugar/hash';
 * __hashFromSync([{
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

export default function __hashFromSync(
    sources: (string | any)[],
    settings?: Partial<IHashFromSettings>,
): string | undefined {
    const hashes: string[] = [];

    const finalSettings: IHashFromSettings = {
        algo: 'sha256',
        digest: 'base64',
        ...(settings ?? {}),
    };

    let hash;

    for (let source of sources) {
        // plain object
        if (typeof source !== 'string') {
            hashes.push(__objectHash(source));
            continue;
        }

        // package
        if (!source.startsWith('/') && source.match(/^[a-zA-Z-_\/\@]+$/)) {
            const path = __packagePathSync(source);
            if (path) {
                hashes.push(__folderHashSync(path));
                continue;
            }
        }

        // directory
        if (__isDirectory(source)) {
            hashes.push(__folderHashSync(source));
            continue;
        }

        // absolute file
        if (__fs.existsSync(source)) {
            hashes.push(__fileHashSync(source));
            continue;
        }

        // glob
        if (__isGlob(source)) {
            const files = __glob.sync(source);
            for (let filePath of files) {
                if (__isDirectory(filePath)) {
                    // console.log('Directory', filePath);
                    hashes.push(__folderHashSync(filePath));
                } else {
                    hashes.push(__fileHashSync(filePath));
                }
            }
            continue;
        }

        // simple string
        hashes.push(source);
    }

    // create the final hash
    if (hashes.length) {
        hash = __crypto
            .createHash(finalSettings.algo)
            .update(hashes.join('-'))
            .digest(finalSettings.digest);
    }

    // return the hash
    return hash;
}
