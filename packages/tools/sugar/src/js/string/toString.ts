import isArray from '../is/array';
import isBoolean from '../is/boolean';
import isFunction from '../is/function';
import isJson from '../is/json';
import isNumber from '../is/number';
import isObject from '../is/object';
import isRegexp from '../is/regexp';
import isString from '../is/string';
import __deepMerge from '../object/deepMerge';
import __SError from '../error/SError';
import __stringify from '../json/stringify';

/**
 * @name        toString
 * @namespace           sugar.js.string
 * @type      Function
 *
 * Convert passed value to a string
 *
 * @param    {Mixed}    value    The value to convert to string
 * @param     {Object}      [settings={}]             An object of settings to configure your toString process:
 * - beautify (false) {Boolean}: Specify if you want to beautify the output like objects, arrays, etc...
 * @return    {String}    The resulting string
 *
 * @example    js
 * import toString from '@coffeekraken/sugar/js/string/toString'
 * toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function toString(value, settings = {}) {
  settings = __deepMerge(
    {
      beautify: false
    },
    settings
  );

  if (isString(value)) {
    return value;
  } else if (isNumber(value)) {
    return value.toString();
  } else if (value === null) {
    return 'null';
  } else if (value instanceof __SError) {
    return value.toString();
  } else if (value instanceof Error) {
    if (typeof value.toString === 'function') {
      return value.toString();
    }
    return `${value.name}:

      ${value.message}

      ${value.stack}
    `;
  } else if (
    typeof value === 'symbol' ||
    typeof value === 'typedArray' ||
    value instanceof Date ||
    typeof value === 'color'
  ) {
    return value.toString();
  } else if (isObject(value) || isArray(value) || isJson(value)) {
    return JSON.stringify(value, null, settings.beautify ? 4 : 0);
  } else if (isBoolean(value)) {
    if (value) return 'true';
    else return 'false';
  } else if (isFunction(value)) {
    return '' + value;
  } else if (isRegexp(value)) {
    return value.toString();
  } else if (value === undefined) {
    return 'undefined';
  } else {
    let returnVal;
    try {
      returnVal = JSON.stringify(value, null, settings.beautify ? 4 : 0);
    } catch (e) {
      try {
        returnVal = value.toString();
      } catch (e) {
        return value;
      }
    }
    return returnVal;
  }
}
