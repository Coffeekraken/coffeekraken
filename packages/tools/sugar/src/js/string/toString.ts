// @ts-nocheck
// @shared

import __isArray from '../is/array';
import __isBoolean from '../is/boolean';
import __isFunction from '../is/function';
import __isJson from '../is/json';
import __isObject from '../is/object';
import __deepMerge from '../object/deepMerge';
import __stringify from '../json/stringify';

/**
 * @name        toString
 * @namespace           sugar.js.string
 * @type      Function
 * @stable
 *
 * Convert passed value to a string
 *
 * @param    {Mixed}    value    The value to convert to string
 * @param     {Object}      [settings={}]             An object of settings to configure your toString process:
 * - beautify (false) {Boolean}: Specify if you want to beautify the output like objects, arrays, etc...
 * @return    {String}    The resulting string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import toString from '@coffeekraken/sugar/js/string/toString'
 * toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function fn(value, settings = {}) {
  settings = __deepMerge(
    {
      beautify: false
    },
    settings
  );

  // string
  if (typeof value === 'string') return value;
  // null
  if (value === null) return 'null';
  // undefined
  if (value === undefined) return 'undefined';
  // error
  if (value instanceof Error) {
    if (typeof value.toString === 'function') {
      return value.toString();
    }
    return `${value.name}:

      ${value.message}

      ${value.stack}
    `;
  }
  // JSON
  if (__isObject(value) || __isArray(value) || __isJson(value)) {
    return JSON.stringify(value, null, settings.beautify ? 4 : 0);
  }
  // boolean
  if (__isBoolean(value)) {
    if (value) return 'true';
    else return 'false';
  }
  // function
  if (__isFunction(value)) {
    return '' + value;
  }
  // stringify
  let returnString = '';
  try {
    returnString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
  } catch (e) {
    try {
      returnString = value.toString();
    } catch (e) {
      returnString = value;
    }
  }
  return returnString;
}
export = fn;
