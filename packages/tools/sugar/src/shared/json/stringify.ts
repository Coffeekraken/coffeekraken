// @ts-nocheck

import __deepMerge from '../object/deepMerge';
// import { decycle } from 'json-cyclic';
import __stringify from 'fast-safe-stringify';

/**
 * @name            stringify
 * @namespace            js.json
 * @type            Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status        beta
 *
 * This function do the same as the ```JSON.stringify``` one but add some features.
 *
 * @feature       2.0.0         Remove circular dependencies by default
 *
 * @param         {Object}        obj       The object to stringify
 * @param         {Function}    [replacer=null]       A function that alters the behavior of the stringification process.
 * @param         {Number}      [space=null]      The number of spaces you want tp use
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import stringify from '@coffeekraken/sugar/js/json/stringify';
 * stringify({
 *    hello: 'world'
 * }); // => {"hello":"world"}
 *
 * @see         https://www.npmjs.com/package/fast-safe-stringify
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function stringify(obj, replacer = null, space = null) {
  return __stringify(obj, replacer, space);
}
export default stringify;
