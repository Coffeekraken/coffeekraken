import __childProcess from 'child_process';

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
 * import { __globalNodeModulesPath } from '@coffeekraken/sugar/node/npm/globalNodeModulesPath';
 * await __globalNodeModulesPath();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (): string {
    return __childProcess
        .execSync(`npm root --global`, {
            stdio: 'pipe',
        })
        .toString()
        .trim()
        .split('\n')
        .slice(-1)[0];
}
