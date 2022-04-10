import __sharedReplaceTokens from '../../shared/token/replaceTokens';

/**
 * @name            replaceTokens
 * @namespace       js.token
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function take as input a string and replace some tokens using these functions:
 * -
 *
 * @param       {String}            string          The string you want to process
 * @return      {String}                            The processed string
 *
 * @example         js
 * import replaceTokens from '@coffeekraken/sugar/js/token/replaceTokens';
 * replaceTokens('Current module system is %moduleSystem');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function replaceTokens(string: string): string {
    string = __sharedReplaceTokens(string);
    return string;
}
