import __childProcess from 'child_process';

/**
 * @name            globalNodeModulesPath
 * @namespace       node.npm
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function returns you the path to the global node modules folder
 *
 * @return      {String}            The path to the global node modules folder
 *
 * @example         js
 * import globalNodeModulesPath from '@coffeekraken/sugar/node/npm/globalNodeModulesPath';
 * globalNodeModulesPath();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (): string {
    // get global node modules directory path
    return __childProcess
        .execSync(`npm root --location=global`)
        .toString()
        .trim();
}
