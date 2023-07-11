// @ts-nocheck

import __camelize from './camelize.js';

/**
 * @name        camelCase
 * @namespace            shared.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * camelCase a string
 *
 * @param         {String}          text        The string to camelCase
 * @return        {String}                      The camelCased string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __camelCase($1)
 *
 * @example     js
 * import { __camelCase } from '@coffeekraken/sugar/string';
 * __camelCase('hello world'); // => helloWorld
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __camelCase(text) {
    return __camelize(text);
}
