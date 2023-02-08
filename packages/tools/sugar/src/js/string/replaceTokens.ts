import __sharedReplaceTokens from '../../shared/token/replaceTokens';

/**
 * @name            replaceTokens
 * @namespace       js.string
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function replace these tokens in the passed string:
 * 
 * - `%moduleSystem` - Either "esm" or "cjs"
 *
 * @param       {String}            string          The string you want to process
 * @return      {String}                            The processed string
 *
 * @example         js
 * import { __replaceTokens } from '@coffeekraken/sugar/string';
 *  __replaceTokens('Current module system is %moduleSystem');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __replaceTokens(string: string): string {
    string = __sharedReplaceTokens(string);
    return string;
}
