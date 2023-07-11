// @ts-nocheck

import __stripAnsi from 'strip-ansi';
import __deepMerge from '../object/deepMerge.js';

/**
 * @name                                  countLineChars
 * @namespace            shared.string
 * @type                                  Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Count how many characters their is in the passed line.
 * This function will exclude the characters like the html tags like <red>, etc...
 *
 * @param           {String}              line              The line to count
 * @param           {Object}              [count={}]        Specify what you want to count outside of the normal characters of yourse. Here's the list of available options:
 * - htmlTags (false) {Boolean}: Specify if you want to count the html tags or not
 * - terminalSpecialChars (false) {Boolean}: Specify if you want to count the terminal specials chars like "\u001b[30m", etc...
 * - newLineChars (false) {Boolean}: Specify if you want to count the new line special char "\n" or not
 * @return          {Number}                                How many characters their is in the line
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __countLineChars($1)
 *
 * @example         js
 * import { __countLineChars } from '@coffeekraken/sugar/string';
 *  __countLineChars('Hello <red>World</red>'); // 11
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __countLineChars(line, count = {}) {
    count = __deepMerge(
        {
            htmlTags: false,
            terminalSpecialChars: false,
            newLineChars: false,
        },
        count,
    );

    let newLine = line;
    if (count.terminalSpecialChars === false) {
        newLine = __stripAnsi(newLine);
    }
    if (count.htmlTags === false) {
        newLine = newLine.replace(/<\/?[a-zA-Z0-9]+\s?\/?>/g, '');
    }
    if (count.newLineChars === false) {
        newLine = newLine.replace('\n', '');
    }

    return newLine.length;
}
