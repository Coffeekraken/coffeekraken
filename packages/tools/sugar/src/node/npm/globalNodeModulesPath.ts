import { __ensureDirSync, __folderPath } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __childProcess from 'child_process';
import __fs from 'fs';

/**
 * @name            globalNodeModulesPath
 * @namespace       node.npm
 * @type            Function
 * @platform        node
 * @status          beta
 * @async
 *
 * This function returns you the path to the global node modules folder
 *
 * @return      {String}            The path to the global node modules folder
 *
 * @snippet         __globalNodeModulesPath()
 * await __globalNodeModulesPath()
 *
 * @example         js
 * import { __globalNodeModulesPath } from '@coffeekraken/sugar/npm';
 * await __globalNodeModulesPath();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (): string {
    let cachedJson = {};

    // check in cache
    const cacheFilePath = `${__packageRootDir()}/.local/cache/globalNodeModulesPath.json`;
    if (__fs.existsSync(cacheFilePath)) {
        // read the cache file
        cachedJson = JSON.parse(
            __fs.readFileSync(cacheFilePath, 'utf-8').toString(),
        );
        // check if we have already the global node modules path
        if (cachedJson[process.version]) {
            return cachedJson[process.version];
        }
    } else {
        __ensureDirSync(__folderPath(cacheFilePath));
    }

    // get the global node modules path
    const modulesPath = __childProcess
        .execSync(`npm root --global`, {
            stdio: 'pipe',
        })
        .toString()
        .trim()
        .split('\n')
        .slice(-1)[0];

    // set in the cachedJson
    cachedJson[process.version] = modulesPath;

    // save the cache
    __fs.writeFileSync(cacheFilePath, JSON.stringify(cachedJson, null, 4));

    // return the global modules path
    return modulesPath;
}
