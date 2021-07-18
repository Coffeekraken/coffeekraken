// @ts-nocheck

import __camelize from './camelize';

/**
 * @name        camelCase
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          ts
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
 * @example     js
 * import camelCase from '@coffeekraken/sugar/js/string/camelCase';
 * camelCase('hello world'); // => helloWorld
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function camelCase(text) {
  return __camelize(text);
}
export default camelCase;
