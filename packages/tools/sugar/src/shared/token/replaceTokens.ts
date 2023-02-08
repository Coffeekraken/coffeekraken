import __currentModuleSystem from '../module/currentModuleSystem';

/**
 * @name            replaceTokens
 * @namespace       shared.token
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function replace these tokens in the passed string:
 * - `%moduleSystem` - Either "esm" or "cjs"
 *
 * @param       {String}            string          The string you want to process
 * @return      {String}                            The processed string
 *
 * @example         js
 * import replaceTokens from '@coffeekraken/sugar/shared/token/replaceTokens';
 * replaceTokens('Current module system is %moduleSystem');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function replaceTokens(string: string): string {
    string = string.replace(/\%moduleSystem/g, __currentModuleSystem());
    return string;
}
