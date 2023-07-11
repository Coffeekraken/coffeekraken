// @ts-nocheck

import __deepMerge from '../object/deepMerge.js';

/**
 * @name          trimLines
 * @namespace            shared.string
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function take a string and trim each lines
 *
 * @param       {String}        string        The string to trim lines of
 * @param       {Object}        [settings={}]     An object settings. Here's the object properties:
 * - leftPadding (0) {Number}: Specify a left padding to set. 1 padding represent 1 space character
 * - rightPadding (0) {Number}: Specify a right padding to set.
 * - keepEmptyLines (true) {Boolean}: Specify if you want to keep empty lines or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __trimLines($1)
 *
 * @example         js
 * import { __trimLines } from '@coffeekraken/sugar/string';
 * __trimLines(`my cool lines
 *      that have some lines to trim
 * and some not...`);
 * // my cool lines
 * // that have some lines to trim
 * // and some not...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __trimLines(string, settings = {}) {
    settings = __deepMerge(
        {
            leftPadding: 0,
            rightPadding: 0,
            keepEmptyLines: true,
        },
        settings,
    );

    string = string
        .split('\n')
        .map((line) => {
            line = line.trim();
            if (!settings.keepEmptyLines) {
                if (line === '') return -1;
            }
            if (settings.leftPadding)
                line = `${' '.repeat(settings.leftPadding)}${line}`;
            if (settings.rightPadding)
                line = `${line}${' '.repeat(settings.rightPadding)}`;
            return line;
        })
        .filter((line) => line !== -1)
        .join('\n');

    return string;
}
