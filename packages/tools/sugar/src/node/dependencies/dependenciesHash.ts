import __objectHash from 'object-hash';
import __sha256 from '../../shared/crypt/sha256';
import { __extension, __fileHash } from '@coffeekraken/sugar/fs';

/**
 * @name            dependenciesHash
 * @namespace       node.dependencies
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 * @async
 *
 * This function take as input an object that follows the structure described in the example bellow.
 * With that, if will recursively (for files dependencies) load them, check if they have some dependencies,
 * and create a hash depending on all of that.
 * Here's the process steps:
 * 1. Check the files dependencies.
 * 2. If their's, load recursively these dependencies and start the process over them again
 * 3. Create a hash for the current dependency with using all non "files" dependencies as well as the file updated timestamp
 * 4. Make this process recursively until all the "files" have been processed
 * 5. Return the final hash for your dependency object
 *
 * @param       {IDependencyHashObj}            dependenciesObj           The dependency object to treat
 * @param       {IDependencyHashSettings}       [settings={}]           Some settings for your dependency hashing process
 * @return      {String}                                                The generated hash
 *
 * @example         js
 * import __dependenciesHash from '@coffeekraken/sugar/node/dependencies/dependenciesHash';
 * await __dependenciesHash({
 *      files: [
 *          'my-cool-file.js',
 *          'my-other-file.jpg'
 *      ],
 *      data: {
 *          something: 'cool',
 *          another: 'cool thing'
 *      }
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IDependencyHashObj {
    files?: string[];
    data?: any;
}
export interface IDependencyHashSettings {
    recursive: boolean;
}

export default async function dependenciesHash(
    dependenciesObj: IDependencyHashObj,
    settings?: IDependencyHashSettings,
): Promise<string> {
    settings = {
        recursive: true,
        ...settings,
    };

    let dataHash = '',
        filesHashes: string[] = [];

    // files hashing
    if (dependenciesObj.files) {
        for (let i = 0; i < dependenciesObj.files.length; i++) {
            const filePath = dependenciesObj.files[i];
            let fileDepsHash = '';

            if (settings.recursive) {
                switch (__extension(filePath)) {
                    case 'js':
                        const jsFileExports = await import(filePath);
                        if (jsFileExports.dependencies) {
                            let deps = jsFileExports.dependencies;
                            if (
                                typeof jsFileExports.dependencies === 'function'
                            ) {
                                deps = jsFileExports.dependencies();
                                fileDepsHash = await dependenciesHash(
                                    deps,
                                    settings,
                                );
                            }
                        }
                        break;
                }
            }

            // generate a hash for the file
            const fileHash = await __fileHash(filePath);

            // add this hash to the files hashes array
            filesHashes.push(__sha256.encrypt(`${fileHash}-${fileDepsHash}`));
        }
    }

    // data hashing
    if (dependenciesObj.data) {
        dataHash = __objectHash(dependenciesObj.data);
    }

    return __sha256.encrypt(`${dataHash}-${filesHashes.join('-')}`);
}
