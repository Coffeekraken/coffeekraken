import { __argsToString } from '@coffeekraken/sugar/cli';
import { __replaceTokens } from '@coffeekraken/sugar/string';

/**
 * @name           replaceTokens
 * @type            Function
 * @static
 *
 * Replace tokens in a passed command like:
 * - ^sugar: Replaced by either "sugar" or "sugard" depending on the environment
 * - Support all the tokens supported by the "replaceTokens" function of the sugar package
 *
 * @param        {String} command The command to replace tokens in
 * @return       {String} The command with the replaced tokens
 *
 * @since           2.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com>
 */
export default function replaceTokens(command: string, params?: any): string {
    const sugarCommand = process.argv[1].split('/').pop();
    command = command.replace(
        '[arguments]',
        params ? __argsToString(params) : '',
    );
    command = __replaceTokens(command);
    // @ts-ignore
    if (!command.match(/^sugar\s/)) return command;
    return command.replace(/^sugar/, sugarCommand ?? 'sugar');
}
