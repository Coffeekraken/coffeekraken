// @ts-nocheck

import __toRegex from 'to-regex';

/**
 * @name        dedupe
 * @namespace            shared.string
 * @type        Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function simple make sure that you don't have duplicate statements in the passed string
 *
 * @param           {String}        string        The string to process
 * @param           {String}        statement       The statement to check
 * @return          {String}                      The deduplicated string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __dedupe } from '@coffeekraken/sugar/string';
 * __dedupe('hello world hello your', 'hello'); // => hello world your
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __dedupe(str, statement) {
    const reg = __toRegex(`(${statement})`, {
        contains: true,
        flags: 'g',
    });
    return str
        .split(reg)
        .reverse()
        .filter(function (e, i, arr) {
            return arr.indexOf(e, i + 1) === -1;
        })
        .reverse()
        .join('');
}
