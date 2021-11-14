// @ts-nocheck

import { paramCase } from 'param-case';

/**
 * @name        dashCase
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * dashCase a string
 *
 * @param         {String}          text        The string to dashCase
 * @return        {String}                      The dashCased string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import dashCase from '@coffeekraken/sugar/js/string/dashCase';
 * dashCase('hello world'); // => hello-world
 *
 * @see             https://www.npmjs.com/package/param-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function dashCase(text) {
    return paramCase(text);
}
export default dashCase;
