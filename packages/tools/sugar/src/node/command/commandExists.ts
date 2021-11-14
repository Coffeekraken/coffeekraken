import { spawnSync } from 'child_process';

/**
 * @name            commandExists
 * @namespace       node.command
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function allows you to check if a command exists on the system where the script is running
 *
 * @todo        tests           high
 * @todo        Documentation
 *
 * @param       {String}            command         The command to check like "ls", "node", etc...
 * @return      {Promise}                           A promise fullfiled once the check has finished with true of false as value
 *
 * @example         js
 * import commandExists from '@coffeekraken/sugar/node/command/commandExists';
 * await commandExists('ls'); // => true
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default async function commandExists(command: string): Promise<boolean> {
    const isWin = process.platform === 'win32';
    const where = isWin ? 'where' : 'whereis';

    // check by version
    const versionOut = spawnSync(`${command} -v`, ['/?'], {
        encoding: 'utf-8',
        shell: true,
    });
    if (versionOut.stdout) return true;

    const out = spawnSync(where + ' ' + command, ['/?'], {
        encoding: 'utf8',
        shell: true,
    });
    return out.stdout !== '';
}
