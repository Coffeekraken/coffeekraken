// @ts-nocheck

import __deepMerge from '../object/deepMerge';

/**
 * @name          trimLines
 * @namespace            js.string
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
 * @example         js
 * import trimLines from '@coffeekraken/sugar/js/string/trimLines';
 * trimLines(`my cool lines
 *      that have some lines to trim
 * and some not...`);
 * // my cool lines
 * // that have some lines to trim
 * // and some not...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function trimLines(string, settings = {}) {
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
export default trimLines;
