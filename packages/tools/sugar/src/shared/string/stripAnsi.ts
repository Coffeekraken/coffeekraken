import __stripAnsi from 'strip-ansi';

/**
 * @name            stripAnsi
 * @namespace            js.string
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function simply strip all the ansi characters in a string
 *
 * @param       {String}        string          The string to strip ansi from
 * @return      {String}                        The new string without any ansi characters
 *
 * @example     js
 * import stripAnsi from '@coffeekraken/sugar/js/string/stripAnsi';
 * stripAnsi('\u001B]8;;https://github.com\u0007Click\u001B]8;;\u0007'); // => Click
 *
 * @see         https://www.npmjs.com/package/strip-ansi
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function stripAnsi(string) {
    return __stripAnsi(string);
}
